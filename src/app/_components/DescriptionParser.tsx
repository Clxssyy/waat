type Props = {
  description: string;
};

export default function DescriptionParser({ description }: Props) {
  // RegEx to find bracketed segments
  const parts = description.split(/(\[[^\]]+\])/g);

  return (
    <p className="h-full text-sm wrap-anywhere whitespace-pre-wrap">
      {parts.map((part, index) => {
        if (part.startsWith("[") && part.endsWith("]")) {
          const inner = part.slice(1, -1).toLowerCase();

          let color = "text-white"; // default

          if (inner.includes("healing")) {
            color = "text-green-400";
          } else if (inner.includes("damage")) {
            color = "text-red-400";
          } else if (inner.includes("target-based max hp")) {
            color = "text-blue-400";
          } else color = "text-neutral-400";

          return (
            <span key={index} className={color}>
              {part}
            </span>
          );
        }

        // Normal text
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
}
