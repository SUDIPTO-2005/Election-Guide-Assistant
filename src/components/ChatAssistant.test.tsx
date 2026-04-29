import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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
    // Find the button with the X icon
    // The first button is usually the close button in this component
    const buttons = screen.getAllByRole('button');
    // Let's find the one that doesn't have text or has the X icon
    // In our component, the close button is the first one.
    fireEvent.click(buttons[0]);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
