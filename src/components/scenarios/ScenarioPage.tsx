import { trpc } from '@/utils/trpc';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Card } from '../Card';
import { Select } from '../inputs';

type ScenarioPageProps = {
  scenarioId: string;
};

export const ScenarioPage: React.FC<ScenarioPageProps> = ({ scenarioId }) => {
  const t = useTranslations('scenarios');
  const { data: scenario, isLoading } = trpc.scenarios.getOne.useQuery(scenarioId);
  const [source, setSource] = useState('csv');

  console.log(scenario, isLoading);

  return (
    <section className="mx-auto w-full" aria-labelledby="project-heading">
      <h2 id="project-heading" className="sr-only">
        {t('title')}
      </h2>
      <Card className="mx-auto w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-900">{t('choiceSource')}</h2>
        <Select
          name="source"
          label={t('source')}
          className="min-w-8"
          options={[
            {
              label: 'Csv',
              value: 'CSV',
            },
            {
              label: 'Api',
              value: 'API',
            },
            {
              label: 'Boddac',
              value: 'BODDAC',
            },
          ]}
          value={source}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSource(e.currentTarget.value)}
        />
      </Card>
    </section>
  );
};
