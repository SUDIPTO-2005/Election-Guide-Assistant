import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LearnPage from './LearnPage';
import { lessons } from '../data/lessons';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockToggleSavedLesson = vi.fn();
const mockMarkLessonComplete = vi.fn();

vi.mock('../store', () => ({
  useAppStore: () => ({
    savedLessons: [],
    completedLessons: [],
    toggleSavedLesson: mockToggleSavedLesson,
    markLessonComplete: mockMarkLessonComplete,
  }),
}));

describe('LearnPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render learn page with categories', () => {
    render(
      <MemoryRouter>
        <LearnPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Learn Module')).toBeInTheDocument();
  });

  it('should open lesson content when a lesson is clicked', () => {
    render(
      <MemoryRouter>
        <LearnPage />
      </MemoryRouter>
    );

    // Click on first lesson title
    const lessonTitle = lessons[0].title;
    const lessonCard = screen.getByText(lessonTitle);
    fireEvent.click(lessonCard);

    // Should render detail view
    expect(screen.getByText('Back to Lessons')).toBeInTheDocument();
  });
});
