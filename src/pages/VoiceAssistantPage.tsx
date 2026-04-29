import { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2, Info, MessageSquare, History, MicOff } from 'lucide-react';
import { knowledgeBase } from '../components/ChatAssistant';
import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;


const VoiceAssistantPage = () => {
  const { t } = useTranslation();
  const [, setIsListening] = useState(false);
  const [voiceStep, setVoiceStep] = useState(0); // 0: Idle, 1: Listening, 2: Thinking, 3: Responding
  const [userSpeech, setUserSpeech] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [history, setHistory] = useState<{q: string, a: string}[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Check browser support once
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const isSupported = !!SpeechRecognitionAPI;

  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const getAnswer = useCallback((transcript: string) => {
    const normalized = transcript.toLowerCase();
    let answerKey = 'kb.default';
    
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (key !== 'default' && normalized.includes(key)) {
        answerKey = value;
        break;
      }
    }
    return t(answerKey, { lng: 'en' });
  }, [t]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      alert("Speech recognition is not supported in this browser. Please try Google Chrome.");
      return;
    }

    // Create a fresh recognition instance each time
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    setIsListening(true);
    setVoiceStep(1);
    setUserSpeech('');
    setAiResponse('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserSpeech(transcript);

      // Only process final results
      if (event.results[0].isFinal) {
        setVoiceStep(2);

        if (ai) {
          try {
            const response = await ai.models.generateContent({
              model: 'gemini-2.0-flash',
              contents: `You are an Election Guide Assistant. Answer the following question about elections in a helpful and accurate manner. Keep it concise. Question: ${transcript}`,
            });
            const answer = response.text || "Sorry, I couldn't generate a response.";
            setAiResponse(answer);
            setVoiceStep(3);
            setHistory(prev => [{q: transcript, a: answer}, ...prev].slice(0, 5));
            speakText(answer);
          } catch (error) {
            console.error('Gemini API error:', error);
            // Fallback
            const answer = getAnswer(transcript);
            setAiResponse(answer);
            setVoiceStep(3);
            setHistory(prev => [{q: transcript, a: answer}, ...prev].slice(0, 5));
            speakText(answer);
          }
        } else {
          setTimeout(() => {
            const answer = getAnswer(transcript);
            setAiResponse(answer);
            setVoiceStep(3);
            setHistory(prev => [{q: transcript, a: answer}, ...prev].slice(0, 5));
            speakText(answer);
          }, 1200);
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'no-speech') {
        setVoiceStep(0);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error('Failed to start recognition:', e);
      setIsListening(false);
      setVoiceStep(0);
    }
  }, [isSupported, SpeechRecognitionAPI, getAnswer, speakText]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setVoiceStep(0);
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto space-y-6 sm:space-y-8 pb-10">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
          {t('Voice Assistant')}
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
          {t('Ask anything about elections using your voice for instant audio answers.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Main Assistant Area */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center text-center min-h-[320px] sm:min-h-[450px] relative overflow-hidden shadow-sm bg-grid-pattern">
            {/* Animated Decorative Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 sm:w-64 h-48 sm:h-64 border border-primary-200/30 dark:border-primary-800/20 rounded-full animate-spin-slow"></div>
              <div className="absolute w-72 sm:w-96 h-72 sm:h-96 border border-primary-100/20 dark:border-primary-900/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '12s' }}></div>
              <div className="absolute w-36 sm:w-44 h-36 sm:h-44 bg-primary-500/5 dark:bg-primary-500/5 rounded-full animate-blob"></div>
            </div>

            <AnimatePresence mode="wait">
              {voiceStep === 0 ? (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6 sm:space-y-8 relative z-10"
                >
                  {!isSupported ? (
                    <>
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 text-white rounded-full flex items-center justify-center shadow-2xl mx-auto">
                        <MicOff className="w-8 h-8 sm:w-10 sm:h-10" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">Not Supported</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                          Speech recognition is not available in this browser. Please use Google Chrome.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={startListening}
                        className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary-500/30 cursor-pointer hover:scale-110 transition-all duration-300 active:scale-95 group mx-auto animate-glow border-none"
                        aria-label="Start listening"
                      >
                        <Mic className="w-8 h-8 sm:w-10 sm:h-10 group-hover:animate-pulse" />
                      </button>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">{t('Ready to listen')}</h2>
                        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">{t('Tap the microphone to start asking questions.')}</p>
                      </div>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="active"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 sm:space-y-10 w-full relative z-10"
                >
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto flex items-center justify-center">
                    <div className={`absolute inset-0 bg-primary-500/20 rounded-full animate-ping ${voiceStep === 1 ? 'opacity-100' : 'opacity-0'}`}></div>
                    <div className={`absolute inset-0 border-4 border-primary-500/30 rounded-full ${voiceStep === 2 ? 'animate-spin border-t-primary-500' : ''}`}></div>
                    
                    <button 
                      className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-xl cursor-pointer border-none"
                      onClick={voiceStep === 1 ? stopListening : undefined}
                      aria-label={voiceStep === 1 ? "Stop listening" : "Listen to response"}
                    >
                      {voiceStep === 1 ? <Mic className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" /> : <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" />}
                    </button>
                  </div>

                  <div className="space-y-4 sm:space-y-6 max-w-xl mx-auto px-2">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-primary-500 uppercase tracking-widest">{voiceStep === 1 ? t('Listening...') : t('You asked')}</p>
                      <h3 className="text-lg sm:text-xl font-bold italic text-gray-700 dark:text-gray-200 break-words">
                        "{userSpeech || t('Say something...')}"
                      </h3>
                    </div>

                    {voiceStep === 3 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 sm:p-6 bg-primary-50 dark:bg-primary-900/10 rounded-2xl border border-primary-100 dark:border-primary-800/50"
                      >
                         <p className="text-left text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                           {aiResponse}
                         </p>
                      </motion.div>
                    )}
                  </div>

                  {voiceStep === 3 && (
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button 
                        onClick={() => setVoiceStep(0)}
                        className="px-6 sm:px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold shadow-lg hover:opacity-90 transition-all"
                      >
                        {t('Ask another question')}
                      </button>
                      <button
                        onClick={() => speakText(aiResponse)}
                        className="px-6 sm:px-8 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                      >
                        <Volume2 className="w-4 h-4" /> Replay
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tips Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
             <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/30 flex gap-4">
                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                   <h4 className="font-bold text-sm mb-1">{t('Try asking...')}</h4>
                   <p className="text-xs text-blue-700 dark:text-blue-400">"What is the voting age in India?"</p>
                </div>
             </div>
             <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-800/30 flex gap-4">
                <MessageSquare className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div>
                   <h4 className="font-bold text-sm mb-1">{t('Expert Guidance')}</h4>
                   <p className="text-xs text-purple-700 dark:text-purple-400">{t('Get accurate information about the voting process.')}</p>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar / History Area */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white dark:bg-[#1a2133] border border-gray-100 dark:border-gray-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 mb-4 sm:mb-6">
              <History className="w-5 h-5 text-gray-400" />
              {t('Recent Interaction')}
            </h3>
            
            <div className="space-y-4">
              {history.length > 0 ? history.map((item, i) => (
                <div key={i} className="space-y-2 pb-4 border-b border-gray-50 dark:border-gray-800 last:border-0 last:pb-0">
                  <p className="text-xs font-bold text-primary-500 italic break-words">"{item.q}"</p>
                  <p className="text-[13px] text-gray-600 dark:text-gray-400 line-clamp-3">{item.a}</p>
                  <button 
                    onClick={() => speakText(item.a)} 
                    className="text-[11px] font-medium text-gray-400 hover:text-primary-500 flex items-center gap-1 transition-colors"
                  >
                    <Volume2 className="w-3 h-3" /> Replay
                  </button>
                </div>
              )) : (
                <div className="py-8 sm:py-10 text-center space-y-2">
                   <Mic className="w-8 h-8 text-gray-200 dark:text-gray-700 mx-auto" />
                   <p className="text-sm text-gray-400">{t('No history yet.')}</p>
                   <p className="text-xs text-gray-300 dark:text-gray-600">Start by tapping the microphone</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white">
             <h3 className="font-bold mb-2">{t('Privacy First')}</h3>
             <p className="text-xs text-primary-100 leading-relaxed opacity-90">
               {t('Your voice interactions are processed locally in your browser and are never stored on our servers.')}
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VoiceAssistantPage;
