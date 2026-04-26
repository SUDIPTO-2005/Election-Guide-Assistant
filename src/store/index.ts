import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface AppState {
  theme: Theme;
  language: string;
  savedLessons: string[];
  completedLessons: string[];
  savedQuestions: string[];
  quizScores: Record<string, number>;
  countryPreference: string;
  isChatOpen: boolean;
  setTheme: (theme: Theme) => void;
  setLanguage: (lang: string) => void;
  toggleSavedLesson: (id: string) => void;
  markLessonComplete: (id: string) => void;
  toggleSavedQuestion: (id: string) => void;
  saveQuizScore: (category: string, score: number) => void;
  setCountryPreference: (countryId: string) => void;
  toggleChatOpen: () => void;
  resetProgress: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'system',
      language: 'en',
      savedLessons: [],
      completedLessons: [],
      savedQuestions: [],
      quizScores: {},
      countryPreference: 'in',
      isChatOpen: false,
      
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      
      toggleSavedLesson: (id) => set((state) => ({
        savedLessons: state.savedLessons.includes(id) 
          ? state.savedLessons.filter(lessonId => lessonId !== id)
          : [...state.savedLessons, id]
      })),
      
      markLessonComplete: (id) => set((state) => ({
        completedLessons: state.completedLessons.includes(id)
          ? state.completedLessons
          : [...state.completedLessons, id]
      })),
      
      toggleSavedQuestion: (id) => set((state) => ({
        savedQuestions: state.savedQuestions.includes(id)
          ? state.savedQuestions.filter(qId => qId !== id)
          : [...state.savedQuestions, id]
      })),
      
      saveQuizScore: (category, score) => set((state) => ({
        quizScores: {
          ...state.quizScores,
          [category]: Math.max(state.quizScores[category] || 0, score)
        }
      })),
      
      setCountryPreference: (countryPreference) => set({ countryPreference }),
      
      toggleChatOpen: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
      
      resetProgress: () => set({ 
        completedLessons: [], 
        quizScores: {},
        savedLessons: [],
        savedQuestions: []
      })
    }),
    {
      name: 'election-guide-storage',
    }
  )
);
