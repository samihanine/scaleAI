import { router } from '@/server/trpc';
import { projectsRouter } from '@/server/router/projects';
import { settingsRouter } from '@/server/router/settings';

export const appRouter = router({
  projects: projectsRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
