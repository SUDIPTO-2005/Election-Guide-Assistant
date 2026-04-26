import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Clock, 
  Globe, 
  BarChart2, 
  Mic, 
  Bookmark, 
  Settings,
  Zap,
  X,
  Sparkles
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/learn', icon: GraduationCap, label: 'Learn' },
  { path: '/timeline', icon: Clock, label: 'Timeline' },
  { path: '/compare', icon: Globe, label: 'Compare Countries' },
  { path: '/charts', icon: BarChart2, label: 'Visual Charts' },
  { path: '/assistant', icon: Mic, label: 'Voice Assistant' },
  { path: '/saved', icon: Bookmark, label: 'Saved' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isMobile = false, onClose }: SidebarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    navigate(path);
    if (isMobile && onClose) onClose();
  };

  return (
    <div className={`${isMobile ? 'w-[280px] h-full' : 'w-[260px] hidden md:flex'} bg-white dark:bg-[#111827] border-r border-gray-100 dark:border-gray-800/50 flex-col shrink-0 flex relative`}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/30 via-transparent to-primary-50/20 dark:from-primary-950/20 dark:via-transparent dark:to-primary-950/10 pointer-events-none" />
      
      <div className="h-20 flex items-center justify-between px-6 relative z-10">
        <div 
          className="flex items-center gap-3 text-gray-900 dark:text-white font-bold text-lg leading-tight tracking-tight cursor-pointer group" 
          onClick={() => handleNavClick('/')}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center relative shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow duration-300">
            <Zap className="w-5 h-5 text-white" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white dark:bg-[#111827] rounded-full flex items-center justify-center">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              Election
              <Sparkles className="w-3.5 h-3.5 text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-[11px] text-gray-400 dark:text-gray-500 font-normal tracking-wider uppercase">Guide Assistant</div>
          </div>
        </div>
        {isMobile && onClose && (
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 hover:rotate-90">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 relative z-10">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => { if (isMobile && onClose) onClose(); }}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-medium text-[13.5px] relative group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-500/10 to-primary-500/5 dark:from-primary-500/15 dark:to-primary-500/5 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full" />
                  )}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary-500/10 dark:bg-primary-500/20' 
                      : 'group-hover:bg-gray-100 dark:group-hover:bg-white/5'
                  }`}>
                    <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`} />
                  </div>
                  {t(item.label)}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* First time voter block */}
      <div className="p-4 mt-auto relative z-10">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-5 text-center relative overflow-hidden">
          {/* Decorative circles - pointer-events-none so they don't block clicks */}
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full pointer-events-none" />
          
          <div className="relative z-20">
            <div className="flex justify-center mb-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg animate-float pointer-events-none">
                 <div className="text-2xl">🗳️</div>
              </div>
            </div>
            <h4 className="font-bold text-sm text-white mb-1">{t('First time voter?')}</h4>
            <p className="text-[11px] text-primary-100 mb-4 px-1 leading-relaxed">
              {t('Get step-by-step guidance to vote confidently.')}
            </p>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNavClick('/learn'); }}
              className="w-full py-2.5 bg-white text-primary-600 text-sm font-bold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.97] relative z-30 cursor-pointer"
            >
              {t('Get Started')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
