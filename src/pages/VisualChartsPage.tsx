import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { BarChart2, PieChart, TrendingUp, Users, Map } from 'lucide-react';

const VisualChartsPage = () => {
  const { t } = useTranslation();

  const chartData = [
    { label: 'Youth (18-25)', value: 65, color: 'bg-blue-500' },
    { label: 'Adults (26-50)', value: 82, color: 'bg-green-500' },
    { label: 'Seniors (50+)', value: 74, color: 'bg-purple-500' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-primary-500" />
          {t('Visual Charts & Data')}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {t('Understand election statistics and demographics through visual data.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Voter Turnout Chart */}
        <div className="bg-white dark:bg-[#1a2133] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              {t('Voter Turnout by Age Group')}
            </h3>
            <span className="text-xs text-gray-400">Global Average 2024</span>
          </div>
          
          <div className="space-y-6">
            {chartData.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t(item.label)}</span>
                  <span className="font-bold">{item.value}%</span>
                </div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full rounded-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-gray-400 leading-relaxed italic">
            * {t('Data based on representative samples from major democratic elections.')}
          </p>
        </div>

        {/* Demographics Pie Chart Simulation */}
        <div className="bg-white dark:bg-[#1a2133] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
           <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-500" />
              {t('Voter Population Distribution')}
            </h3>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="transparent" strokeWidth="4" className="stroke-blue-500" strokeDasharray="40 100" />
                <circle cx="18" cy="18" r="16" fill="transparent" strokeWidth="4" className="stroke-green-500" strokeDasharray="30 100" strokeDashoffset="-40" />
                <circle cx="18" cy="18" r="16" fill="transparent" strokeWidth="4" className="stroke-purple-500" strokeDasharray="30 100" strokeDashoffset="-70" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                   <PieChart className="w-8 h-8 text-gray-300 mx-auto" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600 dark:text-gray-400">{t('Urban Areas')} (40%)</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600 dark:text-gray-400">{t('Rural Areas')} (30%)</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-gray-600 dark:text-gray-400">{t('Suburban')} (30%)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default VisualChartsPage;
