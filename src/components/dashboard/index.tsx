import { type RouterOutputs } from '@/utils/trpc';
import { Card } from '../Card';
import { useTranslations } from 'next-intl';

type DashboardProps = {
  project: RouterOutputs['projects']['getAll'][0];
};

export const Dashboard = ({ project }: DashboardProps) => {
  const t = useTranslations('dashboard');

  return (
    <section>
      <Card>
        <h2 className="text-2xl font-semibold text-gray-900">{t('title')}</h2>
        <p>{project.name}</p>
      </Card>
    </section>
  );
};
