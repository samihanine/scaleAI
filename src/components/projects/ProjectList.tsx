import { type RouterOutputs, trpc } from '@/utils/trpc';
import { Button } from '../Button';
import { useState } from 'react';
import { Modal } from '../Modal';
import { TextInput } from '../inputs';
import { useRouter } from 'next/router';
import { ProjectCard } from './ProjectCard';
import { useTranslations } from 'next-intl';

type ProjectListProps = {
  projects: RouterOutputs['projects']['getAll'];
};

export const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [isOpen, setIsOpen] = useState(false);
  const createMutation = trpc.projects.create.useMutation();
  const router = useRouter();
  const t = useTranslations();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const newProject = await createMutation.mutateAsync({
      name: name || '',
    });
    router.push(`/project/${newProject.id}`);
  };

  return (
    <section className="flex flex-col gap-5" aria-labelledby="project-heading">
      <Button onClick={() => setIsOpen(true)}>{t('projects.create')}</Button>
      <h2 id="project-heading" className="sr-only">
        {t('navigation.projects')}
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="flex flex-col gap-10">
            <h2 className="text-2xl font-semibold text-gray-900">{t('projects.create')}</h2>
            <form onSubmit={submit} className="flex flex-col gap-5">
              <TextInput name="name" label={t('projects.name')} />
              <div className="flex w-full justify-center">
                <Button loading={createMutation.isLoading} type="submit">
                  {t('projects.add')}
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </section>
  );
};
