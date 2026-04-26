import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Megaphone, 
  CheckCircle2, 
  FileText, 
  Users, 
  Inbox, 
  BarChart2,
  Calendar,
  ChevronRight,
  X,
  Info
} from 'lucide-react';

const TimelinePage = () => {
  const { t } = useTranslation();
  const [selectedStage, setSelectedStage] = useState<any>(null);

  const stages = [
    {
      id: '1',
      title: 'Election Announcement',
      date: 'Day 0',
      description: 'The Election Commission officially announces the election schedule and the Model Code of Conduct comes into force.',
      details: 'The announcement marks the official start of the electoral process. The Model Code of Conduct (MCC) is a set of guidelines that political parties and candidates must follow to ensure free and fair elections. It prohibits the government from announcing new projects or making appointments that could influence voters.',
      icon: Megaphone,
      color: 'bg-primary-500',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Voter Registration',
      date: 'Ongoing',
      description: 'Citizens ensure their names are in the electoral roll. New voters can apply for registration.',
      details: 'Registration is mandatory to exercise the right to vote. In India, voters can register through Form 6. The Election Commission conducts special drives to ensure no voter is left behind, particularly focusing on first-time voters and marginalized communities.',
      icon: CheckCircle2,
      color: 'bg-green-500',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Nomination Filing',
      date: 'Day 7-14',
      description: 'Candidates file their nomination papers and affidavits. Scrutiny and withdrawal of nominations follow.',
      details: 'Candidates must provide detailed affidavits covering their educational background, criminal records (if any), and financial assets. Returning Officers scrutinize these papers to ensure candidates meet the eligibility criteria defined by law.',
      icon: FileText,
      color: 'bg-orange-500',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Election Campaign',
      date: 'Day 15-30',
      description: 'Political parties and candidates hold rallies, meetings, and door-to-door campaigning.',
      details: 'Campaigning must stop 48 hours before the conclusion of polling (the "Silence Period"). Parties release manifestos detailing their promises. Modern campaigns increasingly use social media alongside traditional rallies.',
      icon: Users,
      color: 'bg-blue-500',
      status: 'active'
    },
    {
      id: '5',
      title: 'Polling Day',
      date: 'Day 35',
      description: 'Voters cast their ballots at polling stations. The most crucial phase of the election.',
      details: 'On polling day, voters go to designated booths with their Voter ID or approved identification. Voting is conducted via Electronic Voting Machines (EVMs) with VVPAT (Voter Verifiable Paper Audit Trail) for transparency.',
      icon: Inbox,
      color: 'bg-purple-500',
      status: 'upcoming'
    },
    {
      id: '6',
      title: 'Counting & Results',
      date: 'Day 40',
      description: 'Votes are counted and results are declared. The winner is officially announced.',
      details: 'Counting takes place in a highly secure environment in the presence of candidates and observers. Once the counting is complete, the results are formally declared, and the Election Commission notifies the list of elected members.',
      icon: BarChart2,
      color: 'bg-pink-500',
      status: 'upcoming'
    }
  ];

  return (
    <div className="max-w-[1000px] mx-auto space-y-6 sm:space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
            {t('Election Process Timeline')}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
            {t('Follow the journey of an election from announcement to results.')}
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 dark:bg-gray-800 -translate-x-1/2 hidden md:block"></div>
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 dark:bg-gray-800 -translate-x-1/2 md:hidden"></div>

        <div className="space-y-12">
          {stages.map((stage, idx) => (
            <motion.div 
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center gap-4 sm:gap-8 pl-16 sm:pl-20 md:pl-0 ${
                idx % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full md:w-[45%]">
                <div className="bg-white dark:bg-[#1a2133] p-4 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      stage.status === 'completed' ? 'bg-green-100 text-green-600' :
                      stage.status === 'active' ? 'bg-blue-100 text-blue-600 animate-pulse' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {t(stage.status)}
                    </span>
                    <span className="text-sm font-bold text-gray-400">{stage.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{t(stage.title)}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {t(stage.description)}
                  </p>
                  <button 
                    onClick={() => setSelectedStage(stage)}
                    className="mt-4 text-sm font-bold text-primary-500 flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    {t('Learn More')} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className={`absolute left-8 md:left-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-4 border-white dark:border-[#0f172a] shadow-lg flex items-center justify-center -translate-x-1/2 z-10 ${stage.color}`}>
                <stage.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>

              <div className="hidden md:block md:w-[45%]"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStage(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#1a2133] rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${selectedStage.color}`}>
                    <selectedStage.icon className="w-8 h-8" />
                  </div>
                  <button onClick={() => setSelectedStage(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-1">{t('Election Phase')}</h4>
                    <h3 className="text-2xl font-bold">{t(selectedStage.title)}</h3>
                  </div>
                  
                  <div className="flex items-center gap-6 py-4 border-y border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">{selectedStage.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium capitalize">{t(selectedStage.status)}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed py-2">
                    {t(selectedStage.details)}
                  </p>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => setSelectedStage(null)}
                    className="w-full py-4 bg-gray-900 dark:bg-white dark:text-gray-900 text-white rounded-xl font-bold transition-all hover:opacity-90"
                  >
                    {t('Close Details')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelinePage;
