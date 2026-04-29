import { useState } from 'react';
import { useAppStore } from '../store';
import { LogIn, LogOut, UserCheck } from 'lucide-react';

const SettingsPage = () => {
  const { 
    theme, setTheme, 
    language, setLanguage, 
    resetProgress, 
    user, login, register, logout 
  } = useAppStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email || !password) {
      setAuthError('Please fill in all fields.');
      return;
    }
    setAuthLoading(true);
    try {
      if (isRegistering) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      setEmail('');
      setPassword('');
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed.');
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
      
      <div className="card divide-y divide-gray-200 dark:divide-gray-700">
        {/* Firebase Authentication Section */}
        <div className="p-4 sm:p-6 flex flex-col justify-between gap-4">
          <div>
            <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary-500" />
              Google Firebase Cloud Sync
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">Sync your quiz scores, progress, and bookmarks securely</p>
          </div>

          {user ? (
            <div className="bg-green-50 dark:bg-green-950/10 border border-green-200 dark:border-green-800/30 p-4 rounded-xl flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-green-600 dark:text-green-400 font-bold block mb-1">Signed In</span>
                <span className="text-sm font-medium">{user.email}</span>
              </div>
              <button 
                onClick={logout}
                className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuthSubmit} className="space-y-3 max-w-md pt-2">
              <input 
                type="email" 
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full text-sm"
              />
              <input 
                type="password" 
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full text-sm"
              />
              {authError && <p className="text-red-500 text-xs font-medium">{authError}</p>}
              <div className="flex items-center gap-3 pt-1">
                <button 
                  type="submit" 
                  disabled={authLoading}
                  className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1 disabled:opacity-50"
                >
                  <LogIn className="w-3.5 h-3.5" /> 
                  {authLoading ? 'Please wait...' : isRegistering ? 'Create Account' : 'Sign In'}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsRegistering(!isRegistering)}
                  className="text-xs font-medium text-gray-500 hover:text-primary-500 transition-colors"
                >
                  {isRegistering ? 'Already have an account? Sign In' : 'Need an account? Register'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base sm:text-lg">Theme</h3>
            <p className="text-gray-500 text-xs sm:text-sm">Select your preferred visual theme</p>
          </div>
          <select 
            value={theme}
            onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
            className="input-field max-w-full sm:max-w-[150px]"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base sm:text-lg">Language</h3>
            <p className="text-gray-500 text-xs sm:text-sm">Choose your preferred language</p>
          </div>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input-field max-w-full sm:max-w-[150px]"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="bn">বাংলা</option>
          </select>
        </div>


        <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-red-500">Reset Data</h3>
            <p className="text-gray-500 text-xs sm:text-sm">Clear all your progress and saved items</p>
          </div>
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
                resetProgress();
              }
            }}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium transition-colors self-start sm:self-auto"
          >
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
