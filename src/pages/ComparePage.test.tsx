import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ComparePage from './ComparePage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ComparePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render compare page', () => {
    render(
      <MemoryRouter>
        <ComparePage />
      </MemoryRouter>
    );
    expect(screen.getByText('Compare Countries')).toBeInTheDocument();
  });
});
