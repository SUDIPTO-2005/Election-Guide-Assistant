import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LearnPage from './LearnPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../store', () => ({
  useAppStore: () => ({
    savedLessons: [],
    completedLessons: [],
    toggleSavedLesson: vi.fn(),
    markLessonComplete: vi.fn(),
  }),
}));

describe('LearnPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render learn page', () => {
    render(
      <MemoryRouter>
        <LearnPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Learn Module')).toBeInTheDocument();
  });
});
