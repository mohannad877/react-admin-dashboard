import { Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ComingSoon() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="w-24 h-24 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-6">
        <Wrench size={48} className="text-teal-600 dark:text-teal-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
        {t('comingSoon')}
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md">
        {t('comingSoonDesc')}
      </p>
    </div>
  );
}
