import { type Scenarios } from '@prisma/client';
import { Card } from '../Card';
import { Link } from '../Link';

type ScenariosProps = {
  scenario: Scenarios;
};

export const ScenarioCard = ({ scenario, ...props }: ScenariosProps) => {
  const link = `/project/${scenario.projectId}/scenario/${scenario.id}`;

  return (
    <Link href={link}>
      <Card className="flex flex-col gap-5" {...props}>
        <h3 className="text-lg font-semibold text-gray-900">{scenario.name}</h3>
      </Card>
    </Link>
  );
};
