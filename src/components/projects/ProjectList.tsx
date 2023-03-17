import { type RouterOutputs, trpc } from '@/utils/trpc';
import { Button } from '../Button';
import { useState } from 'react';
import { Modal } from '../Modal';
import { TextInput } from '../inputs';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Card } from '../Card';
import { FolderIcon } from '@heroicons/react/outline';
import { Link } from '../Link';
import { LoadingSpinner } from '../LoadingSpinner';

type ProjectListProps = {
  projects: RouterOutputs['projects']['getAll'];
};

export const ProjectList: React.FC<ProjectListProps> = () => {
  const { data: projects, isLoading } = trpc.projects.getAll.useQuery();
  const [isOpen, setIsOpen] = useState(false);
  const createMutation = trpc.projects.create.useMutation();
  const router = useRouter();
  const t = useTranslations('projects');

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const newProject = await createMutation.mutateAsync({
      name: name || '',
    });
    router.push(`/project/${newProject.id}/dashboard`);
  };

  return (
    <section className="flex flex-col gap-7" aria-labelledby="project-heading">
      <Card className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <Button className="self-center" onClick={() => setIsOpen(true)}>
          {t('create')}
        </Button>
      </Card>
      <Card className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <div className="flex flex-wrap gap-5">
          {!isLoading &&
            projects?.map((project) => (
              <Link href={'/project/' + project.id + '/dashboard/'} key={project.id}>
                <div className="flex h-40 w-fit min-w-[140px] flex-col items-center justify-center gap-4 rounded-lg border p-5 text-gray-800 hover:bg-gray-50 hover:text-gray-600">
                  <p>{project.name}</p>
                  <FolderIcon className="h-12 w-12 text-primary" aria-hidden="true" />
                </div>
              </Link>
            ))}
          {isLoading && <LoadingSpinner />}
        </div>
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
