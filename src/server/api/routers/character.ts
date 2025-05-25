import { z } from "zod";
import { characterSchema } from "~/app/_utils/types";
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
            name: input.name || "Default Character",
            role: input.role,
            userId: ctx.session.user.id,
            builds: {},
            private: false,
            description: "No description.",
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
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const character = await ctx.db.character.findUnique({
        where: {
          id: input.id,
        },
        include: {
          builds: {
            orderBy: {
              createdAt: "asc",
            },
          },
          createdBy: true,
        },
      });

      return characterSchema.parse(character);
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

  update: protectedProcedure
    .input(characterSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.character.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          role: input.role,
          private: input.private,
          description: input.description,
          builds: {
            create: input.builds
              .filter((b) => b.id === "")
              .map((build) => ({
                data: {
                  characterId: input.id,
                  equipment: build.data.equipment,
                  stats: build.data.stats,
                  drifter: build.data.drifter,
                },
              })),
            update: input.builds
              .filter((b) => b.id !== "")
              .map((build) => ({
                where: { id: build.id },
                data: {
                  data: {
                    equipment: build.data.equipment,
                    stats: build.data.stats,
                    drifter: build.data.drifter,
                  },
                },
              })),
          },
        },
        include: {
          builds: true,
          createdBy: true,
        },
      });
    }),

  clone: protectedProcedure
    .input(characterSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.character.create({
        data: {
          name: input.name,
          role: input.role ?? undefined,
          private: input.private,
          description: input.description,
          userId: ctx.session.user.id,
          clonedFrom: input.id,
          builds: {
            create: input.builds.map((build) => ({
              data: {
                equipment: build.data.equipment,
                stats: build.data.stats,
                drifter: build.data.drifter,
              },
            })),
          },
        },
      });
    }),
});
