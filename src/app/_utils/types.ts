import type { User } from "@prisma/client";
import { z } from "zod";

export type ActiveSlots = "helmet" | "chest" | "boots" | "weapon" | "drifter";
export type ActiveBuildIndex = 0 | 1 | 2;

export type ActiveTab =
  | "description"
  | "drifter"
  | "equipment"
  | "comments"
  | "support";
export type ActiveFilter =
  | "all"
  | "strength"
  | "agility"
  | "intelligence"
  | "logistics";

export type BuildData = {
  equipment: {
    helmet: string;
    chest: string;
    boots: string;
    weapon: string;
  };
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
  };
  drifter: string;
};

export type Build = {
  id: string;
  characterId: string;
  createdAt: Date;
  updatedAt: Date;
  data: BuildData;
};

export type editFields = {
  builds: Build[];
  id: string;
  name: string;
  role: string | undefined;
  private: boolean;
  description: string;
  clonedFrom: string | undefined;
};

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
  data: buildDataSchema,
});

export const characterSchema = z.object({
  builds: z.array(buildSchema).max(3),
  createdBy: z.object({
    name: z.string().nullish(),
    id: z.string(),
    email: z.string().nullish(),
    emailVerified: z.date().nullish(),
    image: z.string().nullish(),
  }),
  id: z.string(),
  name: z.string().min(1),
  role: z.string().optional(),
  private: z.boolean(),
  description: z.string(),
  clonedFrom: z.string().nullish(),
});
