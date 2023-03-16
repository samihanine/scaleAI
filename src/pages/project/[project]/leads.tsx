import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { Wrapper } from '@/components/Wrapper';
import { getLocaleProps } from '@/utils/locales';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { LeadList } from '@/components/leads';
import { LoadingPage } from '@/components/LoadingPage';

const SettingsPage: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const projectId = router.query?.project as string;
  const { data: project } = trpc.projects.getOne.useQuery(projectId);

  if (!project) {
    return <LoadingPage />;
  }

  return (
    <Wrapper projectId={projectId} title={t('navigation.settings')}>
      <LeadList leads={[]} />
    </Wrapper>
  );
};

export const getServerSideProps = getLocaleProps;

export default SettingsPage;
