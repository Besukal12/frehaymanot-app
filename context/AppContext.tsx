import React, { createContext, useContext, useState, ReactNode } from "react";
import { FeedbackItem } from "../data/types";

interface AppContextValue {
  downloadedCourseIds: string[];
  toggleDownload: (courseId: string) => void;
  isDownloaded: (courseId: string) => boolean;

  feedbackItems: FeedbackItem[];
  submitFeedback: (message: string) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [downloadedCourseIds, setDownloadedCourseIds] = useState<string[]>([]);
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);

  function toggleDownload(courseId: string) {
    setDownloadedCourseIds((current) =>
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook so screens just call `useApp()` instead of importing
// useContext + AppContext everywhere.
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp() must be used inside an <AppProvider>");
  }
  return ctx;
}
