import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const characterRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({ name: z.string().optional(), role: z.string().optional() }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.character
        .create({
          data: {
            name: input.name,
            role: input.role,
            userId: ctx.session.user.id,
            builds: {},
          },
        })
        .then((character) => {
          return ctx.db.build
            .create({
              data: {
                name: "Default Build",
                characterId: character.id,
                data: {},
              },
            })
            .then((build) => build);
        });
    }),
});
