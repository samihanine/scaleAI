import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { Wrapper } from '@/components/Wrapper';
import { getLocaleProps } from '@/utils/locales';
import { trpc } from '@/utils/trpc';
import { Dashboard } from '@/components';
import { useRouter } from 'next/router';
import { LoadingPage } from '@/components/LoadingPage';

const DashboardPage: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const projectId = router.query?.project as string;
  const { data: project } = trpc.projects.getOne.useQuery(projectId);

  if (!project) {
    return <LoadingPage />;
  }

  return (
    <Wrapper projectId={projectId} title={t('navigation.dashboard')}>
      <Dashboard project={project} />
    </Wrapper>
  );
};

export const getServerSideProps = getLocaleProps;

export default DashboardPage;
