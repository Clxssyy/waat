import type { inferProcedureOutput } from "@trpc/server";
import type { z } from "zod";
import type { buildDataSchema, characterSchema } from "~/schemas";
import type { AppRouter } from "~/server/api/root";

export type ActiveSlots = "helmet" | "chest" | "boots" | "weapon" | "drifters";
export type EquipmentSlots = Exclude<ActiveSlots, "drifter">;
export type characterRoles = "dps" | "healer" | "tank" | "";
export type ActiveBuildIndex = 0 | 1 | 2;

export type ActiveTab =
  | "description"
  | "drifters"
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
  page?: string;
  sort?: "popular" | "updated";
};
export type CharacterCardInfoRes = inferProcedureOutput<
  AppRouter["character"]["getCharacterCardInfo"]
>;
export type CharacterCardInfo = CharacterCardInfoRes["characters"][number];

export type CommentType = inferProcedureOutput<AppRouter["comment"]["getById"]>;

export type CommentWithReplies = CommentType & {
  replies: CommentWithReplies[];
};

export type SelectOptions = {
  name: string;
  image: string;
  type: string;
  rarity?: string;
  set?: string;
  [key: string]: unknown;
};
