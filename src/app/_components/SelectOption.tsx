import clsx from "clsx";
import ImageHelper from "./ImageHelper";
import { getBackdropColor, getBorderColor, getTextColor } from "~/styles";
import { useBuildForm } from "./buildFormContext";
import type { SelectOptions } from "~/types";

export type SelectOptionProps = {
  option: SelectOptions;
  description?: string;
  selected?: boolean;
  color?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const SelectOption = ({
  option,
  description,
  selected,
  color,
  ...rest
}: SelectOptionProps) => {
  const {
    characterData,
    activeSlot,
    activeBuildIndex,
    activeTab,
    activeSupport,
  } = useBuildForm();
  const colorDeterminant = "rarity" in option ? option.rarity : option.type;
  const conflicted =
    activeSlot === "drifters" || activeTab === "support"
      ? characterData?.builds?.some(
          (build) =>
            build.data.drifter.name === option.name &&
            (activeTab !== "support"
              ? characterData.builds[activeBuildIndex]?.id !== build.id
              : true) &&
            build.data.drifter.name !== "",
        ) ||
        characterData.support.some(
          (support, i) => support === option.name && activeSupport !== i,
        )
      : characterData?.builds?.some(
          (build) =>
            build.data.equipment[activeSlot].name === option.name &&
            characterData.builds[activeBuildIndex]?.id !== build.id &&
            build.data.equipment[activeSlot].name !== "",
        );

  return (
    <button
      className={clsx(
        "relative flex cursor-pointer items-center gap-1 p-1 text-left hover:brightness-125",
        selected && "brightness-125",
        color ?? "bg-neutral-800",
      )}
      {...rest}
    >
      <div
        className={clsx(
          "h-10 w-10 rounded border",
          getBackdropColor(colorDeterminant),
          getBorderColor(colorDeterminant),
        )}
      >
        {option.image ? (
          <ImageHelper
            src={option.image}
            alt={option.name}
            width={"rarity" in option ? 800 : 2436}
            height={"rarity" in option ? 800 : 1440}
            className="h-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex grow flex-col justify-center text-sm">
        <h3 className={getTextColor(colorDeterminant)}>{option.name}</h3>
        <p className="text-xs text-neutral-400">{description}</p>
      </div>
      {conflicted && (
        <div className="absolute top-1/2 right-1 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
          <span className="text-sm">!</span>
        </div>
      )}
    </button>
  );
};

export default SelectOption;
