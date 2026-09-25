import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  downloadAsync,
  getInfoAsync,
  makeDirectoryAsync,
  documentDirectory,
} from 'expo-file-system/legacy';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { View } from 'react-native';
import { vars } from 'nativewind';
import { fetchMezmurData, sendFeedback } from '../data/api';
import { FeedbackItem, Mezmur, MezmurCategory } from '../data/types';
import { themes, type AppTheme, type ThemeId } from '../constants/theme';

const MEZMURS_CACHE_KEY = '@fre-haymanot/mezmurs';
const CATEGORIES_CACHE_KEY = '@fre-haymanot/mezmur-categories';
const CATEGORY_IMAGE_DIRECTORY = `${documentDirectory ?? ''}mezmur-images/`;

async function cacheCategoryImages(categories: MezmurCategory[]) {
  if (!documentDirectory) {
    return categories;
  }

  await makeDirectoryAsync(CATEGORY_IMAGE_DIRECTORY, { intermediates: true });

  return Promise.all(
    categories.map(async (category) => {
      if (!category.imageUrl || category.imageUrl.startsWith('file://')) {
        return category;
      }

      const extension = category.imageUrl.split('.').pop()?.split('?')[0] ?? 'jpg';
      const localUri = `${CATEGORY_IMAGE_DIRECTORY}${category.id}.${extension}`;

      try {
        const existingFile = await getInfoAsync(localUri);
        if (existingFile.exists) {
          return { ...category, imageUrl: localUri };
        }

        const downloadedFile = await downloadAsync(category.imageUrl, localUri);
        return { ...category, imageUrl: downloadedFile.uri };
      } catch {
        return category;
      }
    })
  );
}

interface AppContextValue {
  downloadedCourseIds: string[];
  toggleDownload: (courseId: string) => void;
  isDownloaded: (courseId: string) => boolean;

  feedbackItems: FeedbackItem[];
  submitFeedback: (message: string) => Promise<void>;
  mezmurs: Mezmur[];
  mezmurCategories: MezmurCategory[];
  isMezmurLoading: boolean;
  mezmurError: string | null;
  refreshMezmurs: () => Promise<void>;
  theme: AppTheme;
  themeId: ThemeId;
  setTheme: (themeId: ThemeId) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [downloadedCourseIds, setDownloadedCourseIds] = useState<string[]>([]);
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [mezmurs, setMezmurs] = useState<Mezmur[]>([]);
  const [mezmurCategories, setMezmurCategories] = useState<MezmurCategory[]>([]);
  const [isMezmurLoading, setIsMezmurLoading] = useState(true);
  const [mezmurError, setMezmurError] = useState<string | null>(null);
  const [themeId, setThemeId] = useState<ThemeId>('default');
  const theme = themes.find((item) => item.id === themeId) ?? themes[0];

  const refreshMezmurs = async () => {
    setMezmurError(null);

    try {
      const cachedMezmurs = await AsyncStorage.getItem(MEZMURS_CACHE_KEY);
      const cachedCategories = await AsyncStorage.getItem(CATEGORIES_CACHE_KEY);

      if (cachedMezmurs) {
        setMezmurs(JSON.parse(cachedMezmurs) as Mezmur[]);
      }

      if (cachedCategories) {
        setMezmurCategories(JSON.parse(cachedCategories) as MezmurCategory[]);
      }
    } catch {
      setMezmurError('የተቀመጠውን መረጃ ማንበብ አልተቻለም');
    }

    try {
      const freshData = await fetchMezmurData();
      const cachedCategories = await cacheCategoryImages(freshData.categories);
      const categoriesById = new Map(cachedCategories.map((category) => [category.id, category]));
      const cachedMezmurs = freshData.mezmurs.map((mezmur) => ({
        ...mezmur,
        category: categoriesById.get(mezmur.categoryId) ?? mezmur.category,
      }));

      setMezmurs(cachedMezmurs);
      setMezmurCategories(cachedCategories);
      await Promise.all([
        AsyncStorage.setItem(MEZMURS_CACHE_KEY, JSON.stringify(cachedMezmurs)),
        AsyncStorage.setItem(CATEGORIES_CACHE_KEY, JSON.stringify(cachedCategories)),
      ]);
    } catch {
      setMezmurError((current) => current ?? 'ከኢንተርኔት መረጃ ማግኘት አልተቻለም');
    } finally {
      setIsMezmurLoading(false);
    }
  };

  useEffect(() => {
    void refreshMezmurs();
  }, []);

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
