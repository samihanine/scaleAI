import { useTranslations } from 'next-intl';

type ProjectListProps = {
  leads?: [];
};

export const LeadList: React.FC<ProjectListProps> = ({ leads }) => {
  const t = useTranslations('leads');

  console.log(leads);

  return (
    <section className="flex flex-col gap-5" aria-labelledby="project-heading">
      {t('subtitle')}
    </section>
  );
};
