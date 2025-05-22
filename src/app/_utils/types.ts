import { z } from "zod";

export type ActiveSlots = "helmet" | "chest" | "boots" | "weapon" | "drifter";
export type BuildNumber = 0 | 1 | 2;

export type ActiveTab = "description" | "drifter" | "equipment" | "comments";
export type ActiveEquipmentFilter =
  | "all"
  | "strength"
  | "agility"
  | "intelligence";
export type ActiveDrifterFilter =
  | "all"
  | "strength"
  | "agility"
  | "intelligence"
  | "logistics";

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
  drifter: z.string(),
});

export const buildSchema = z.object({
  id: z.string(),
  characterId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  data: buildDataSchema,
});

export const characterSchema = z.object({
  builds: z.array(buildSchema),
  createdBy: z.object({
    name: z.string().nullable(),
    id: z.string(),
    email: z.string().nullable(),
    emailVerified: z.date().nullable(),
    image: z.string().nullable(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
  id: z.string(),
  name: z.string(),
  role: z.string().nullable(),
  private: z.boolean(),
  description: z.string(),
});
