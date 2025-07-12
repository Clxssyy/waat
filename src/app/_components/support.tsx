"use state";

import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import data from "public/data.json";
import { useBuildForm } from "./buildFormContext";
import { IoClose } from "react-icons/io5";
import ImageHelper from "./ImageHelper";
import clsx from "clsx";

const Support = () => {
  const [activeSupport, setActiveSupport] = useState<number>();
  const { formData, setFormData } = useBuildForm();
  const drifters = data.drifters;
  const drifterData: ((typeof drifters)[number] | undefined)[] = [];

  useEffect(() => {
    if (formData.support.length !== 5)
      setFormData((prev) => {
        if (!prev) return prev;
        const newSupport = Array.from({ length: 5 }, () => "");
        return {
          ...prev,
          support: newSupport,
        };
      });
  }, []);

  function getTypeOptionHighlight(drifterData: (typeof drifters)[number]) {
    return clsx(
      drifterData?.type === "strength" && "bg-red-400/20",
      drifterData?.type === "intelligence" && "bg-blue-400/20",
      drifterData?.type === "agility" && "bg-green-400/20",
      drifterData?.type === "logistics" && "bg-yellow-400/20",
    );
  }

  function getTypeTextColor(drifterData: (typeof drifters)[number]) {
    return clsx(
      drifterData?.type === "strength" && "text-red-400",
      drifterData?.type === "intelligence" && "text-blue-400",
      drifterData?.type === "agility" && "text-green-400",
      drifterData?.type === "logistics" && "text-yellow-400",
    );
  }

  function getTypeOutline(drifterData: (typeof drifters)[number]) {
    return clsx(
      "border-2",
      drifterData?.type === "strength" && "border-red-400",
      drifterData?.type === "intelligence" && "border-blue-400",
      drifterData?.type === "agility" && "border-green-400",
      drifterData?.type === "logistics" && "border-yellow-400",
    );
  }

  function getTypeHover(drifterData: (typeof drifters)[number]) {
    return clsx(
      drifterData?.type === "strength" && "hover:border-red-400",
      drifterData?.type === "intelligence" && "hover:border-blue-400",
      drifterData?.type === "agility" && "hover:border-green-400",
      drifterData?.type === "logistics" && "hover:border-yellow-400",
    );
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-wrap justify-center gap-2">
        {formData.support.map((_, i) => {
          const data = drifters.find(
            (drifter) => drifter.name === formData?.support[i],
          );
          if (data) drifterData.push(data);
          else drifterData.push(undefined);
          return (
            <button
              key={i}
              className={clsx(
                "relative flex h-60 w-32 cursor-pointer items-center justify-center border bg-neutral-700 bg-radial from-neutral-700 from-10% to-black/30 transition-all active:scale-[98%]",
                activeSupport === i
                  ? clsx(
                      "scale-[102%] border-2",
                      drifterData[i]
                        ? getTypeOutline(drifterData[i])
                        : "border-cyan-400",
                    )
                  : "border-neutral-600",
                drifterData[i]
                  ? getTypeHover(drifterData[i])
                  : "hover:border-cyan-400",
              )}
              onClick={() => {
                if (activeSupport === i) setActiveSupport(undefined);
                else setActiveSupport(i);
              }}
            >
              {formData.support[i] ? (
                drifterData[i]?.image ? (
                  <ImageHelper
                    src={drifterData[i]?.image}
                    alt={formData?.support[i] ?? ""}
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
              {formData?.builds?.some(
                (build) =>
                  build.data.drifter.name === formData.support[i] &&
                  build.data.drifter.name !== "",
              ) ||
              formData.support.some(
                (build, j) =>
                  build === formData.support[i] && j != i && build !== "",
              ) ? (
                <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
                  <span className="text-sm">!</span>
                </div>
              ) : null}
            </button>
          );
        })}
      </div>
      {activeSupport != undefined && (
        <div className="flex gap-2">
          <div
            className={`flex h-12 w-12 items-center rounded border border-neutral-600 ${formData?.support[activeSupport] ? "bg-radial from-neutral-700 from-10% to-black/30" : "bg-neutral-700"}`}
          >
            {drifterData[activeSupport]?.image ? (
              <ImageHelper
                src={drifterData[activeSupport].image}
                alt={formData?.support[activeSupport] ?? ""}
                width={2436}
                height={1440}
                className="h-full object-cover"
              />
            ) : null}
          </div>
          <div className="h-12 grow rounded bg-neutral-700">
            <select
              className={clsx(
                "h-full w-full cursor-pointer rounded border border-neutral-600 bg-neutral-700 px-2 text-lg",
                !drifterData[activeSupport]
                  ? "text-white"
                  : getTypeTextColor(drifterData[activeSupport]),
              )}
              value={formData?.support[activeSupport]}
              onChange={(e) => {
                setFormData((prev) => {
                  if (!prev) return prev;
                  const newSupport = [...prev.support];
                  newSupport[activeSupport] = e.target.value;
                  return {
                    ...prev,
                    support: newSupport,
                  };
                });
              }}
            >
              <option value="" hidden>
                Drifter
              </option>
              {drifters.map((drifter, i) => (
                <option
                  key={drifter.name + "_" + i}
                  value={drifter.name}
                  className={clsx(
                    formData?.builds?.some(
                      (build) => build.data.drifter.name === drifter.name,
                    ) ||
                      formData.support.some(
                        (support) => support === drifter.name,
                      )
                      ? "text-neutral-500"
                      : "text-white",
                    getTypeOptionHighlight(drifter),
                  )}
                >
                  {drifter.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded border border-neutral-600 bg-neutral-700 transition-all hover:text-red-500 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40`}
            disabled={!formData.support[activeSupport]}
            onClick={() => {
              setFormData((prev) => {
                if (!prev) return prev;
                const newSupport = [...prev.support];
                newSupport[activeSupport] = "";
                return {
                  ...prev,
                  support: newSupport,
                };
              });
            }}
          >
            <IoClose className="h-6 w-6" />
          </button>
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
          <div className="flex justify-between text-lg">
            <h2>Support Bonuses</h2>
            <span>
              {formData.support.filter((support) => support != "").length +
                "/5"}
            </span>
          </div>
          {formData.support.map((drifter, i) =>
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
