import { trpc, type RouterOutputs } from '@/utils/trpc';
import { useTranslations } from 'next-intl';
import { createColumnHelper } from '@tanstack/react-table';
import { Table } from '../Table';
import { Card } from '../Card';

type Lead = RouterOutputs['leads']['getAll'][0];

type ProjectListProps = {
  projectId: string;
};

export const LeadList: React.FC<ProjectListProps> = ({ projectId }) => {
  const t = useTranslations('leads');
  const { data: leads, isLoading } = trpc.leads.getAll.useQuery({
    projectId,
  });

  const columnHelper = createColumnHelper<Lead>();

  const columns = [
    columnHelper.accessor('firstname', {
      header: () => <span>First Name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.lastname, {
      id: 'lastName',
      header: () => <span>Last Name</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('email', {
      header: () => <span>Email</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('organization', {
      header: () => <span>Organization</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor('phone', {
      header: () => <span>Phone</span>,
      footer: (info) => info.column.id,
    }),
  ];

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-5" aria-labelledby="project-heading">
      <Card className="w-full max-w-full">
        {!(!isLoading && !leads?.length) && <Table isLoading={isLoading} data={leads || []} columns={columns || []} />}
        {!isLoading && !leads?.length && <p>{t('noLeadsFound')}</p>}
      </Card>
    </section>
  );
};
