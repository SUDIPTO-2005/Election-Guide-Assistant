import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VoiceAssistantPage from './VoiceAssistantPage';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

let latestRecognitionInstance: any = null;

// Mock SpeechRecognition
class MockSpeechRecognition {
  start = vi.fn();
  stop = vi.fn();
  continuous = false;
  interimResults = false;
  lang = 'en-US';
  onresult = vi.fn();
  onerror = vi.fn();
  onend = vi.fn();
  
  constructor() {
    latestRecognitionInstance = this;
  }
}

(window as any).SpeechRecognition = MockSpeechRecognition;
(window as any).webkitSpeechRecognition = MockSpeechRecognition;

// Mock SpeechSynthesis
class MockSpeechSynthesisUtterance {
  text: string;
  lang: string = '';
  rate: number = 1;
  pitch: number = 1;
  constructor(text: string) {
    this.text = text;
  }
}
(window as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance;

const mockSpeak = vi.fn();
const mockCancel = vi.fn();
(window as any).speechSynthesis = {
  speak: mockSpeak,
  cancel: mockCancel,
} as any;

describe('VoiceAssistantPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    latestRecognitionInstance = null;
  });

  it('should render voice assistant page', () => {
    render(
      <MemoryRouter>
        <VoiceAssistantPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Voice Assistant')).toBeInTheDocument();
  });

  it('should transition to listening state when mic is clicked', async () => {
    render(
      <MemoryRouter>
        <VoiceAssistantPage />
      </MemoryRouter>
    );

    const startBtn = screen.getByLabelText('Start listening');
    fireEvent.click(startBtn);

    await waitFor(() => {
      expect(screen.getByText('Listening...')).toBeInTheDocument();
    });
  });

  it('should stop listening when clicked in listening state', async () => {
    render(
      <MemoryRouter>
        <VoiceAssistantPage />
      </MemoryRouter>
    );

    const startBtn = screen.getByLabelText('Start listening');
    fireEvent.click(startBtn);

    await waitFor(() => {
      expect(screen.getByLabelText('Stop listening')).toBeInTheDocument();
    });

    const stopBtn = screen.getByLabelText('Stop listening');
    fireEvent.click(stopBtn);

    await waitFor(() => {
      expect(screen.getByText('Ready to listen')).toBeInTheDocument();
    });
  });

  it('should process speech input and show response (fallback path)', async () => {
    vi.useFakeTimers();
    render(
      <MemoryRouter>
        <VoiceAssistantPage />
      </MemoryRouter>
    );

    const startBtn = screen.getByLabelText('Start listening');
    fireEvent.click(startBtn);

    expect(latestRecognitionInstance).not.toBeNull();

    act(() => {
      latestRecognitionInstance.onresult({
        results: [
          Object.assign([{ transcript: 'voting' }], { isFinal: true })
        ]
      });
    });

    expect(screen.getAllByText(/voting/i).length).toBeGreaterThan(0);

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.getByText('kb.voting_work')).toBeInTheDocument();
    expect(mockSpeak).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('should trigger speech synthesis replay when replay is clicked', async () => {
    vi.useFakeTimers();
    render(
      <MemoryRouter>
        <VoiceAssistantPage />
      </MemoryRouter>
    );

    const startBtn = screen.getByLabelText('Start listening');
    fireEvent.click(startBtn);

    act(() => {
      latestRecognitionInstance.onresult({
        results: [
          Object.assign([{ transcript: 'voting' }], { isFinal: true })
        ]
      });
    });

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    const replayBtn = screen.getByText('Replay');
    fireEvent.click(replayBtn);

    expect(mockSpeak).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
