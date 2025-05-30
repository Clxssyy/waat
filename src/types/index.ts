import type { inferProcedureOutput } from "@trpc/server";
import type { z } from "zod";
import type { buildDataSchema, characterSchema } from "~/schemas";
import type { AppRouter } from "~/server/api/root";

export type ActiveSlots = "helmet" | "chest" | "boots" | "weapon" | "drifter";
export type characterRoles = "dps" | "healer" | "tank" | "";
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

export type Character = z.infer<typeof characterSchema>;
export type BuildData = z.infer<typeof buildDataSchema>;
export type SearchParams = {
  q?: string;
  role?: characterRoles;
  drifter?: string;
};
export type CharacterCardInfo = inferProcedureOutput<
  AppRouter["character"]["getCharacterCardInfo"]
>[number];
