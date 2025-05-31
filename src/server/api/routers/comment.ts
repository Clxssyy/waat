import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.comment.findUnique({
        where: { id: input.id },
        include: {
          user: true,
          votes: true,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.comment.findUnique({
        where: { id: input.id },
      });

      if (!comment) return;

      return ctx.db.comment.delete({
        where: {
          id: input.id,
        },
      });
    }),

  createVote: protectedProcedure
    .input(
      z.object({
        commentId: z.string(),
        value: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.db.comment.findUnique({
        where: { id: input.commentId },
      });

      if (!comment) return;

      const hasVoted = await ctx.db.vote.findUnique({
        where: {
          commentId_userId: {
            commentId: input.commentId,
            userId: ctx.session.user.id,
          },
        },
      });

      if (hasVoted) return;

      return ctx.db.vote.create({
        data: {
          commentId: input.commentId,
          value: input.value,
          userId: ctx.session.user.id,
        },
      });
    }),

  updateVote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        value: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const vote = await ctx.db.vote.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!vote) return;

      return ctx.db.vote.update({
        where: {
          id: input.id,
        },
        data: {
          value: input.value,
        },
      });
    }),

  deleteVote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const vote = await ctx.db.vote.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!vote) return;

      return ctx.db.vote.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
