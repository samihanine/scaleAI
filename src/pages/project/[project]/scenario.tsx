import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { Wrapper } from '@/components/Wrapper';
import { getLocaleProps } from '@/utils/locales';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { LoadingPage } from '@/components/LoadingPage';
import { ScenarioList } from '@/components/scenarios/ScenarioList';

const ScenarioListPage: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const projectId = router.query?.project as string;
  const { data: project } = trpc.projects.getOne.useQuery(projectId);

  if (!project) {
    return <LoadingPage />;
  }

  return (
    <Wrapper projectId={projectId} title={t('navigation.settings')}>
      <ScenarioList projectId={projectId} />
    </Wrapper>
  );
};

export const getServerSideProps = getLocaleProps;

export default ScenarioListPage;
