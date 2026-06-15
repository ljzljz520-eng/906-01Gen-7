export type Category = 'bamboo' | 'lacquer' | 'papercut' | 'tieDye';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type UserRole = 'learner' | 'artisan' | 'institution';

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  bio: string;
  tutorialCount?: number;
}

export interface Material {
  id: string;
  name: string;
  image?: string;
  quantity: string;
}

export interface Step {
  id: string;
  order: number;
  title: string;
  description: string;
  image?: string;
}

export interface Tutorial {
  id: string;
  title: string;
  cover: string;
  category: Category;
  difficulty: Difficulty;
  authorId: string;
  duration: number;
  safetyNote: string;
  copyright: string;
  source?: string;
  materials: Material[];
  steps: Step[];
  description: string;
  createdAt: string;
  collectCount: number;
}

export interface Work {
  id: string;
  userId: string;
  tutorialId: string;
  image: string;
  description: string;
  createdAt: string;
  userName?: string;
  userAvatar?: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  cover: string;
  orgName: string;
  orgAvatar: string;
  tutorialIds: string[];
  intro: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
}

export interface Collection {
  id: string;
  userId: string;
  tutorialId: string;
  createdAt: string;
}

export const categoryLabels: Record<Category, string> = {
  bamboo: '竹编',
  lacquer: '漆器',
  papercut: '剪纸',
  tieDye: '扎染',
};

export const difficultyLabels: Record<Difficulty, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '大师',
};

export const categoryColors: Record<Category, string> = {
  bamboo: 'bg-bamboo-500',
  lacquer: 'bg-lacquer-600',
  papercut: 'bg-primary-500',
  tieDye: 'bg-ochre-500',
};

export const categoryBgColors: Record<Category, string> = {
  bamboo: 'bg-bamboo-50',
  lacquer: 'bg-lacquer-50',
  papercut: 'bg-primary-50',
  tieDye: 'bg-ochre-50',
};

export const categoryTextColors: Record<Category, string> = {
  bamboo: 'text-bamboo-600',
  lacquer: 'text-lacquer-600',
  papercut: 'text-primary-600',
  tieDye: 'text-ochre-600',
};
