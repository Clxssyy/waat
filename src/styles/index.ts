import clsx from "clsx";

export function getBackgroundColor(value?: string) {
  return clsx(
    value === "legendary" && "bg-yellow-600",
    value === "epic" && "bg-purple-500",
    value === "rare" && "bg-blue-500",
    value === "common" && "bg-green-500",
    value === "strength" && "bg-red-500",
    value === "intelligence" && "bg-blue-400",
    value === "agility" && "bg-green-400",
    value === "logistics" && "bg-yellow-400",
  );
}

export function getBackdropColor(value?: string) {
  return clsx(
    "bg-radial from-neutral-700 from-10%",
    value === "legendary" && "to-yellow-600/30",
    value === "epic" && "to-purple-500/30",
    value === "rare" && "to-blue-500/30",
    value === "common" && "to-green-500/30",
    value === "strength" && "to-red-500/30",
    value === "intelligence" && "to-blue-400/30",
    value === "agility" && "to-green-400/30",
    value === "logistics" && "to-yellow-400/30",
  );
}

export function getTextColor(value?: string) {
  return clsx(
    value === "legendary" && "text-yellow-600",
    value === "epic" && "text-purple-500",
    value === "rare" && "text-blue-500",
    value === "common" && "text-green-500",
    value === "strength" && "text-red-500",
    value === "intelligence" && "text-blue-400",
    value === "agility" && "text-green-400",
    value === "logistics" && "text-yellow-400",
  );
}

export function getBorderColor(value?: string) {
  return clsx(
    value === "legendary" && "border-yellow-600",
    value === "epic" && "border-purple-500",
    value === "rare" && "border-blue-500",
    value === "common" && "border-green-500",
    value === "strength" && "border-red-500",
    value === "intelligence" && "border-blue-400",
    value === "agility" && "border-green-400",
    value === "logistics" && "border-yellow-400",
  );
}

export function getBorderBackgroundOffsetColor(value?: string) {
  return clsx(
    value === "legendary" && "border-yellow-500",
    value === "epic" && "border-purple-400",
    value === "rare" && "border-blue-400",
    value === "common" && "border-green-400",
    value === "strength" && "border-red-400",
    value === "intelligence" && "border-blue-300",
    value === "agility" && "border-green-300",
    value === "logistics" && "border-yellow-300",
  );
}

export function getBorderHoverColor(value?: string) {
  return clsx(
    value === "legendary" && "hover:border-yellow-600",
    value === "epic" && "hover:border-purple-500",
    value === "rare" && "hover:border-blue-500",
    value === "common" && "hover:border-green-500",
    value === "strength" && "hover:border-red-500",
    value === "intelligence" && "hover:border-blue-400",
    value === "agility" && "hover:border-green-400",
    value === "logistics" && "hover:border-yellow-400",
  );
}
