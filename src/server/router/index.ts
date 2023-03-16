import { router } from '@/server/trpc';
import { projectsRouter } from '@/server/router/projects';
import { settingsRouter } from '@/server/router/settings';
import { scenariosRouter } from '@/server/router/scenarios';
import { leadsRouter } from '@/server/router/leads';

export const appRouter = router({
  projects: projectsRouter,
  settings: settingsRouter,
  scenarios: scenariosRouter,
  leads: leadsRouter,
});

export type AppRouter = typeof appRouter;
