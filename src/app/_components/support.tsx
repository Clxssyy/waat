"use state";

import { FaPlus } from "react-icons/fa6";
import data from "public/data.json";
import { useBuildForm } from "./buildFormContext";
import ImageHelper from "./ImageHelper";
import clsx from "clsx";
import SelectMenu from "./SelectMenu";
import { getBorderColor, getBorderHoverColor } from "~/styles";
import { useEffect } from "react";

const Support = () => {
  const { characterData, setCharacterData, activeSupport, setActiveSupport } =
    useBuildForm();
  const drifterData: ((typeof data.drifters)[number] | undefined)[] = [];

  useEffect(() => {
    if (characterData.support.length !== 5)
      setCharacterData((prev) => {
        const newSupport = Array.from({ length: 5 }, () => "");
        return {
          ...prev,
          support: newSupport,
        };
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-wrap justify-center gap-2">
        {characterData.support.map((_, i) => {
          const supportData = data.drifters.find(
            (drifter) => drifter.name === characterData?.support[i],
          );
          if (supportData) drifterData.push(supportData);
          else drifterData.push(undefined);
          return (
            <button
              key={i}
              className={clsx(
                "relative flex h-60 w-32 cursor-pointer items-center justify-center border bg-neutral-700 bg-radial from-neutral-700 from-10% to-black/30 transition-all",
                activeSupport === i
                  ? clsx(
                      "scale-[102%] border-2",
                      drifterData[i]
                        ? getBorderColor(drifterData[i].type)
                        : "border-cyan-400",
                    )
                  : "border-neutral-600",
                drifterData[i]
                  ? getBorderHoverColor(drifterData[i].type)
                  : "hover:border-cyan-400",
              )}
              onClick={() => {
                if (activeSupport === i) setActiveSupport(undefined);
                else setActiveSupport(i);
              }}
            >
              {characterData.support[i] ? (
                drifterData[i]?.image ? (
                  <ImageHelper
                    src={drifterData[i]?.image}
                    alt={characterData?.support[i] ?? ""}
                    width={2436}
                    height={1440}
                    className="h-full object-cover"
                  />
                ) : (
                  <span>{drifterData[i]?.name}</span>
                )
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-neutral-500">
                  <FaPlus />
                </div>
              )}
              {characterData?.builds?.some(
                (build) =>
                  build.data.drifter.name === characterData.support[i] &&
                  build.data.drifter.name !== "",
              ) ||
              characterData.support.some(
                (build, j) =>
                  build === characterData.support[i] && j != i && build !== "",
              ) ? (
                <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
                  <span className="text-sm">!</span>
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
      {activeSupport !== undefined && (
        <SelectMenu
          options={data.drifters}
          placeholder={"Drifters"}
          value={characterData.support[activeSupport] ?? ""}
          onChange={(val) => {
            const newSupport = characterData.support;
            newSupport[activeSupport] = val;
            setCharacterData((prev) => {
              return {
                ...prev,
                support: newSupport,
              };
            });
          }}
        />
      )}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
          <div className="flex justify-between text-lg">
            <h2>Support Bonuses</h2>
            <span>
              {characterData.support.filter((support) => support != "").length +
                "/5"}
            </span>
          </div>
          {characterData.support.map((drifter, i) =>
            drifter !== "" ? (
              <div
                className="flex justify-between gap-2"
                key={drifter + "_" + i}
              >
                {drifterData[i]?.supportEffects.negative.name ===
                "None" ? null : (
                  <div className="flex flex-1 items-center justify-center gap-2 rounded bg-neutral-800 p-2">
                    <span className="text-red-400">-</span>
                    <span>{drifterData[i]?.supportEffects.negative.name}</span>
                  </div>
                )}

                <div className="flex flex-1 items-center justify-center gap-2 rounded bg-neutral-800 p-2">
                  <span className="text-green-400">+</span>
                  <span>{drifterData[i]?.supportEffects.positive.name}</span>
                </div>
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;
