import { create } from 'zustand';
import { Tutorial, User, Work, Topic, Collection, Category, Difficulty } from '@/types';
import { tutorials as initialTutorials } from '@/data/tutorials';
import { users as initialUsers } from '@/data/users';
import { works as initialWorks } from '@/data/works';
import { topics as initialTopics } from '@/data/topics';

interface AppState {
  tutorials: Tutorial[];
  users: User[];
  works: Work[];
  topics: Topic[];
  collections: Collection[];
  currentUser: User | null;
  searchKeyword: string;
  selectedCategory: Category | 'all';
  selectedDifficulty: Difficulty | 'all';

  setCurrentUser: (user: User | null) => void;
  setSearchKeyword: (keyword: string) => void;
  setSelectedCategory: (category: Category | 'all') => void;
  setSelectedDifficulty: (difficulty: Difficulty | 'all') => void;

  toggleCollection: (tutorialId: string, userId: string) => void;
  isCollected: (tutorialId: string, userId: string) => boolean;
  getCollectedTutorials: (userId: string) => Tutorial[];

  addWork: (work: Omit<Work, 'id' | 'createdAt'>) => void;
  getWorksByTutorial: (tutorialId: string) => Work[];
  getWorksByUser: (userId: string) => Work[];

  addTutorial: (tutorial: Omit<Tutorial, 'id' | 'createdAt' | 'collectCount'>) => void;
  getTutorialById: (id: string) => Tutorial | undefined;
  getFilteredTutorials: () => Tutorial[];

  getTopicById: (id: string) => Topic | undefined;
  getTopics: () => Topic[];

  getUserById: (id: string) => User | undefined;
}

const getStoredCollections = (): Collection[] => {
  try {
    const stored = localStorage.getItem('craft_collections');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const getStoredTutorials = (): Tutorial[] => {
  try {
    const stored = localStorage.getItem('craft_tutorials');
    return stored ? JSON.parse(stored) : initialTutorials;
  } catch {
    return initialTutorials;
  }
};

const getStoredWorks = (): Work[] => {
  try {
    const stored = localStorage.getItem('craft_works');
    return stored ? JSON.parse(stored) : initialWorks;
  } catch {
    return initialWorks;
  }
};

export const useAppStore = create<AppState>((set, get) => ({
  tutorials: getStoredTutorials(),
  users: initialUsers,
  works: getStoredWorks(),
  topics: initialTopics,
  collections: getStoredCollections(),
  currentUser: initialUsers[6],
  searchKeyword: '',
  selectedCategory: 'all',
  selectedDifficulty: 'all',

  setCurrentUser: (user) => set({ currentUser: user }),
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),

  toggleCollection: (tutorialId, userId) => {
    const { collections, tutorials } = get();
    const existingIndex = collections.findIndex(
      (c) => c.tutorialId === tutorialId && c.userId === userId
    );

    let newCollections: Collection[];
    let newTutorials: Tutorial[];

    if (existingIndex >= 0) {
      newCollections = collections.filter((_, i) => i !== existingIndex);
      newTutorials = tutorials.map((t) =>
        t.id === tutorialId ? { ...t, collectCount: Math.max(0, t.collectCount - 1) } : t
      );
    } else {
      newCollections = [
        ...collections,
        {
          id: `col-${Date.now()}`,
          userId,
          tutorialId,
          createdAt: new Date().toISOString().split('T')[0],
        },
      ];
      newTutorials = tutorials.map((t) =>
        t.id === tutorialId ? { ...t, collectCount: t.collectCount + 1 } : t
      );
    }

    localStorage.setItem('craft_collections', JSON.stringify(newCollections));
    localStorage.setItem('craft_tutorials', JSON.stringify(newTutorials));
    set({ collections: newCollections, tutorials: newTutorials });
  },

  isCollected: (tutorialId, userId) => {
    const { collections } = get();
    return collections.some((c) => c.tutorialId === tutorialId && c.userId === userId);
  },

  getCollectedTutorials: (userId) => {
    const { collections, tutorials } = get();
    const collectedIds = collections
      .filter((c) => c.userId === userId)
      .map((c) => c.tutorialId);
    return tutorials.filter((t) => collectedIds.includes(t.id));
  },

  addWork: (work) => {
    const { works, currentUser } = get();
    const newWork: Work = {
      ...work,
      id: `work-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      userName: currentUser?.name,
      userAvatar: currentUser?.avatar,
    };
    const newWorks = [newWork, ...works];
    localStorage.setItem('craft_works', JSON.stringify(newWorks));
    set({ works: newWorks });
  },

  getWorksByTutorial: (tutorialId) => {
    const { works } = get();
    return works.filter((w) => w.tutorialId === tutorialId);
  },

  getWorksByUser: (userId) => {
    const { works } = get();
    return works.filter((w) => w.userId === userId);
  },

  addTutorial: (tutorial) => {
    const { tutorials, currentUser } = get();
    const newTutorial: Tutorial = {
      ...tutorial,
      id: `tut-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      collectCount: 0,
      authorId: currentUser?.id || 'artisan-1',
    };
    const newTutorials = [newTutorial, ...tutorials];
    localStorage.setItem('craft_tutorials', JSON.stringify(newTutorials));
    set({ tutorials: newTutorials });
  },

  getTutorialById: (id) => {
    const { tutorials } = get();
    return tutorials.find((t) => t.id === id);
  },

  getFilteredTutorials: () => {
    const { tutorials, searchKeyword, selectedCategory, selectedDifficulty } = get();
    return tutorials.filter((t) => {
      if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && t.difficulty !== selectedDifficulty) return false;
      if (searchKeyword) {
        const keyword = searchKeyword.toLowerCase();
        if (
          !t.title.toLowerCase().includes(keyword) &&
          !t.description.toLowerCase().includes(keyword)
        ) {
          return false;
        }
      }
      return true;
    });
  },

  getTopicById: (id) => {
    const { topics } = get();
    return topics.find((t) => t.id === id);
  },

  getTopics: () => {
    const { topics } = get();
    return topics;
  },

  getUserById: (id) => {
    const { users } = get();
    return users.find((u) => u.id === id);
  },
}));
