import { trpc } from '@/utils/trpc';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from '../Button';
import { LoadingSpinner } from '../LoadingSpinner';
import { Modal } from '../Modal';
import { TextInput } from '../inputs';
import { Card } from '../Card';
import { Link } from '../Link';

type ScenarioListProps = {
  projectId: string;
};

export const ScenarioList: React.FC<ScenarioListProps> = ({ projectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const createMutation = trpc.scenarios.create.useMutation();
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
      projectId,
    });
    router.push(`/project/${projectId}/scenario/${newItem.id}`);
  };

  return (
    <section className="flex flex-col gap-5" aria-labelledby="project-heading">
      <Button onClick={() => setIsOpen(true)}>{t('create')}</Button>
      <h2 id="project-heading" className="sr-only">
        {t('title')}
      </h2>
      <Card className="mx-auto flex w-full max-w-3xl flex-col gap-1">
        {!isLoading &&
          scenarios?.map((scenario) => (
            <Link
              className="border-b p-3 text-gray-800 hover:bg-gray-50 hover:text-gray-600 "
              href={'/project/' + projectId + '/scenario/' + scenario.id}
              key={scenario.id}
            >
              <div>
                <p>{scenario.name}</p>
              </div>
            </Link>
          ))}
        {isLoading && <LoadingSpinner />}
      </Card>
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
