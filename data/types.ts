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

export interface MezmurCategoryReference {
  id: number;
  name: string;
  imageUrl: string | null;
}

export interface MezmurSummary {
  id: number;
  title: string;
  description: string | null;
  poemFirstLine?: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: MezmurCategoryReference;
}

export interface Mezmur extends MezmurSummary {
  mezmurPoem: string;
}
