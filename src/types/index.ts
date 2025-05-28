import { z } from "zod";
import type { characterSchema } from "~/schemas";

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
