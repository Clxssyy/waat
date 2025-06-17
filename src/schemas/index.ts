import { z } from "zod";

export const buildDataSchema = z.object({
  equipment: z.object({
    helmet: z.string(),
    chest: z.string(),
    boots: z.string(),
    weapon: z.string(),
  }),
  stats: z.object({
    strength: z.number(),
    agility: z.number(),
    intelligence: z.number(),
  }),
  skills: z
    .object({
      basic: z.string().optional(),
      common: z.string().optional(),
    })
    .optional(),
  drifter: z.string(),
});

export const buildSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  characterId: z.string(),
  data: buildDataSchema,
});

export const characterSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string().nullish(),
  description: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  private: z.boolean(),
  clonedFrom: z.string().nullish(),
  builds: z.array(buildSchema).max(3),
  createdBy: z.object({
    name: z.string().nullish(),
    id: z.string(),
    email: z.string().nullish(),
    emailVerified: z.date().nullish(),
    image: z.string().nullish(),
  }),
});

export const formDataSchema = characterSchema
  .omit({ createdAt: true, updatedAt: true, userId: true })
  .extend({
    builds: z
      .array(
        buildSchema.omit({
          createdAt: true,
          updatedAt: true,
        }),
      )
      .max(3),
  });
