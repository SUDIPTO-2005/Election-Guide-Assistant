import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsPage from './SettingsPage';

const mockLogin = vi.fn();
const mockRegister = vi.fn();
const mockLogout = vi.fn();

vi.mock('../store', () => ({
  useAppStore: () => ({
    theme: 'light',
    setTheme: vi.fn(),
    language: 'en',
    setLanguage: vi.fn(),
    resetProgress: vi.fn(),
    user: null,
    login: mockLogin,
    register: mockRegister,
    logout: mockLogout,
  }),
}));

describe('SettingsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render settings page', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Google Firebase Cloud Sync')).toBeInTheDocument();
  });

  it('should toggle registration mode when button is clicked', () => {
    render(<SettingsPage />);
    
    const toggleBtn = screen.getByText('Need an account? Register');
    fireEvent.click(toggleBtn);
    
    expect(screen.getByText('Already have an account? Sign In')).toBeInTheDocument();
  });
});
