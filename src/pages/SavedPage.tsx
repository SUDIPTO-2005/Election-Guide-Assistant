import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Bookmark, Clock, PlayCircle, ArrowRight, Trash2 } from 'lucide-react';
import { useAppStore } from '../store';
import { lessons } from '../data/lessons';
import { useNavigate } from 'react-router-dom';

const SavedPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { savedLessons, toggleSavedLesson } = useAppStore();

  const savedItems = lessons.filter(l => savedLessons.includes(l.id));

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-primary-500" />
          {t('Saved Items')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {t('Review your bookmarked lessons and important election topics.')}
        </p>
      </div>

      {savedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItems.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-[#1a2133] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col group relative"
            >
              <button 
                onClick={() => toggleSavedLesson(item.id)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all"
                title={t('Remove Bookmark')}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center mb-4">
                <PlayCircle className="w-5 h-5" />
              </div>
              
              <h3 className="font-bold text-[15px] mb-2 pr-8">{t(item.title)}</h3>
              <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 h-10">
                {t(item.description)}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-50 dark:border-gray-800">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {item.readTime} min read
                </span>
                <button 
                  onClick={() => navigate('/learn')}
                  className="text-primary-600 font-bold flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  {t('Continue')} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-900/50 rounded-full flex items-center justify-center text-gray-300">
            <Bookmark className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{t('No saved items yet')}</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mt-1">
              {t('Bookmark lessons as you browse to keep track of important election knowledge.')}
            </p>
          </div>
          <button 
            onClick={() => navigate('/learn')}
            className="px-6 py-3 bg-primary-500 text-white rounded-xl font-bold shadow-lg hover:bg-primary-600 transition-all"
          >
            {t('Explore Lessons')}
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedPage;
