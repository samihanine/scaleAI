import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '../Button';
import { Card } from '../Card';
import { TextInput } from '../inputs';
import { Modal } from '../Modal';
import { Link } from '../Link';
import { LoadingSpinner } from '../LoadingSpinner';

type ScenarioListProps = {
  projectId: string;
};

export const ScenarioList: React.FC<ScenarioListProps> = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const createMutation = trpc.projects.create.useMutation();
  const router = useRouter();
  const t = useTranslations('scenarios');
  const { data: scenarios, isLoading } = trpc.scenarios.getAll.useQuery({
    projectId,
  });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const newItem = await createMutation.mutateAsync({
      name: name || '',
    });
    router.push(`/project/${projectId}/scenario/${newItem.id}`);
  };

  return (
    <section className="flex flex-col gap-5" aria-labelledby="project-heading">
      <Button onClick={() => setIsOpen(true)}>{t('create')}</Button>
      <h2 id="project-heading" className="sr-only">
        {t('title')}
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {!isLoading &&
          scenarios?.map((scenario) => (
            <Link key={scenario.id} href={`/project/${projectId}/scenario/${scenario.id}`}>
              <Card>{scenario.name}</Card>
            </Link>
          ))}
        {isLoading && <LoadingSpinner />}
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-semibold text-gray-900">{t('create')}</h2>
            <form onSubmit={submit} className="flex flex-col gap-5">
              <TextInput name="name" label={t('name')} />
              <div className="flex w-full justify-center">
                <Button loading={createMutation.isLoading} type="submit">
                  {t('add')}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </section>
  );
};
