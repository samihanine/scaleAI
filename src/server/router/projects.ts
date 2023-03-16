import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, router } from '@/server/trpc';

const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
});
export const projectsRouter = router({
  getOne: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const project = await ctx.prisma.projects.findFirst({
      where: {
        id: input,
        userId: ctx.user.id,
      },
    });

    if (!project || project.userId !== ctx.user.id) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Project not found' });
    }

    return project;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.prisma.projects.findMany({
      where: {
        userId: ctx.user.id,
      },
    });

    return projects;
  }),
  create: protectedProcedure.input(projectSchema).mutation(async ({ ctx, input }) => {
    const project = await ctx.prisma.projects.create({
      data: {
        name: input.name,
        userId: ctx.user.id,
      },
    });
    return project;
  }),
  update: protectedProcedure.input(projectSchema).mutation(async ({ ctx, input }) => {
    const project = await ctx.prisma.projects.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        description: input.description,
      },
    });

    return project;
  }),
  destroy: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const project = await ctx.prisma.projects.delete({
      where: {
        id: input,
      },
    });

    return project;
  }),
});
