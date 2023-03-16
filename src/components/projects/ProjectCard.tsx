import { type RouterOutputs } from '@/utils/trpc';
import Link from 'next/link';

type ProjectCardProps = {
  project: RouterOutputs['projects']['getAll'][0];
};

export const ProjectCard = ({ project }: ProjectCardProps) => (
  <Link href={`/project/${project.id}/dashboard`} key={project.id} className="col-span-1 flex rounded-md shadow">
    <div className="flex flex-1 items-center justify-between truncate rounded-tl-md rounded-bl-md border border-t border-gray-200 bg-white">
      <div className="flex-1 truncate px-4 py-2 text-sm">
        {project.name}
        <p className="text-gray-500">{project.description}</p>
      </div>
    </div>
  </Link>
);
