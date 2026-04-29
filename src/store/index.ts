import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';

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
  user: FirebaseUser | null;
  
  setTheme: (theme: Theme) => void;
  setLanguage: (lang: string) => void;
  toggleSavedLesson: (id: string) => void;
  markLessonComplete: (id: string) => void;
  toggleSavedQuestion: (id: string) => void;
  saveQuizScore: (category: string, score: number) => void;
  setCountryPreference: (countryId: string) => void;
  toggleChatOpen: () => void;
  resetProgress: () => void;
  
  // Firebase Auth Methods
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: FirebaseUser | null) => void;
  syncToFirebase: () => Promise<void>;
  pullFromFirebase: () => Promise<void>;
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
      user: null,
      
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      
      toggleSavedLesson: (id) => set((state) => {
        const next = state.savedLessons.includes(id) 
          ? state.savedLessons.filter(lessonId => lessonId !== id)
          : [...state.savedLessons, id];
        
        // Auto sync if user exists
        if (state.user) {
          const userDoc = doc(db, 'users', state.user.uid);
          setDoc(userDoc, { savedLessons: next }, { merge: true }).catch(console.error);
        }
        return { savedLessons: next };
      }),
      
      markLessonComplete: (id) => set((state) => {
        const next = state.completedLessons.includes(id)
          ? state.completedLessons
          : [...state.completedLessons, id];
        
        if (state.user) {
          const userDoc = doc(db, 'users', state.user.uid);
          setDoc(userDoc, { completedLessons: next }, { merge: true }).catch(console.error);
        }
        return { completedLessons: next };
      }),
      
      toggleSavedQuestion: (id) => set((state) => {
        const next = state.savedQuestions.includes(id)
          ? state.savedQuestions.filter(qId => qId !== id)
          : [...state.savedQuestions, id];
        
        if (state.user) {
          const userDoc = doc(db, 'users', state.user.uid);
          setDoc(userDoc, { savedQuestions: next }, { merge: true }).catch(console.error);
        }
        return { savedQuestions: next };
      }),
      
      saveQuizScore: (category, score) => set((state) => {
        const nextScores = {
          ...state.quizScores,
          [category]: Math.max(state.quizScores[category] || 0, score)
        };
        
        if (state.user) {
          const userDoc = doc(db, 'users', state.user.uid);
          setDoc(userDoc, { quizScores: nextScores }, { merge: true }).catch(console.error);
        }
        return { quizScores: nextScores };
      }),
      
      setCountryPreference: (countryPreference) => set({ countryPreference }),
      
      toggleChatOpen: () => set((state) => ({ isChatOpen: !state.isChatOpen })),
      
      resetProgress: () => set({ 
        completedLessons: [], 
        quizScores: {},
        savedLessons: [],
        savedQuestions: []
      }),

      // Firebase Auth Methods
      setUser: (user) => set({ user }),

      login: async (email, pass) => {
        try {
          const res = await signInWithEmailAndPassword(auth, email, pass);
          set({ user: res.user });
          
          // Pull from Firebase
          const userDoc = await getDoc(doc(db, 'users', res.user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            set({
              savedLessons: data.savedLessons || [],
              completedLessons: data.completedLessons || [],
              savedQuestions: data.savedQuestions || [],
              quizScores: data.quizScores || {}
            });
          }
        } catch (e) {
          console.error("Login Error:", e);
          throw e;
        }
      },

      register: async (email, pass) => {
        try {
          const res = await createUserWithEmailAndPassword(auth, email, pass);
          set({ user: res.user });
          
          // Initialize document
          const userDoc = doc(db, 'users', res.user.uid);
          await setDoc(userDoc, {
            email,
            savedLessons: [],
            completedLessons: [],
            savedQuestions: [],
            quizScores: {}
          });
        } catch (e) {
          console.error("Registration Error:", e);
          throw e;
        }
      },

      logout: async () => {
        await signOut(auth);
        set({ user: null });
      },

      syncToFirebase: async () => {
        const state = useAppStore.getState();
        if (!state.user) return;
        
        try {
          const userDoc = doc(db, 'users', state.user.uid);
          await setDoc(userDoc, {
            savedLessons: state.savedLessons,
            completedLessons: state.completedLessons,
            savedQuestions: state.savedQuestions,
            quizScores: state.quizScores
          }, { merge: true });
        } catch (e) {
          console.error("Sync Error:", e);
        }
      },

      pullFromFirebase: async () => {
        const state = useAppStore.getState();
        if (!state.user) return;
        
        try {
          const userDoc = await getDoc(doc(db, 'users', state.user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            set({
              savedLessons: data.savedLessons || [],
              completedLessons: data.completedLessons || [],
              savedQuestions: data.savedQuestions || [],
              quizScores: data.quizScores || {}
            });
          }
        } catch (e) {
          console.error("Pull Sync Error:", e);
        }
      }
    }),
    {
      name: 'election-guide-storage',
      // Avoid circular serialization problems by ignoring the user object in localStorage
      partialize: (state) => {
        const { user, ...rest } = state;
        return rest;
      }
    }
  )
);
