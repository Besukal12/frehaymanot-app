import type { Announcement, Mezmur, MezmurCategory, MezmurSummary } from './types';

export const API_BASE_URL = 'https://frehaymanot-backend.vercel.app/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchMezmurData(): Promise<{
  mezmurs: MezmurSummary[];
  categories: MezmurCategory[];
}> {
  const [mezmurResponse, categoryResponse] = await Promise.all([
    request<{ mezmurs: MezmurSummary[] }>('/mezmur'),
    request<{ categories: MezmurCategory[] }>('/mezmur/categories'),
  ]);

  return {
    mezmurs: mezmurResponse.mezmurs,
    categories: categoryResponse.categories,
  };
}

export async function fetchMezmurById(id: number) {
  const response = await request<{ mezmur: Mezmur }>(`/mezmur/${id}`);
  return response.mezmur;
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  const response = await request<{ announcements: Announcement[] }>(
    '/announcements?page=1&pageSize=100'
  );
  return response.announcements;
}

export async function fetchAnnouncementById(id: number): Promise<Announcement> {
  const response = await request<{ announcement: Announcement }>(`/announcements/${id}`);
  return response.announcement;
}

export async function sendFeedback(message: string) {
  return request<{ feedback: { id: number; message: string; createdAt: string } }>('/feedback', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}
