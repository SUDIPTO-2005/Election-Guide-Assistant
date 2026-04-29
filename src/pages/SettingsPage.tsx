import { useAppStore } from '../store';

const SettingsPage = () => {
  const { theme, setTheme, language, setLanguage, resetProgress } = useAppStore();

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
      
      <div className="card divide-y divide-gray-200 dark:divide-gray-700">
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
            <option value="es">Español</option>
            <option value="hi">हिंदी</option>
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
