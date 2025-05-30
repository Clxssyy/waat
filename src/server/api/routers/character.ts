import { boolean, z } from "zod";
import { formDataSchema } from "~/schemas";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const characterRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string(), role: z.string() }))
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
      return ctx.db.character.findUnique({
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
      orderBy: {
        createdAt: "desc",
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

  getCharacterCardInfo: publicProcedure
    .input(
      z
        .object({
          role: z.string().optional(),
          drifter: z.string().optional(),
          q: z.string().optional(),
          includePrivate: boolean().optional(),
          id: z.string().optional(),
        })
        .optional(),
    )
    .query(({ ctx, input }) => {
      return ctx.db.character.findMany({
        where: {
          userId: input?.id ?? undefined,
          private: input?.includePrivate ? undefined : false,
          role: input?.role ?? undefined,
          builds: input?.drifter
            ? {
                some: {
                  data: {
                    path: ["drifter"],
                    equals: input.drifter,
                  },
                },
              }
            : undefined,
          ...(input?.q && {
            OR: [
              { name: { contains: input.q, mode: "insensitive" } },
              {
                createdBy: { name: { contains: input.q, mode: "insensitive" } },
              },
            ],
          }),
        },
        select: {
          id: true,
          name: true,
          _count: { select: { builds: true } },
          builds: { select: { data: true } },
          role: true,
          createdAt: true,
          createdBy: true,
          private: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
    }),

  update: protectedProcedure
    .input(formDataSchema)
    .mutation(async ({ ctx, input }) => {
      const character = await ctx.db.character.findUnique({
        where: { id: input.id },
      });
      if (!character) {
        throw new Error("Character not found");
      }
      return ctx.db.character.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name || undefined,
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
    .input(formDataSchema)
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

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const character = await ctx.db.character.findUnique({
        where: { id: input.id },
      });
      if (!character) {
        throw new Error("Character not found");
      }
      return ctx.db.character.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
