import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './index';

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.getState().resetProgress();
  });

  it('should initialize with default values', () => {
    const state = useAppStore.getState();
    expect(state.theme).toBe('system');
    expect(state.language).toBe('en');
    expect(state.savedLessons).toEqual([]);
    expect(state.completedLessons).toEqual([]);
    expect(state.savedQuestions).toEqual([]);
    expect(state.quizScores).toEqual({});
    expect(state.countryPreference).toBe('in');
    expect(state.isChatOpen).toBe(false);
  });

  it('should set theme', () => {
    useAppStore.getState().setTheme('dark');
    expect(useAppStore.getState().theme).toBe('dark');
  });

  it('should set language', () => {
    useAppStore.getState().setLanguage('hi');
    expect(useAppStore.getState().language).toBe('hi');
  });

  it('should toggle saved lesson', () => {
    useAppStore.getState().toggleSavedLesson('lesson1');
    expect(useAppStore.getState().savedLessons).toContain('lesson1');
    
    useAppStore.getState().toggleSavedLesson('lesson1');
    expect(useAppStore.getState().savedLessons).not.toContain('lesson1');
  });

  it('should mark lesson complete', () => {
    useAppStore.getState().markLessonComplete('lesson1');
    expect(useAppStore.getState().completedLessons).toContain('lesson1');
    
    // Should not add duplicate
    useAppStore.getState().markLessonComplete('lesson1');
    expect(useAppStore.getState().completedLessons.length).toBe(1);
  });

  it('should toggle saved question', () => {
    useAppStore.getState().toggleSavedQuestion('q1');
    expect(useAppStore.getState().savedQuestions).toContain('q1');
    
    useAppStore.getState().toggleSavedQuestion('q1');
    expect(useAppStore.getState().savedQuestions).not.toContain('q1');
  });

  it('should save quiz score', () => {
    useAppStore.getState().saveQuizScore('general', 80);
    expect(useAppStore.getState().quizScores['general']).toBe(80);
    
    // Should only save higher score
    useAppStore.getState().saveQuizScore('general', 70);
    expect(useAppStore.getState().quizScores['general']).toBe(80);
    
    useAppStore.getState().saveQuizScore('general', 90);
    expect(useAppStore.getState().quizScores['general']).toBe(90);
  });

  it('should set country preference', () => {
    useAppStore.getState().setCountryPreference('us');
    expect(useAppStore.getState().countryPreference).toBe('us');
  });

  it('should toggle chat open', () => {
    useAppStore.getState().toggleChatOpen();
    expect(useAppStore.getState().isChatOpen).toBe(true);
    
    useAppStore.getState().toggleChatOpen();
    expect(useAppStore.getState().isChatOpen).toBe(false);
  });
});
