import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ChatAssistant from './ChatAssistant';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

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

describe('ChatAssistant', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(<ChatAssistant isOpen={false} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render when isOpen is true', () => {
    render(<ChatAssistant isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('AI Assistant')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    render(<ChatAssistant isOpen={true} onClose={mockOnClose} />);
    const closeBtn = screen.getByLabelText('Close assistant');
    fireEvent.click(closeBtn);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should send a message and get an AI response (fallback path)', async () => {
    render(<ChatAssistant isOpen={true} onClose={mockOnClose} />);
    
    const input = screen.getByPlaceholderText('Type your question...');
    const sendBtn = screen.getByLabelText('Send message');

    // Type into the input
    fireEvent.change(input, { target: { value: 'voting' } });
    expect(input).toHaveValue('voting');

    // Click send
    fireEvent.click(sendBtn);

    // Should clear the input
    expect(input).toHaveValue('');

    // Should show user message
    expect(screen.getByText('voting')).toBeInTheDocument();

    // Fast-forward time for the setTimeout AI simulation
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Should show AI response (which is the knowledgeBase key or fallback string)
    expect(screen.getByText('kb.voting_work')).toBeInTheDocument();
  });

  it('should handle empty message submission gracefully', () => {
    render(<ChatAssistant isOpen={true} onClose={mockOnClose} />);
    const sendBtn = screen.getByLabelText('Send message');
    
    const initialMessagesCount = screen.queryAllByText(/kb\./).length;
    
    fireEvent.click(sendBtn);
    
    const afterMessagesCount = screen.queryAllByText(/kb\./).length;
    expect(initialMessagesCount).toBe(afterMessagesCount);
  });

  it('should send a message when Enter is pressed', () => {
    render(<ChatAssistant isOpen={true} onClose={mockOnClose} />);
    const input = screen.getByPlaceholderText('Type your question...');

    fireEvent.change(input, { target: { value: 'vote' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(input).toHaveValue('');
    expect(screen.getByText('vote')).toBeInTheDocument();
  });

  it('should toggle listening mode on microphone click', () => {
    render(<ChatAssistant isOpen={true} onClose={mockOnClose} />);
    const micBtn = screen.getByLabelText('Start listening');

    fireEvent.click(micBtn);

    expect(screen.getByPlaceholderText('Listening... Speak now.')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Stop listening'));
    expect(screen.getByPlaceholderText('Type your question...')).toBeInTheDocument();
  });

  it('should trigger speech synthesis when volume icon is clicked', () => {
    render(<ChatAssistant isOpen={true} onClose={mockOnClose} />);
    
    const input = screen.getByPlaceholderText('Type your question...');
    fireEvent.change(input, { target: { value: 'nota' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockSpeak).toHaveBeenCalled();
  });
});
