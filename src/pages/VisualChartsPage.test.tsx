import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import VisualChartsPage from './VisualChartsPage';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('VisualChartsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render visual charts page', () => {
    render(<VisualChartsPage />);
    expect(screen.getByText('Visual Charts & Data')).toBeInTheDocument();
  });
});
