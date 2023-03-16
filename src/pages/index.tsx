import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { Wrapper } from '@/components/Wrapper';
import { getLocaleProps } from '@/utils/locales';
import { trpc } from '@/utils/trpc';
import { ProjectList } from '@/components';

const DashboardProject: NextPage = () => {
  const t = useTranslations();
  const { data: projects } = trpc.projects.getAll.useQuery();

  return (
    <Wrapper title={t('navigation.dashboard')}>
      <ProjectList projects={projects || []} />
    </Wrapper>
  );
};

export const getServerSideProps = getLocaleProps;

export default DashboardProject;
