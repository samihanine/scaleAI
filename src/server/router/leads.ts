import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { protectedProcedure, router } from '@/server/trpc';

const leadSchema = z.object({
  id: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string(),
  phone: z.string().optional(),
  scenarioId: z.string(),
  description: z.string().optional(),
  activity: z.string().optional(),
  organization: z.string().optional(),
});

export const leadsRouter = router({
  getOne: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const lead = await ctx.prisma.leads.findFirst({
      where: {
        id: input,
      },
    });

    if (!lead) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'lead not found' });
    }

    return lead;
  }),
  getAllByProjectId: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const leads = await ctx.prisma.leads.findMany({
      where: {
        scenario: {
          projectId: input,
        },
      },
    });

    return leads;
  }),
  create: protectedProcedure.input(leadSchema).mutation(async ({ ctx, input }) => {
    const lead = await ctx.prisma.leads.create({
      data: input,
    });
    return lead;
  }),
  update: protectedProcedure.input(leadSchema).mutation(async ({ ctx, input }) => {
    const lead = await ctx.prisma.leads.update({
      where: {
        id: input.id,
      },
      data: input,
    });

    return lead;
  }),
  destroy: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const lead = await ctx.prisma.leads.delete({
      where: {
        id: input,
      },
    });

    return lead;
  }),
});
