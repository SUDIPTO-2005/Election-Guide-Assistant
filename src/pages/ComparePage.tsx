import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { countries } from '../data/countries';

const ComparePage = () => {
  const { t } = useTranslation();
  const [selectedCountryIds, setSelectedCountryIds] = useState<string[]>(['in', 'us']);

  const selectedCountries = countries.filter(c => selectedCountryIds.includes(c.id));

  const handleToggleCountry = (id: string) => {
    if (selectedCountryIds.includes(id)) {
      if (selectedCountryIds.length > 1) {
        setSelectedCountryIds(prev => prev.filter(cId => cId !== id));
      }
    } else {
      if (selectedCountryIds.length < 4) {
        setSelectedCountryIds(prev => [...prev, id]);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">{t('Compare Countries')}</h1>
          <p className="text-gray-500">{t('Compare electoral systems around the world.')}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {countries.map(country => (
            <button
              key={country.id}
              onClick={() => handleToggleCountry(country.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCountryIds.includes(country.id)
                  ? 'bg-primary-600 text-white'
                  : 'bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {country.name}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a2133] font-medium text-gray-500">{t('Feature')}</th>
              {selectedCountries.map(country => (
                <th key={country.id} className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a2133] font-bold text-lg min-w-[200px]">
                  {t(country.name)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#0f172a] divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="p-4 font-medium text-gray-500">{t('Voting Age')}</td>
              {selectedCountries.map(c => <td key={c.id} className="p-4">{c.votingAge}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-medium text-gray-500">{t('Election Type')}</td>
              {selectedCountries.map(c => <td key={c.id} className="p-4">{t(c.electionType)}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-medium text-gray-500">{t('Electoral System')}</td>
              {selectedCountries.map(c => <td key={c.id} className="p-4">{t(c.electoralSystem)}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-medium text-gray-500">{t('Voting Method')}</td>
              {selectedCountries.map(c => <td key={c.id} className="p-4">{t(c.votingMethod)}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-medium text-gray-500">{t('Compulsory Voting')}</td>
              {selectedCountries.map(c => <td key={c.id} className="p-4">{c.compulsoryVoting ? `✅ ${t('Yes')}` : `❌ ${t('No')}`}</td>)}
            </tr>
            <tr>
              <td className="p-4 font-medium text-gray-500">{t('Mail-in Voting')}</td>
              {selectedCountries.map(c => <td key={c.id} className="p-4">{c.mailInVoting ? `✅ ${t('Yes')}` : `❌ ${t('No')}`}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePage;
