import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SettingsPage from './SettingsPage';

vi.mock('../store', () => ({
  useAppStore: () => ({
    theme: 'light',
    setTheme: vi.fn(),
    language: 'en',
    setLanguage: vi.fn(),
    resetProgress: vi.fn(),
  }),
}));

describe('SettingsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render settings page', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
