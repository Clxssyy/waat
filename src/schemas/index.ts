import { z } from "zod";

export const modSchema = z
  .object({
    name: z.string().default(""),
  })
  .default({});

export const equipmentSchema = z
  .object({
    name: z.string().default(""),
    mastery: z.number().max(50).default(0),
    tier: z.string().default("I"),
    mod: modSchema,
  })
  .default({});

export const statsSchema = z
  .object({
    strength: z.number().default(0),
    agility: z.number().default(0),
    intelligence: z.number().default(0),
  })
  .default({});

export const skillsSchema = z
  .object({
    basic: z.string().default(""),
    common: z.string().default(""),
  })
  .default({});

export const drifterSchema = z
  .object({
    name: z.string().default(""),
    mastery: z.number().max(50).default(0),
    tier: z.string().default("I"),
  })
  .default({});

export const buildDataSchema = z
  .object({
    equipment: z
      .object({
        helmet: equipmentSchema,
        chest: equipmentSchema,
        boots: equipmentSchema,
        weapon: equipmentSchema,
      })
      .default({}),
    stats: statsSchema,
    skills: skillsSchema,
    drifter: drifterSchema,
  })
  .default({});

export const buildSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  characterId: z.string(),
  data: buildDataSchema,
  position: z.number().nullish(),
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
