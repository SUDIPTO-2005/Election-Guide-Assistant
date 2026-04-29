import { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, Volume2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;


interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

// Basic knowledge base for the AI to respond intelligently
export const knowledgeBase: Record<string, string> = {
  // English Keywords
  "voting": "kb.voting_work",
  "vote": "kb.voting_work",
  "evm": "kb.evm",
  "who conducts": "kb.eci",
  "election commission": "kb.eci",
  "age in india": "kb.voting_age_india",
  "age": "kb.voting_age_global",
  "register": "kb.register",
  "nota": "kb.nota",
  "code of conduct": "kb.mcc",
  
  "default": "kb.default"
};

const ChatAssistant = ({ isOpen, onClose }: ChatAssistantProps) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t("Hello! I am your Election Guide Assistant. You can ask me anything about the voting process, candidates, or election rules. How can I help you today?", { lng: 'en' }),
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Speech Recognition setup
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US'; // Always English
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (recognition) {
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        // Auto-send after a short delay
        setTimeout(() => handleSendText(transcript), 500);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
    }
  }, [recognition]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US'; // Always English
      window.speechSynthesis.speak(utterance);
    }
  };

  const getAIResponse = (userText: string) => {
    const normalized = userText.toLowerCase();
    let answerKey = 'kb.default';
    
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (key !== 'default' && normalized.includes(key)) {
        answerKey = value;
        break;
      }
    }
    return t(answerKey, { lng: 'en' }); // Always return English response
  };

  const handleSendText = async (textToProcess: string) => {
    if (!textToProcess.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToProcess,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: `You are an Election Guide Assistant. Answer the following question about elections in a helpful and accurate manner. Keep it concise. Question: ${textToProcess}`,
        });
        const responseText = response.text || "Sorry, I couldn't generate a response.";
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        speakText(responseText);
      } catch (error) {
        console.error('Gemini API error:', error);
        // Fallback to local KB
        const responseText = getAIResponse(textToProcess);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        speakText(responseText);
      }
    } else {
      // Simulate network delay for AI
      setTimeout(() => {
        const responseText = getAIResponse(textToProcess);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
        speakText(responseText); // Auto-speak AI response
      }, 1000);
    }
  };

  const handleSend = () => {
    handleSendText(input);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      setInput('');
      recognition?.start();
      setIsListening(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[420px] bg-white dark:bg-[#111827] shadow-2xl border-l border-gray-200 dark:border-gray-800 flex flex-col z-50 animate-slide-in-right">
      {/* Header */}
      <div className="h-20 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 bg-gradient-to-r from-primary-600 via-primary-500 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm relative">
             {isListening && <span className="absolute inset-0 rounded-full bg-white/30 animate-ping"></span>}
            <Mic className="w-5 h-5 text-white relative z-10" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight flex items-center gap-1.5">AI Assistant <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">Beta</span></h3>
            <p className="text-xs text-primary-100 flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> {isListening ? 'Listening...' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex gap-2 relative z-10">
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-white/20 rounded-lg transition-all duration-200 hover:rotate-90"
            aria-label="Close assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-transparent">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
            <div className={`max-w-[85%] rounded-2xl p-4 transition-all duration-300 ${
              msg.sender === 'user' 
                ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-tr-sm shadow-lg shadow-primary-500/20' 
                : 'bg-white dark:bg-[#1a2133] text-gray-800 dark:text-gray-200 rounded-tl-sm border border-gray-100 dark:border-gray-800 shadow-md'
            }`}>
              <p className="text-[14px] leading-relaxed">{msg.text}</p>
              <div className={`text-[10px] mt-2 flex items-center gap-1 ${msg.sender === 'user' ? 'text-primary-200 justify-end' : 'text-gray-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {msg.sender === 'ai' && <Volume2 onClick={() => speakText(msg.text)} className="w-3 h-3 cursor-pointer hover:text-primary-500" />}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-[#1a2133] rounded-2xl rounded-tl-sm p-4 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-end gap-2 relative">
          <button 
            onClick={toggleListening}
            className={`absolute left-2 bottom-2 p-2 rounded-full transition-colors z-10 ${
              isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-500'
            }`}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={isListening ? "Listening... Speak now." : "Type your question..."}
            className="w-full pl-12 pr-12 py-3 max-h-32 min-h-[48px] bg-gray-100 dark:bg-[#1a2133] border-none rounded-2xl resize-none focus:ring-2 focus:ring-primary-500 focus:outline-none text-[14px]"
            rows={1}
          />
          
          <button 
            onClick={handleSend}
            disabled={!input.trim() && !isListening}
            className="absolute right-2 bottom-2 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 transition-colors z-10"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center mt-3">
          <p className="text-[11px] text-gray-400">AI can make mistakes. Verify important information.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
