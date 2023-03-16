import { trpc } from '@/utils/trpc';
import { Button } from '../Button';
import { Card } from '../Card';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Modal } from '../Modal';

type DestroyProjectProps = {
  projectId: string;
};

export const DestroyProject = ({ projectId }: DestroyProjectProps) => {
  const destroyMutation = trpc.projects.destroy.useMutation();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await destroyMutation.mutateAsync(projectId);
    router.push('/');
  };

  return (
    <section aria-labelledby="settings-destroy">
      <Card>
        <Button onClick={() => setIsOpen(true)} variant="red" className="self-center">
          Supprimer le projet
        </Button>
      </Card>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="flex flex-col gap-10">
            <h2 className="text-center text-2xl font-semibold text-gray-900">Supprimer le projet</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
              <p>Êtes-vous sûr de vouloir supprimer ce projet ?</p>
              <div className="flex w-full justify-center">
                <Button variant="red" loading={destroyMutation.isLoading} type="submit">
                  Supprimer
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </section>
  );
};
