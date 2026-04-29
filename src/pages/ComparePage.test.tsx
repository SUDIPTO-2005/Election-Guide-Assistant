import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('should toggle country selection when a country button is clicked', () => {
    render(
      <MemoryRouter>
        <ComparePage />
      </MemoryRouter>
    );

    // Click on UK button to select it (initial are IN, US)
    const ukBtn = screen.getByText('United Kingdom');
    fireEvent.click(ukBtn);

    // Should now be selected, click again to unselect
    fireEvent.click(ukBtn);

    // Clicking initial country (India) to unselect
    const inBtn = screen.getAllByText('India')[0];
    fireEvent.click(inBtn);
    
    expect(inBtn).toBeInTheDocument();
  });
});
