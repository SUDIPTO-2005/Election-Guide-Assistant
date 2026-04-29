import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VoiceAssistantPage from './VoiceAssistantPage';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('VoiceAssistantPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render voice assistant page', () => {
    render(
      <MemoryRouter>
        <VoiceAssistantPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Voice Assistant')).toBeInTheDocument();
  });
});
