import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, router } from '@/server/trpc';

const scenarioSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  projectId: z.string(),
});

export const scenariosRouter = router({
  getOne: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const scenario = await ctx.prisma.scenarios.findFirst({
      where: {
        id: input,
      },
    });

    if (!scenario) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'scenario not found' });
    }

    return scenario;
  }),
  getAll: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const scenarios = await ctx.prisma.scenarios.findMany({
        where: {
          projectId: input.projectId,
        },
      });

      return scenarios;
    }),
  create: protectedProcedure.input(scenarioSchema).mutation(async ({ ctx, input }) => {
    const scenario = await ctx.prisma.scenarios.create({
      data: {
        name: input.name,
        projectId: input.projectId,
      },
    });
    return scenario;
  }),
  update: protectedProcedure.input(scenarioSchema).mutation(async ({ ctx, input }) => {
    const scenario = await ctx.prisma.scenarios.update({
      where: {
        id: input.id,
      },
      data: input,
    });

    return scenario;
  }),
  destroy: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const scenario = await ctx.prisma.scenarios.delete({
      where: {
        id: input,
      },
    });

    return scenario;
  }),
});
