import data from "public/data.json";

export function useItemData<
  T extends keyof typeof data,
  K extends keyof (typeof data)[T],
>(type: T, key?: K) {
  return key && key in data[type] ? data[type][key] : undefined;
}
