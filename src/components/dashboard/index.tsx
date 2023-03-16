import { type RouterOutputs } from '@/utils/trpc';

type DashboardProps = {
  project: RouterOutputs['projects']['getAll'][0];
};

export const Dashboard = ({ project }: DashboardProps) => (
  <section>
    <p>{project.name}</p>
  </section>
);
