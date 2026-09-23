import React, { createContext, useContext, useState, ReactNode } from 'react';
import { View } from 'react-native';
import { vars } from 'nativewind';
import { FeedbackItem } from '../data/types';
import { themes, type AppTheme, type ThemeId } from '../constants/theme';

interface AppContextValue {
  downloadedCourseIds: string[];
  toggleDownload: (courseId: string) => void;
  isDownloaded: (courseId: string) => boolean;

  feedbackItems: FeedbackItem[];
  submitFeedback: (message: string) => void;
  theme: AppTheme;
  themeId: ThemeId;
  setTheme: (themeId: ThemeId) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [downloadedCourseIds, setDownloadedCourseIds] = useState<string[]>([]);
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [themeId, setThemeId] = useState<ThemeId>('default');
  const theme = themes.find((item) => item.id === themeId) ?? themes[0];

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

  function submitFeedback(message: string) {
    const newItem: FeedbackItem = {
      id: `f-${Date.now()}`,
      message,
      createdAt: new Date().toISOString(),
    };
    setFeedbackItems((current) => [newItem, ...current]);
  }

  const value: AppContextValue = {
    downloadedCourseIds,
    toggleDownload,
    isDownloaded,
    feedbackItems,
    submitFeedback,
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
