import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { Wrapper } from '@/components/Wrapper';
import { getLocaleProps } from '@/utils/locales';
import { useRouter } from 'next/router';
import { LoadingPage } from '@/components/LoadingPage';
import { ScenarioPage } from '@/components/scenarios/ScenarioPage';

const Scenario: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const scenarioId = router.query?.scenario as string;
  const projectId = router.query?.project as string;

  if (!scenarioId || !projectId) {
    return <LoadingPage />;
  }

  return (
    <Wrapper projectId={projectId} title={t('navigation.scenario')}>
      <ScenarioPage scenarioId={scenarioId} />
    </Wrapper>
  );
};

export const getServerSideProps = getLocaleProps;

export default Scenario;
