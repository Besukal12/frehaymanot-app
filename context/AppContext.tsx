import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { View } from 'react-native';
import { vars } from 'nativewind';
import { fetchMezmurById, fetchMezmurData, sendFeedback } from '../data/api';
import { FeedbackItem, Mezmur, MezmurCategory, MezmurSummary } from '../data/types';
import { themes, type AppTheme, type ThemeId } from '../constants/theme';

const MEZMURS_CACHE_KEY = '@fre-haymanot/mezmur-summaries-v2';
const LEGACY_MEZMURS_CACHE_KEY = '@fre-haymanot/mezmurs';
const CATEGORIES_CACHE_KEY = '@fre-haymanot/mezmur-categories';
const MEZMUR_DETAIL_CACHE_KEY = '@fre-haymanot/mezmur-detail-';

export interface MezmurRefreshResult {
  added: number;
  downloaded: number;
  downloadFailed: number;
  error: string | null;
}

interface AppContextValue {
  downloadedCourseIds: string[];
  toggleDownload: (courseId: string) => void;
  isDownloaded: (courseId: string) => boolean;

  feedbackItems: FeedbackItem[];
  submitFeedback: (message: string) => Promise<void>;
  mezmurs: MezmurSummary[];
  mezmurCategories: MezmurCategory[];
  isMezmurLoading: boolean;
  mezmurError: string | null;
  refreshMezmurs: () => Promise<MezmurRefreshResult>;
  mezmurDetails: Record<number, Mezmur>;
  getMezmurById: (id: number) => Promise<Mezmur>;
  theme: AppTheme;
  themeId: ThemeId;
  setTheme: (themeId: ThemeId) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [downloadedCourseIds, setDownloadedCourseIds] = useState<string[]>([]);
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [mezmurs, setMezmurs] = useState<MezmurSummary[]>([]);
  const [mezmurCategories, setMezmurCategories] = useState<MezmurCategory[]>([]);
  const [loadingRequestCount, setLoadingRequestCount] = useState(0);
  const [mezmurError, setMezmurError] = useState<string | null>(null);
  const [mezmurDetails, setMezmurDetails] = useState<Record<number, Mezmur>>({});
  const [themeId, setThemeId] = useState<ThemeId>('default');
  const mountedRef = useRef(true);
  const refreshRequestRef = useRef<Promise<MezmurRefreshResult> | null>(null);
  const mezmursRef = useRef(mezmurs);
  const detailRequestsRef = useRef(new Map<number, Promise<Mezmur>>());
  const detailCacheRef = useRef<Record<number, Mezmur>>({});
  const isMezmurLoading = loadingRequestCount > 0;
  const theme = themes.find((item) => item.id === themeId) ?? themes[0];

  const refreshMezmurs = useCallback(() => {
    if (refreshRequestRef.current) {
      return refreshRequestRef.current;
    }

    setMezmurError(null);
    setLoadingRequestCount((count) => count + 1);

    const refreshRequest = (async () => {
      let result: MezmurRefreshResult = { added: 0, downloaded: 0, downloadFailed: 0, error: null };
      const freshDataRequest = fetchMezmurData();

      try {
        const [cachedMezmurs, legacyMezmurs, cachedCategories] = await Promise.all([
          AsyncStorage.getItem(MEZMURS_CACHE_KEY),
          AsyncStorage.getItem(LEGACY_MEZMURS_CACHE_KEY),
          AsyncStorage.getItem(CATEGORIES_CACHE_KEY),
        ]);

        const storedMezmurs = cachedMezmurs ?? legacyMezmurs;
        if (mountedRef.current && storedMezmurs) {
          const parsedMezmurs = JSON.parse(storedMezmurs) as MezmurSummary[];
          const summaries = parsedMezmurs.map((mezmur) => ({
            id: mezmur.id,
            title: mezmur.title,
            description: mezmur.description,
            poemFirstLine: mezmur.poemFirstLine,
            categoryId: mezmur.categoryId,
            createdAt: mezmur.createdAt,
            updatedAt: mezmur.updatedAt,
            category: mezmur.category,
          }));
          mezmursRef.current = summaries;
          setMezmurs(summaries);

          if (!cachedMezmurs) {
            void AsyncStorage.setItem(MEZMURS_CACHE_KEY, JSON.stringify(summaries)).catch(
              (error: unknown) => console.warn('Failed to migrate cached Mezmurs', error)
            );
          }
        }

        if (mountedRef.current && cachedCategories) {
          setMezmurCategories(JSON.parse(cachedCategories) as MezmurCategory[]);
        }
      } catch {
        // Cache is optional and the network request is already in progress.
      }

      try {
        const freshData = await freshDataRequest;
        const knownIds = new Set(mezmursRef.current.map((mezmur) => mezmur.id));
        const addedMezmurs = freshData.mezmurs.filter((mezmur) => !knownIds.has(mezmur.id));
        result.added = addedMezmurs.length;

        if (mountedRef.current) {
          mezmursRef.current = freshData.mezmurs;
          setMezmurs(freshData.mezmurs);
          setMezmurCategories(freshData.categories);
        }

        void Promise.all([
          AsyncStorage.setItem(MEZMURS_CACHE_KEY, JSON.stringify(freshData.mezmurs)),
          AsyncStorage.setItem(CATEGORIES_CACHE_KEY, JSON.stringify(freshData.categories)),
        ]).catch((error: unknown) => console.warn('Failed to cache Mezmur data', error));

        const downloadResults = await Promise.allSettled(
          addedMezmurs.map(async (summary) => {
            const detail = await fetchMezmurById(summary.id);
            detailCacheRef.current[summary.id] = detail;
            if (mountedRef.current) {
              setMezmurDetails((current) => ({ ...current, [summary.id]: detail }));
            }
            await AsyncStorage.setItem(
              `${MEZMUR_DETAIL_CACHE_KEY}${summary.id}`,
              JSON.stringify(detail)
            );
          })
        );
        result.downloaded = downloadResults.filter(
          (download) => download.status === 'fulfilled'
        ).length;
        result.downloadFailed = downloadResults.length - result.downloaded;
      } catch (error) {
        const isOffline =
          error instanceof TypeError ||
          (error instanceof Error &&
            /network request failed|failed to fetch|network error/i.test(error.message));
        const errorMessage = isOffline
          ? mezmursRef.current.length
            ? 'ኢንተርኔት የለም፤ የተቀመጡ መዝሙሮችን ይመልከቱ'
            : 'ኢንተርኔት የለም፤ የተቀመጠ መዝሙር የለም'
          : 'አዲስ መዝሙሮችን ማደስ አልተቻለም';
        result.error = errorMessage;
        if (mountedRef.current) {
          setMezmurError(errorMessage);
        }
      }

      return result;
    })().finally(() => {
      if (mountedRef.current) {
        setLoadingRequestCount((count) => Math.max(0, count - 1));
      }
      refreshRequestRef.current = null;
    });

    refreshRequestRef.current = refreshRequest;
    return refreshRequest;
  }, []);

  const getMezmurById = useCallback((id: number) => {
    const cachedDetail = detailCacheRef.current[id];
    if (cachedDetail) {
      return Promise.resolve(cachedDetail);
    }

    const inFlightRequest = detailRequestsRef.current.get(id);
    if (inFlightRequest) {
      return inFlightRequest;
    }

    setLoadingRequestCount((count) => count + 1);
    const detailRequest = (async () => {
      try {
        const cachedDetail = await AsyncStorage.getItem(`${MEZMUR_DETAIL_CACHE_KEY}${id}`);
        if (cachedDetail) {
          const mezmur = JSON.parse(cachedDetail) as Mezmur;
          detailCacheRef.current[id] = mezmur;
          if (mountedRef.current) {
            setMezmurDetails((current) => ({ ...current, [id]: mezmur }));
          }
          return mezmur;
        }
      } catch {
        // A bad or unavailable cache should not prevent a network request.
      }

      const mezmur = await fetchMezmurById(id);
      detailCacheRef.current[id] = mezmur;
      if (mountedRef.current) {
        setMezmurDetails((current) => ({ ...current, [id]: mezmur }));
      }
      void AsyncStorage.setItem(`${MEZMUR_DETAIL_CACHE_KEY}${id}`, JSON.stringify(mezmur)).catch(
        (error: unknown) => console.warn('Failed to cache Mezmur detail', error)
      );
      return mezmur;
    })().finally(() => {
      if (mountedRef.current) {
        setLoadingRequestCount((count) => Math.max(0, count - 1));
      }
      detailRequestsRef.current.delete(id);
    });

    detailRequestsRef.current.set(id, detailRequest);
    return detailRequest;
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    void refreshMezmurs();
    return () => {
      mountedRef.current = false;
    };
  }, [refreshMezmurs]);

  function toggleDownload(courseId: string) {
    setDownloadedCourseIds(
      (current) =>
        current.includes(courseId)
          ? current.filter((id) => id !== courseId) // remove = "un-download"
          : [...current, courseId] // add = "download"
    );
  }

  function isDownloaded(courseId: string) {
    return downloadedCourseIds.includes(courseId);
  }

  async function submitFeedback(message: string) {
    const response = await sendFeedback(message);
    setFeedbackItems((current) => [response.feedback, ...current]);
  }

  const value: AppContextValue = {
    downloadedCourseIds,
    toggleDownload,
    isDownloaded,
    feedbackItems,
    submitFeedback,
    mezmurs,
    mezmurCategories,
    isMezmurLoading,
    mezmurError,
    refreshMezmurs,
    mezmurDetails,
    getMezmurById,
    theme,
    themeId,
    setTheme: setThemeId,
  };

  return (
    <AppContext.Provider value={value}>
      <View
        className="flex-1"
        style={vars({
          '--app-primary': theme.colors.primary,
          '--app-accent': theme.colors.accent,
          '--app-background': theme.colors.background,
          '--app-ink': theme.colors.ink,
          '--app-muted': theme.colors.muted,
          '--app-white': theme.colors.white,
          '--app-border': theme.colors.border,
        })}>
        {children}
      </View>
    </AppContext.Provider>
  );
}

// Custom hook so screens just call `useApp()` instead of importing
// useContext + AppContext everywhere.
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp() must be used inside an <AppProvider>');
  }
  return ctx;
}
