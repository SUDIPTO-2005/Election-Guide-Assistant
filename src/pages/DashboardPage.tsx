import { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Globe, 
  ArrowRight,
  Mic,
  BarChart2,
  Megaphone,
  FileText,
  Users,
  Inbox,
  X,
  Volume2,
  ChevronDown
} from 'lucide-react';
import { useAppStore } from '../store';
import { lessons } from '../data/lessons';
import { knowledgeBase } from '../components/ChatAssistant';

const DashboardPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toggleChatOpen, completedLessons } = useAppStore();
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStep, setVoiceStep] = useState(0);
  const [voiceResponse, setVoiceResponse] = useState('');
  const [userSpeech, setUserSpeech] = useState('');
  const recognitionRef = useRef<any>(null);

  const progressPercent = Math.round((completedLessons.length / lessons.length) * 100) || 0;

  const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

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

  const handleVoiceClick = useCallback(() => {
    if (!SpeechRecognitionAPI) {
      alert("Speech recognition is not supported in this browser. Please try Google Chrome.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    setIsVoiceActive(true);
    setVoiceStep(1);
    setUserSpeech('');
    setVoiceResponse('');

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserSpeech(transcript);

      if (event.results[0].isFinal) {
        setVoiceStep(2);

        setTimeout(() => {
          const normalized = transcript.toLowerCase();
          let answerKey = 'kb.default';
          for (const [key, value] of Object.entries(knowledgeBase)) {
            if (key !== 'default' && normalized.includes(key)) {
              answerKey = value;
              break;
            }
          }
          const answer = t(answerKey, { lng: 'en' });
          setVoiceResponse(answer);
          setVoiceStep(3);
          speakText(answer);
        }, 1200);
      }
    };

    recognition.onerror = () => {
      setIsVoiceActive(false);
      setVoiceStep(0);
    };

    recognition.onend = () => {
      // Don't close overlay - keep showing result
    };

    try {
      recognition.start();
    } catch (e) {
      setIsVoiceActive(false);
      setVoiceStep(0);
    }
  }, [SpeechRecognitionAPI, t, speakText]);

  const popularQuestions = [
    {
      q: 'How does voting work?',
      a: 'Voting is the process of casting a ballot to choose a representative. You register, go to a polling station, verify your ID, and cast your vote privately.'
    },
    {
      q: 'What is EVM?',
      a: 'Electronic Voting Machine (EVM) is a device used to record votes electronically. It consists of two units: a control unit and a balloting unit.'
    },
    {
      q: 'Who conducts elections in India?',
      a: 'The Election Commission of India (ECI) is the autonomous constitutional authority responsible for administering election processes in India.'
    },
    {
      q: 'Voting age in different countries?',
      a: 'While 18 is the most common voting age globally, some countries like Austria and Brazil allow voting at 16, while others have it at 20 or 21.'
    },
    {
      q: 'What is NOTA?',
      a: 'None of the Above (NOTA) is a ballot option that allows voters to officially register a vote of rejection for all candidates in an election.'
    },
    {
      q: 'What is the Model Code of Conduct?',
      a: 'It is a set of guidelines issued by the Election Commission to be followed by political parties and candidates during elections, mainly regarding speeches, polling day, polling booths, election manifestos, processions, and general conduct.'
    }
  ];


  return (
    <div className="max-w-[1200px] mx-auto space-y-6 sm:space-y-8 pb-10">
      
      {/* Hero Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white"
      >
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-blob" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/5 rounded-full animate-float-slow" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold flex items-center gap-2">
              {t('Welcome back, User! 👋')}
            </h1>
            <p className="text-sm sm:text-base text-primary-100 mt-1.5">{t("Let's continue your learning journey.")}</p>
          </div>
          <button 
            onClick={toggleChatOpen}
            className="flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-sm text-white border border-white/20 rounded-xl font-semibold shadow-lg hover:bg-white/25 transition-all duration-300 self-start sm:self-auto shrink-0 active:scale-[0.97]"
          >
            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            {t('Ask Assistant')}
          </button>
        </div>
      </motion.div>

      {/* 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: BookOpen, gradient: 'from-violet-500 to-purple-600', title: 'Election Basics', desc: 'Learn what elections are and why they matter.', linkText: 'Start Learning', path: '/learn' },
          { icon: CheckCircle2, gradient: 'from-emerald-500 to-green-600', title: 'Voting Steps', desc: 'Understand how to register and cast your vote.', linkText: 'Explore', path: '/learn' },
          { icon: Clock, gradient: 'from-amber-500 to-orange-600', title: 'Election Timeline', desc: 'See the complete election process step by step.', linkText: 'View Timeline', path: '/timeline' },
          { icon: Globe, gradient: 'from-sky-500 to-blue-600', title: 'Compare Countries', desc: 'Compare election systems across different countries.', linkText: 'Compare', path: '/compare' },
        ].map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, type: 'spring', stiffness: 300, damping: 24 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-[#1a2133] border border-gray-100 dark:border-gray-800/80 p-4 sm:p-5 rounded-2xl flex flex-col hover:shadow-xl hover:shadow-primary-500/5 dark:hover:shadow-primary-500/10 transition-all duration-300 cursor-pointer group relative overflow-hidden"
            onClick={() => navigate(card.path)}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white mb-3 sm:mb-4 bg-gradient-to-br ${card.gradient} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
              <card.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-bold text-[14px] sm:text-[15px] mb-1 sm:mb-2">{t(card.title)}</h3>
            <p className="text-[12px] sm:text-[13px] text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 flex-1">{t(card.desc)}</p>
            <button 
              className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1.5 group/link"
            >
              {t(card.linkText)} 
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform duration-300" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="bg-white dark:bg-[#1a2133] border border-gray-100 dark:border-gray-800/80 p-4 sm:p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="font-bold text-[15px] sm:text-[16px]">{t('Election Process Timeline')}</h2>
          <button 
            onClick={() => navigate('/timeline')}
            className="text-xs sm:text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center gap-1"
          >
            {t('View Full Timeline')} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        
        {/* Mobile: vertical list, Desktop: horizontal */}
        <div className="hidden md:block">
          <div className="relative flex justify-between items-start pt-2 px-2 md:px-8">
            <div className="absolute top-6 left-12 right-12 h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>
            
            {[
              { icon: Megaphone, color: 'bg-primary-500', title: 'Announcement', status: 'Completed', statusColor: 'text-green-500' },
              { icon: CheckCircle2, color: 'bg-green-500', title: 'Registration', status: 'Completed', statusColor: 'text-green-500' },
              { icon: FileText, color: 'bg-orange-500', title: 'Nomination', status: 'Completed', statusColor: 'text-green-500' },
              { icon: Users, color: 'bg-blue-500', title: 'Campaign', status: 'In Progress', statusColor: 'text-blue-500' },
              { icon: Inbox, color: 'bg-purple-500', title: 'Voting', status: 'Upcoming', statusColor: 'text-gray-400' },
              { icon: BarChart2, color: 'bg-pink-500', title: 'Counting & Results', status: 'Upcoming', statusColor: 'text-gray-400' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center w-full md:w-auto relative bg-white dark:bg-[#1a2133]">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-3 shadow-md border-4 border-white dark:border-[#1a2133] ${step.color}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-[12px] font-bold text-center whitespace-pre-wrap leading-tight h-8">{t(step.title).replace(' & ', ' &\n')}</span>
                <span className={`text-[11px] font-medium mt-1 ${step.statusColor}`}>{t(step.status)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile timeline - vertical compact list */}
        <div className="md:hidden space-y-3">
          {[
            { icon: Megaphone, color: 'bg-primary-500', title: 'Announcement', status: 'Completed', statusColor: 'text-green-500' },
            { icon: CheckCircle2, color: 'bg-green-500', title: 'Registration', status: 'Completed', statusColor: 'text-green-500' },
            { icon: FileText, color: 'bg-orange-500', title: 'Nomination', status: 'Completed', statusColor: 'text-green-500' },
            { icon: Users, color: 'bg-blue-500', title: 'Campaign', status: 'In Progress', statusColor: 'text-blue-500' },
            { icon: Inbox, color: 'bg-purple-500', title: 'Voting', status: 'Upcoming', statusColor: 'text-gray-400' },
            { icon: BarChart2, color: 'bg-pink-500', title: 'Counting & Results', status: 'Upcoming', statusColor: 'text-gray-400' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-sm shrink-0 ${step.color}`}>
                <step.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-bold block truncate">{t(step.title)}</span>
              </div>
              <span className={`text-[11px] font-medium shrink-0 ${step.statusColor}`}>{t(step.status)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress and Voice Assistant */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Progress Card */}
        <div className="bg-white dark:bg-[#1a2133] border border-gray-100 dark:border-gray-800/80 p-4 sm:p-6 rounded-2xl">
          <h2 className="font-bold text-[15px] sm:text-[16px] mb-4 sm:mb-6">{t('Your Learning Progress')}</h2>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full circular-chart">
                <path className="text-gray-100 dark:text-gray-800" strokeWidth="3" stroke="currentColor" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-primary-500" strokeWidth="3" strokeDasharray={`${progressPercent}, 100`} stroke="currentColor" fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl sm:text-3xl font-bold">{progressPercent}%</span>
                <span className="text-[10px] text-gray-500">{t('Completed')}</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-3 sm:space-y-4 w-full">
              {Array.from(new Set(lessons.map(l => l.category))).map((category, i) => {
                const categoryLessons = lessons.filter(l => l.category === category);
                const categoryCompleted = categoryLessons.filter(l => completedLessons.includes(l.id));
                const catProgress = Math.round((categoryCompleted.length / categoryLessons.length) * 100);
                
                return (
                  <div key={i} className="flex items-center justify-between text-xs gap-2">
                    <span className="text-gray-600 dark:text-gray-300 w-24 sm:w-32 truncate shrink-0">{t(category)}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden min-w-0">
                      <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${catProgress}%` }}></div>
                    </div>
                    <span className="text-gray-500 w-8 text-right shrink-0">{catProgress}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Voice Assistant Card */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-500 to-purple-600 p-4 sm:p-6 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[250px]">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full animate-blob" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full animate-float-slow" />
          
          <h2 className="font-bold text-[15px] sm:text-[16px] absolute top-4 sm:top-6 left-4 sm:left-6 text-white">{t('Quick Voice Assistant')}</h2>
          
          <div className="mt-6 sm:mt-8 mb-4 sm:mb-6 relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center cursor-pointer group" onClick={handleVoiceClick}>
            <div className="absolute w-full h-full bg-white/10 rounded-full scale-150 animate-pulse" />
            <div className="absolute w-full h-full bg-white/5 rounded-full scale-[2] animate-pulse-ring" />
            
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-2xl group-hover:scale-110 transition-transform duration-300 animate-glow">
              <Mic className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-primary-100 mt-2 whitespace-pre-wrap">
            {t('Tap the mic and ask\nanything about elections')}
          </p>
        </div>
        
      </div>

      {/* Popular Questions (FAQ Accordion) */}
      <div className="space-y-4">
        <h2 className="font-bold text-xl sm:text-2xl text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-3">
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
          {t('Popular Questions')}
        </h2>
        <div className="space-y-3">
          {popularQuestions.map((item, i) => {
            const isOpen = selectedQuestion === item.q;
            return (
              <div 
                key={i} 
                className="bg-white dark:bg-[#1a2133] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button 
                  onClick={() => setSelectedQuestion(isOpen ? null : item.q)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-4 text-left group"
                >
                  <span className="text-[14px] sm:text-[15px] font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary-500 transition-colors">
                    {t(item.q)}
                  </span>
                  <div className={`p-1.5 sm:p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-all shrink-0 ${isOpen ? 'rotate-180 bg-primary-50 dark:bg-primary-900/20' : ''}`}>
                    <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isOpen ? 'text-primary-500' : 'text-gray-400 group-hover:text-primary-500'}`} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-[13px] sm:text-[14px] leading-relaxed text-gray-600 dark:text-gray-400 border-t border-gray-50 dark:border-gray-800/50 pt-4 mt-2">
                        {t(item.a)}
                        <div className="mt-4 flex justify-end">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleChatOpen();
                            }}
                            className="text-xs font-bold text-primary-500 hover:text-primary-600 flex items-center gap-1.5 transition-colors"
                          >
                            {t('Ask for more details')} <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Voice Assistant Overlay */}
      <AnimatePresence>
        {isVoiceActive && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary-600/95 backdrop-blur-xl"
            />
            
            <button 
              onClick={() => { setIsVoiceActive(false); setVoiceStep(0); }}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/60 hover:text-white p-2 z-10"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative text-center text-white space-y-8 sm:space-y-12 max-w-md px-4 w-full"
            >
              <div className="relative w-28 h-28 sm:w-40 sm:h-40 mx-auto flex items-center justify-center">
                <div className={`absolute inset-0 bg-white/20 rounded-full animate-ping ${voiceStep === 1 ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className={`absolute inset-0 border-4 border-white/30 rounded-full ${voiceStep === 2 ? 'animate-spin border-t-white' : ''}`}></div>
                
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white text-primary-600 rounded-full flex items-center justify-center shadow-2xl">
                  {voiceStep === 1 ? <Mic className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" /> : 
                   voiceStep === 2 ? <Volume2 className="w-8 h-8 sm:w-10 sm:h-10" /> : 
                   <Volume2 className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />}
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold break-words">
                  {voiceStep === 1 ? (userSpeech || 'Listening...') : 
                   voiceStep === 2 ? 'Thinking...' : 
                   'I found this for you'}
                </h2>
                <p className="text-white/70 text-base sm:text-lg">
                  {voiceStep === 1 ? 'How can I help you today?' : 
                   voiceStep === 2 ? 'Processing your question...' : 
                   voiceResponse}
                </p>
              </div>

              {voiceStep === 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                  <button
                    onClick={() => { setIsVoiceActive(false); setVoiceStep(0); }}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-2xl font-bold shadow-lg"
                  >
                    Got it, thanks!
                  </button>
                  <button
                    onClick={() => speakText(voiceResponse)}
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/30 text-white rounded-2xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" /> Replay
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default DashboardPage;
