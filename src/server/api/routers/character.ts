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
            name: input.name || "Unnamed Character",
            role: input.role || "Unknown Role",
            userId: ctx.session.user.id,
            builds: {},
          },
        })
        .then((character) => {
          return ctx.db.build
            .create({
              data: {
                characterId: character.id,
                data: {
                  equipment: {
                    helmet: "",
                    chest: "",
                    boots: "",
                    weapon: "",
                  },
                  stats: {
                    strength: 0,
                    agility: 0,
                    intelligence: 0,
                  },
                  drifter: "",
                },
              },
            })
            .then((build) => build);
        });
    }),

  addBuild: protectedProcedure
    .input(
      z.object({
        characterId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.build
        .create({
          data: {
            characterId: input.characterId,
            data: {
              equipment: {
                helmet: "",
                chest: "",
                boots: "",
                weapon: "",
              },
              stats: {
                strength: 0,
                agility: 0,
                intelligence: 0,
              },
              drifter: "",
            },
          },
        })
        .then((build) => build);
    }),

  getByBuildId: publicProcedure
    .input(
      z.object({
        buildId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.character.findFirst({
        where: {
          builds: {
            some: {
              id: input.buildId,
            },
          },
        },
        include: {
          builds: true,
        },
      });
    }),

  getById: publicProcedure
    .input(
      z.object({
        characterId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.character.findFirst({
        where: {
          id: input.characterId,
        },
        include: {
          builds: true,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.character.findMany({
      where: {
        private: false,
      },
      include: {
        builds: true,
        createdBy: true,
      },
    });
  }),

  getAllByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.character.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          builds: true,
          createdBy: true,
        },
      });
    }),
});
