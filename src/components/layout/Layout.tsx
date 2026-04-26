import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatAssistant from '../ChatAssistant';
import { useAppStore } from '../../store';

const Layout = () => {
  const theme = useAppStore((state) => state.theme);
  const { isChatOpen, toggleChatOpen } = useAppStore();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] animate-slide-in">
            <Sidebar isMobile onClose={() => setIsMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header onMenuToggle={() => setIsMobileSidebarOpen(prev => !prev)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-3 sm:p-4 md:p-8">
          <Outlet />
        </main>
      </div>
      <ChatAssistant isOpen={isChatOpen} onClose={toggleChatOpen} />
    </div>
  );
};

export default Layout;
