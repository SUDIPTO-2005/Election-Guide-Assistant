import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, CheckCircle2, Bookmark, ArrowLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { lessons } from '../data/lessons';
import { useAppStore } from '../store';
import type { Lesson } from '../types';

const LearnPage = () => {
  const { t } = useTranslation();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  const { 
    savedLessons, 
    completedLessons, 
    toggleSavedLesson, 
    markLessonComplete 
  } = useAppStore();

  const categories = Array.from(new Set(lessons.map(l => l.category)));

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === selectedLesson?.quiz[currentQuestion].correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);

    if (selectedLesson && currentQuestion < selectedLesson.quiz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      const finalScore = isCorrect ? score + 1 : score;
      const passThreshold = Math.ceil(selectedLesson!.quiz.length * 0.6);
      if (finalScore >= passThreshold) {
        markLessonComplete(selectedLesson!.id);
      }
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  // Master View: List of Lessons
  if (!selectedLesson) {
    return (
      <div className="max-w-[1200px] mx-auto space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary-500" />
              {t('Learn Module')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {t('Master the basics of elections and voting processes.')}
            </p>
          </div>
          
          {/* Progress Summary */}
          <div className="bg-white dark:bg-[#1a2133] px-4 py-2 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-4 border-gray-100 dark:border-gray-800 relative flex items-center justify-center">
               <svg className="absolute inset-0 w-full h-full -rotate-90">
                 <circle cx="16" cy="16" r="16" fill="transparent" strokeWidth="4" className="stroke-primary-500" strokeDasharray="100" strokeDashoffset={100 - (completedLessons.length / lessons.length) * 100} />
               </svg>
               <span className="text-[10px] font-bold">{Math.round((completedLessons.length / lessons.length) * 100)}%</span>
            </div>
            <div>
              <p className="text-sm font-bold leading-none">{completedLessons.length} / {lessons.length}</p>
              <p className="text-[11px] text-gray-500">{t('Completed')}</p>
            </div>
          </div>
        </div>

        {categories.map(category => (
          <div key={category} className="space-y-4">
            <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-800 pb-2">{t(category)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lessons.filter(l => l.category === category).map((lesson, idx) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isSaved = savedLessons.includes(lesson.id);

                return (
                  <motion.div 
                    key={lesson.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => {
                      setSelectedLesson(lesson);
                      resetQuiz();
                    }}
                    className={`card p-5 cursor-pointer hover:border-primary-500/50 transition-colors relative group ${
                      isCompleted ? 'bg-gray-50 dark:bg-[#151a28]' : ''
                    }`}
                  >
                    {isCompleted && (
                      <div className="absolute top-4 right-4 text-green-500">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                    
                    <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center mb-4">
                      <PlayCircle className="w-5 h-5" />
                    </div>
                    
                    <h3 className="font-bold text-[15px] mb-2 pr-6">{t(lesson.title)}</h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 h-10">
                      {t(lesson.description)}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {lesson.readTime} min
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSavedLesson(lesson.id);
                        }}
                        className={`p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isSaved ? 'text-primary-500' : ''}`}
                      >
                        <Bookmark className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Detail View: Reading Content or Quiz
  const isCompleted = completedLessons.includes(selectedLesson.id);
  const isSaved = savedLessons.includes(selectedLesson.id);

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={selectedLesson.id + (quizStarted ? '-quiz' : '-content')}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-[800px] mx-auto space-y-6 pb-10"
      >
        <button 
          onClick={() => {
            setSelectedLesson(null);
            resetQuiz();
          }}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> {t('Back to Lessons')}
        </button>

        <div className="bg-white dark:bg-[#1a2133] rounded-2xl p-6 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
          {!quizStarted ? (
            // Lesson Content View
            <>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-xs font-bold uppercase tracking-wider">
                  {t(selectedLesson.category)}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    <Clock className="w-4 h-4" /> {selectedLesson.readTime} min read
                  </span>
                  <button 
                    onClick={() => toggleSavedLesson(selectedLesson.id)}
                    className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isSaved ? 'text-primary-500' : 'text-gray-400'}`}
                    title={isSaved ? "Remove Bookmark" : "Bookmark Lesson"}
                  >
                    <Bookmark className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4">{t(selectedLesson.title)}</h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
                {t(selectedLesson.description)}
              </p>

              <div className="prose prose-blue dark:prose-invert max-w-none mb-12">
                <p className="text-[15px] leading-loose text-gray-700 dark:text-gray-300">
                  {t(selectedLesson.content)}
                </p>
              </div>

              <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <button 
                  onClick={handleStartQuiz}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                    isCompleted 
                      ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20' 
                      : 'bg-primary-500 hover:bg-primary-600 text-white shadow-md'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                  {isCompleted ? t('Retake Quiz') : t('Take Quiz')}
                </button>

                <button 
                  onClick={() => setSelectedLesson(null)}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
                >
                  {t('Continue Learning')} <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : showResult ? (
            // Quiz Result View
            <div className="text-center py-8">
              <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
                (score / selectedLesson.quiz.length) >= 0.6 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{t('Quiz Results')}</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {t('Score')}: {score} / {selectedLesson.quiz.length} ({Math.round((score / selectedLesson.quiz.length) * 100)}%)
              </p>
              
              {(score / selectedLesson.quiz.length) >= 0.6 ? (
                <div className="space-y-6">
                  <p className="text-green-600 font-medium">{t('Passed!')}</p>
                  <button 
                    onClick={() => setSelectedLesson(null)}
                    className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold shadow-lg transition-all"
                  >
                    {t('Continue to Next Lesson')}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-red-600 font-medium">{t('You need 60% to pass this module.')}</p>
                  <button 
                    onClick={handleStartQuiz}
                    className="w-full py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl font-bold shadow-lg transition-all"
                  >
                    {t('Try Again')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Active Quiz View
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs md:text-sm font-bold text-primary-500 uppercase tracking-widest">
                  {t('Question')} {currentQuestion + 1} / {selectedLesson.quiz.length}
                </span>
                <div className="w-full sm:w-32 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 transition-all duration-300" 
                    style={{ width: `${((currentQuestion + 1) / selectedLesson.quiz.length) * 100}%` }}
                  />
                </div>
              </div>

              <h2 className="text-lg md:text-xl lg:text-2xl font-bold leading-tight text-gray-900 dark:text-white">
                {t(selectedLesson.quiz[currentQuestion].question)}
              </h2>

              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {selectedLesson.quiz[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`p-4 md:p-5 rounded-xl text-left border-2 transition-all group ${
                      selectedAnswer === idx 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400' 
                        : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 bg-white dark:bg-[#1a2133]'
                    }`}
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-colors ${
                        selectedAnswer === idx 
                          ? 'border-primary-500 bg-primary-500 text-white' 
                          : 'border-gray-300 dark:border-gray-600 text-gray-500 group-hover:border-primary-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="font-medium text-sm md:text-base leading-snug">
                        {t(option)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 md:pt-6">
                <button
                  disabled={selectedAnswer === null}
                  onClick={handleNextQuestion}
                  className={`w-full py-4 md:py-5 rounded-xl font-bold shadow-lg transition-all transform active:scale-[0.98] ${
                    selectedAnswer !== null 
                      ? 'bg-primary-500 hover:bg-primary-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  {currentQuestion < selectedLesson.quiz.length - 1 ? t('Next Question') : t('Finish Quiz')}
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LearnPage;
