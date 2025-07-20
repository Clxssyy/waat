import { z } from "zod";
import { buildDataSchema, formDataSchema } from "~/schemas";
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
            support: Array.from({ length: 5 }, () => ""),
          },
        })
        .then((character) => {
          return ctx.db.build
            .create({
              data: {
                characterId: character.id,
                data: buildDataSchema.parse({}),
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
            data: buildDataSchema.parse({}),
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
          ratings: true,
          _count: {
            select: {
              ratings: true,
              comments: true,
            },
          },
          createdBy: true,
          comments: {
            include: {
              user: true,
              votes: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
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
      z.object({
        role: z.string().optional(),
        drifter: z.string().optional(),
        q: z.string().optional(),
        includePrivate: z.boolean().optional(),
        userId: z.string().optional(),
        page: z.string().default("1"),
        sort: z.enum(["popular", "updated"]).default("popular"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const page = parseInt(input.page, 10);
      const pageSize = 18;
      const skip = (page - 1) * pageSize;
      const where: {
        userId?: string;
        private?: boolean;
        role?: string;
        builds?: {
          some: {
            data: {
              path: string[];
              equals: string | undefined;
            };
          };
        };
        OR?: Array<{
          name?: { contains: string; mode: "insensitive" };
          createdBy?: { name: { contains: string; mode: "insensitive" } };
        }>;
      } = {
        userId: input.userId ?? undefined,
        private: input.includePrivate ? undefined : false,
        role: input.role ?? undefined,
        builds: input.drifter
          ? {
              some: {
                data: {
                  path: ["drifter", "name"],
                  equals: input.drifter || undefined,
                },
              },
            }
          : undefined,
        ...(input.q && {
          OR: [
            { name: { contains: input.q, mode: "insensitive" } },
            {
              createdBy: { name: { contains: input.q, mode: "insensitive" } },
            },
          ],
        }),
      };

      const characters = await ctx.db.character.findMany({
        where,
        select: {
          id: true,
          createdAt: true,
          name: true,
          private: true,
          role: true,
          ratings: {
            select: {
              value: true,
            },
          },
          builds: {
            select: {
              data: true,
            },
          },
          createdBy: {
            select: {
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              ratings: true,
              builds: true,
            },
          },
        },
        orderBy:
          input.sort === "updated"
            ? { updatedAt: "desc" }
            : { ratings: { _count: "desc" } },
        take: pageSize,
        skip,
      });

      const totalCount = await ctx.db.character.count({
        where,
      });
      const totalPages = Math.ceil(totalCount / pageSize);

      return {
        characters,
        totalPages,
        currentPage: page,
        totalCount,
      };
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
          name: input.name || "Default Character",
          role: input.role,
          private: input.private,
          description: input.description,
          builds: {
            create: input.builds
              .filter((b) => b.id.includes("temp"))
              .map((build) => ({
                data: {
                  characterId: input.id,
                  equipment: build.data.equipment,
                  stats: build.data.stats,
                  drifter: build.data.drifter,
                },
              })),
            update: input.builds
              .filter((b) => !b.id.includes("temp"))
              .map((build) => ({
                where: { id: build.id },
                data: {
                  data: {
                    equipment: build.data.equipment,
                    stats: build.data.stats,
                    drifter: build.data.drifter,
                    skills: build.data.skills,
                  },
                },
              })),
          },
          support: input.support,
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
          name: input.name || "Default Character",
          role: input.role ?? undefined,
          private: input.private,
          description: input.description,
          userId: ctx.session.user.id,
          clonedFrom: input.id,
          support: input.support,
          builds: {
            create: input.builds.map((build) => ({
              data: {
                equipment: build.data.equipment,
                stats: build.data.stats,
                drifter: build.data.drifter,
                skills: build.data.skills,
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

  addComment: protectedProcedure
    .input(
      z.object({
        characterId: z.string(),
        parentId: z.string().nullable(),
        content: z.string().min(1).max(360),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.parentId) {
        const parent = await ctx.db.comment.findUnique({
          where: {
            id: input.parentId,
          },
        });

        if (!parent) return;
      }

      return ctx.db.comment.create({
        data: {
          content: input.content,
          characterId: input.characterId,
          userId: ctx.session.user.id,
          parentId: input.parentId ?? null,
        },
      });
    }),

  addRating: protectedProcedure
    .input(
      z.object({
        characterId: z.string(),
        value: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const character = await ctx.db.character.findUnique({
        where: {
          id: input.characterId,
        },
      });

      if (!character) return;

      if (character.id === ctx.session.user.id) return;

      const hasRated = await ctx.db.rating.findUnique({
        where: {
          characterId_userId: {
            userId: ctx.session.user.id,
            characterId: input.characterId,
          },
        },
      });

      if (hasRated) {
        return ctx.db.rating.update({
          where: {
            characterId_userId: {
              userId: ctx.session.user.id,
              characterId: input.characterId,
            },
          },
          data: {
            value: input.value,
          },
        });
      }

      return ctx.db.rating.create({
        data: {
          value: input.value,
          characterId: input.characterId,
          userId: ctx.session.user.id,
        },
      });
    }),

  getCharacterCount: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.character.count({
      where: {
        private: false,
      },
    });
  }),

  getUserCount: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.user.count();
  }),

  getFeaturedBuildCards: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.character.findMany({
      where: {
        createdBy: {
          name: "Classy",
        },
        private: false,
      },
      select: {
        id: true,
        createdAt: true,
        name: true,
        private: true,
        role: true,
        ratings: {
          select: {
            value: true,
          },
        },
        builds: {
          select: {
            data: true,
          },
        },
        createdBy: {
          select: {
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            ratings: true,
            builds: true,
          },
        },
      },
      take: 4,
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),
});
