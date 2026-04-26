import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Bell, Menu, Globe, Moon, Sun, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store';
import { languages } from '../../i18n';
import { lessons } from '../../data/lessons';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { theme, setTheme } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = lessons.filter(l => 
        t(l.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
        t(l.description).toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery, t]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleResultClick = (lessonId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsMobileSearchOpen(false);
    navigate('/learn');
  };

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <header className="h-16 md:h-20 bg-background-light dark:bg-background-dark flex items-center justify-between px-3 sm:px-6 md:px-10 shrink-0 relative z-50 gap-2">
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuToggle}
          className="md:hidden p-2 text-gray-500 hover:bg-white dark:hover:bg-surface-dark rounded-xl shrink-0"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Search */}
        <div ref={searchRef} className="relative max-w-md w-full hidden md:block">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Search lessons, topics...')} 
            className="input-field pl-10 pr-10 py-2.5 bg-white dark:bg-[#1a2133] border-none text-sm w-full max-w-[300px]"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}

          {/* Search Results Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-full mt-2 w-full max-w-[350px] bg-white dark:bg-[#1a2133] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden py-2">
              <div className="px-4 py-2 border-b border-gray-50 dark:border-gray-800/50">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('Search Results')}</span>
              </div>
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <button 
                    key={result.id}
                    onClick={() => handleResultClick(result.id)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold group-hover:text-primary-500 transition-colors truncate">{t(result.title)}</p>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{t(result.description)}</p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-gray-300 group-hover:text-primary-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-gray-500">{t('No results found for')}</p>
                  <p className="text-sm font-bold italic">"{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Search Toggle */}
        <button 
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          className="md:hidden p-2 text-gray-500 hover:bg-white dark:hover:bg-surface-dark rounded-xl shrink-0"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
        {/* Language Selector */}
        <div className="relative flex items-center bg-white dark:bg-[#1a2133] rounded-full px-2 sm:px-3 py-1.5 shadow-sm border border-gray-100 dark:border-gray-800">
          <Globe className="w-4 h-4 text-gray-500 mr-1 sm:mr-2 hidden sm:block" />
          <select 
            onChange={handleLanguageChange}
            value={i18n.language}
            className="bg-transparent text-xs sm:text-sm font-medium focus:outline-none cursor-pointer text-gray-700 dark:text-gray-200 appearance-none pr-4"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code} className="dark:bg-surface-dark">
                {lang.name.split(' ')[0]}
              </option>
            ))}
          </select>
          <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"/>
            </svg>
          </div>
        </div>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 sm:p-2.5 bg-white dark:bg-[#1a2133] border border-gray-100 dark:border-gray-800 text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 rounded-full shadow-sm transition-colors"
          title="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notification Bell */}
        <button className="p-2 sm:p-2.5 bg-white dark:bg-[#1a2133] border border-gray-100 dark:border-gray-800 text-gray-500 hover:text-primary-500 dark:hover:text-primary-400 rounded-full shadow-sm relative transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* Mobile Search Bar (expandable) */}
      {isMobileSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-[#151a28] border-b border-gray-100 dark:border-gray-800 p-3 md:hidden z-50">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('Search lessons, topics...')} 
              className="input-field pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-[#1a2133] border-none text-sm w-full"
            />
            <button 
              onClick={() => { setSearchQuery(''); setIsMobileSearchOpen(false); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Mobile search results */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="mt-2 bg-white dark:bg-[#1a2133] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              {searchResults.map((result) => (
                <button 
                  key={result.id}
                  onClick={() => handleResultClick(result.id)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-between border-b border-gray-50 dark:border-gray-800 last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold truncate">{t(result.title)}</p>
                    <p className="text-[11px] text-gray-500 truncate">{t(result.description)}</p>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-300 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
