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
<<<<<<< HEAD
  poemFirstLine?: string;
=======
  poemFirstLine: string;
>>>>>>> 566e7f670b96fcae02fea213c54a4eb8a6f17581
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: MezmurCategoryReference;
}

export interface Mezmur extends MezmurSummary {
  mezmurPoem: string;
}
