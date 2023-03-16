import { trpc, type RouterOutputs } from '@/utils/trpc';
import { TextInput } from '../inputs';
import { Button } from '../Button';
import { Card } from '../Card';
import { useState } from 'react';
import { useRouter } from 'next/router';

type UpdateProjectProps = {
  project: RouterOutputs['projects']['getAll'][0];
};

export const UpdateProject = ({ project }: UpdateProjectProps) => {
  const updateMutation = trpc.projects.update.useMutation();
  const [name, setName] = useState(project?.name || '');
  const [description, setDescription] = useState(project?.description || '');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateMutation.mutateAsync({
      id: project.id,
      name: name || '',
      description: description || '',
    });

    router.reload();
  };

  return (
    <section aria-labelledby="settings-heading">
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextInput
            label="Name"
            name="name"
            value={name}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
          />
          <TextInput
            label="Description"
            name="description"
            value={description}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setDescription(e.currentTarget.value)}
          />

          <Button
            className="self-center"
            disabled={!(name !== project.name || description !== project.description) || updateMutation.isLoading}
            type="submit"
          >
            Save
          </Button>
        </form>
      </Card>
    </section>
  );
};
