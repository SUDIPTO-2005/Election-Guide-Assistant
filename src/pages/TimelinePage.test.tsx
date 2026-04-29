import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TimelinePage from './TimelinePage';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('TimelinePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render timeline page with title', () => {
    render(
      <MemoryRouter>
        <TimelinePage />
      </MemoryRouter>
    );
    expect(screen.getByText('Election Process Timeline')).toBeInTheDocument();
  });
});
