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

export function getTierValue(tier: string) {
  return TIER_LEVELS.findIndex((value) => value === tier) + 1;
}

export const MASTERY_OPTIONS = [
  "1",
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

export const rarityOrder = {
  legendary: 0,
  epic: 1,
  rare: 2,
  common: 3,
};
