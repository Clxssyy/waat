import { z } from "zod";

export const modSchema = z
  .object({
    name: z.string().default(""),
  })
  .optional();

export const buildDataSchema = z.object({
  equipment: z.object({
    helmet: z.object({
      name: z.string().default(""),
      mastery: z.number().max(50).default(0),
      tier: z.string().default(""),
      mod: modSchema,
    }),
    chest: z.object({
      name: z.string().default(""),
      mastery: z.number().max(50).default(0),
      tier: z.string().default(""),
      mod: modSchema,
    }),
    boots: z.object({
      name: z.string().default(""),
      mastery: z.number().max(50).default(0),
      tier: z.string().default(""),
      mod: modSchema,
    }),
    weapon: z.object({
      name: z.string().default(""),
      mastery: z.number().max(50).default(0),
      tier: z.string().default(""),
      mod: modSchema,
    }),
  }),
  stats: z.object({
    strength: z.number().default(0),
    agility: z.number().default(0),
    intelligence: z.number().default(0),
  }),
  skills: z
    .object({
      basic: z.string().optional(),
      common: z.string().optional(),
    })
    .optional(),
  drifter: z.object({
    name: z.string().default(""),
    mastery: z.number().max(50).default(0),
    tier: z.string().default(""),
  }),
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
  support: z.array(z.string()).max(5),
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
