import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SavedPage from './SavedPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../store', () => ({
  useAppStore: () => ({
    savedLessons: [],
    toggleSavedLesson: vi.fn(),
  }),
}));

describe('SavedPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render saved page empty state', () => {
    render(
      <MemoryRouter>
        <SavedPage />
      </MemoryRouter>
    );
    expect(screen.getByText('No saved items yet')).toBeInTheDocument();
  });
});
