import data from "public/data.json";

export function useItemData<
  T extends keyof typeof data,
  K extends keyof (typeof data)[T],
>(type: T, key?: K) {
  return key && key in data[type] ? data[type][key] : undefined;
}

export const TIER_LEVELS = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
];

export const MASTERY_OPTIONS = [
  "0",
  "10",
  "20",
  "30",
  "40",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
];
