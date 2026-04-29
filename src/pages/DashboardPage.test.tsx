import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from './DashboardPage';

const mockNavigate = vi.fn();

class MockSpeechRecognition {
  start = vi.fn();
  stop = vi.fn();
  continuous = false;
  interimResults = false;
  lang = 'en-US';
  onresult = vi.fn();
  onerror = vi.fn();
  onend = vi.fn();
}

(window as any).SpeechRecognition = MockSpeechRecognition;
(window as any).webkitSpeechRecognition = MockSpeechRecognition;

// Mock window.alert to avoid JSDOM alert error
(window as any).alert = vi.fn();

// Mock react-router-dom
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockToggleChatOpen = vi.fn();
// Mock store
vi.mock('../store', () => ({
  useAppStore: () => ({
    toggleChatOpen: mockToggleChatOpen,
    completedLessons: [],
  }),
}));

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render dashboard with welcome message', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Welcome back, User! 👋')).toBeInTheDocument();
  });

  it('should call toggleChatOpen when Ask Assistant is clicked', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    const askBtn = screen.getByText('Ask Assistant');
    fireEvent.click(askBtn);

    expect(mockToggleChatOpen).toHaveBeenCalled();
  });

  it('should navigate to correct path when a navigation card is clicked', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    const timelineCard = screen.getByText('Election Timeline');
    fireEvent.click(timelineCard);

    expect(mockNavigate).toHaveBeenCalledWith('/timeline');
  });

  it('should open and close popular questions', async () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    const questionText = 'How does voting work?';
    const questionBtn = screen.getByText(questionText);

    // Click to open
    fireEvent.click(questionBtn);
    
    expect(screen.getByText(/Voting is the process/i)).toBeInTheDocument();

    // Click again to close
    fireEvent.click(questionBtn);
    
    // Wait for the AnimatePresence unmount
    await waitFor(() => {
      expect(screen.queryByText(/Voting is the process/i)).toBeNull();
    });
  });

  it('should trigger the voice assistant overlay when clicking the mic button', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    const voiceBtn = screen.getByLabelText('Activate voice assistant');
    fireEvent.click(voiceBtn);

    expect(screen.getByLabelText('Close voice assistant')).toBeInTheDocument();
  });
});
