import React from "react";
import data from "public/data.json";

type Props = {
  description: string;
};

export default function DescriptionParser({ description }: Props) {
  const parseMarkdown = (text: string) => {
    const regex = /(\*\*[^*]+\*\*|_[^_]+_|^#{1,2}\s?.+?$)/gm;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const matchText = match[0];
      const matchIndex = match.index;

      // Add any text before match
      if (lastIndex < matchIndex) {
        parts.push(applyHighlights(text.slice(lastIndex, matchIndex)));
      }

      // Format based on pattern
      if (/^##\s?/.test(matchText)) {
        parts.push(
          <span key={parts.length} className="text-lg font-semibold">
            {applyHighlights(matchText.replace(/^##\s?/, ""))}
          </span>,
        );
      } else if (/^#\s?/.test(matchText)) {
        parts.push(
          <span key={parts.length} className="text-xl font-bold">
            {applyHighlights(matchText.replace(/^#\s?/, ""))}
          </span>,
        );
      } else if (matchText.startsWith("**")) {
        parts.push(
          <strong key={parts.length}>
            {applyHighlights(matchText.slice(2, -2))}
          </strong>,
        );
      } else if (matchText.startsWith("_")) {
        parts.push(
          <em key={parts.length}>{applyHighlights(matchText.slice(1, -1))}</em>,
        );
      }

      lastIndex = regex.lastIndex;
    }

    // Push any remaining text
    if (lastIndex < text.length) {
      parts.push(applyHighlights(text.slice(lastIndex)));
    }

    return parts;
  };

  const applyHighlights = (text: string) => {
    const regex = /\b(boots|helmet|chest|weapon|skill|drifter)\[([^\]]+)\]/g;
    const segments = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const [, type, label] = match;
      const start = match.index;

      if (start > lastIndex) {
        segments.push(text.slice(lastIndex, start));
      }

      let color = "";
      if (
        type === "boots" ||
        type === "helmet" ||
        type === "chest" ||
        type === "weapon"
      ) {
        const item = data[type].find(
          (item) => item.name.toLowerCase() === label?.toLowerCase(),
        );
        if (item) {
          switch (item.rarity) {
            case "legendary":
              color = "text-yellow-500";
              break;
            case "epic":
              color = "text-purple-500";
              break;
            case "rare":
              color = "text-blue-500";
              break;
            case "common":
              color = "text-green-500";
              break;

            default:
              break;
          }
        }
      }

      if (type === "drifter") {
        const drifter = data.drifters.find(
          (drifter) => drifter.name.toLowerCase() === label?.toLowerCase(),
        );
        if (drifter) {
          switch (drifter.type) {
            case "intelligence":
              color = "text-blue-400";
              break;
            case "agility":
              color = "text-green-400";
              break;
            case "strength":
              color = "text-red-400";
              break;
            case "logistics":
              color = "text-yellow-300";
              break;

            default:
              break;
          }
        }
      }

      if (type === "skill") {
        const skill = Object.values(data.skills)
          .flatMap((skillGroup) => Object.values(skillGroup).flat())
          .find((skill) => skill.name.toLowerCase() === label?.toLowerCase());
        if (skill) color = "text-neutral-300";
      }

      segments.push(
        <span key={segments.length} className={color}>
          {label}
        </span>,
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      segments.push(text.slice(lastIndex));
    }

    return segments;
  };

  return (
    <p className="rounded break-all whitespace-pre-wrap">
      {description
        .split(/\r?\n/)
        .flatMap((line: string, i: number, arr: string[]) => [
          <React.Fragment key={i}>{parseMarkdown(line)}</React.Fragment>,
          i < arr.length - 1 && "\n",
        ])}
    </p>
  );
}
