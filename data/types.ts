export interface FeedbackItem {
  id: string | number;
  message: string;
  createdAt: string;
}

export interface MezmurCategory {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    mezmurs: number;
  };
}

export interface Mezmur {
  id: number;
  title: string;
  description: string | null;
  categoryId: number;
  mezmurPoem: string;
  createdAt: string;
  updatedAt: string;
  category: MezmurCategory;
}
