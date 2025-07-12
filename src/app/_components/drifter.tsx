"use client";

import { useRef, useState } from "react";
import { useBuildForm } from "./buildFormContext";
import data from "public/data.json";
import { IoClose } from "react-icons/io5";
import type { ActiveBuildIndex, ActiveFilter } from "~/types";
import { MASTERY_OPTIONS, TIER_LEVELS } from "~/utils";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ImageHelper from "./ImageHelper";
import SkillDescriptionParser from "./SkillDescriptionParser";
import clsx from "clsx";

const Drifter = ({
  activeBuildIndex,
}: {
  activeBuildIndex: ActiveBuildIndex;
}) => {
  const { formData, setFormData } = useBuildForm();
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const selectInput = useRef<HTMLSelectElement>(null);
  const custom_mastery_drifter = useRef<HTMLInputElement>(null);

  const drifters = data.drifters;
  const filteredData = drifters.filter((drifter) => {
    if (activeFilter === "all") return true;
    if (activeFilter === drifter.type) return true;
    return false;
  });

  let drifterData: (typeof drifters)[number] | undefined;
  if (formData?.builds[activeBuildIndex]?.data.drifter.name) {
    const drifterKey = formData.builds[activeBuildIndex]?.data.drifter.name;
    drifterData = data.drifters.find((drifter) => drifter.name === drifterKey);
  }

  const typeHighlight = clsx(
    "border-2 bg-radial from-neutral-800 from-10%",
    drifterData?.type === "strength" && "border-red-400 to-red-400/60",
    drifterData?.type === "intelligence" && "border-blue-400 to-blue-400/60",
    drifterData?.type === "agility" && "border-green-400 to-green-400/60",
    drifterData?.type === "logistics" && "border-yellow-400 to-yellow-400/60",
  );

  function getTypeOptionHighlight(drifterData: (typeof drifters)[number]) {
    return clsx(
      drifterData?.type === "strength" && "bg-red-400/20",
      drifterData?.type === "intelligence" && "bg-blue-400/20",
      drifterData?.type === "agility" && "bg-green-400/20",
      drifterData?.type === "logistics" && "bg-yellow-400/20",
    );
  }

  const typeTextColor = clsx(
    drifterData?.type === "strength" && "text-red-400",
    drifterData?.type === "intelligence" && "text-blue-400",
    drifterData?.type === "agility" && "text-green-400",
    drifterData?.type === "logistics" && "text-yellow-400",
  );

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex flex-wrap gap-2">
        <button
          className={`cursor-pointer rounded border px-3 py-1 hover:brightness-110 ${activeFilter === "all" ? "border-neutral-600 bg-neutral-700" : "border-neutral-500 bg-neutral-600"}`}
          onClick={() => {
            setActiveFilter("all");
          }}
        >
          All
        </button>
        <button
          className={`cursor-pointer rounded border px-3 py-1 hover:brightness-110 ${activeFilter === "strength" ? "border-neutral-600 bg-neutral-700" : "border-neutral-500 bg-neutral-600"}`}
          onClick={() => {
            setActiveFilter("strength");
          }}
        >
          Strength
        </button>
        <button
          className={`cursor-pointer rounded border px-3 py-1 hover:brightness-110 ${activeFilter === "agility" ? "border-neutral-600 bg-neutral-700" : "border-neutral-500 bg-neutral-600"}`}
          onClick={() => {
            setActiveFilter("agility");
          }}
        >
          Agility
        </button>
        <button
          className={`cursor-pointer rounded border px-3 py-1 hover:brightness-110 ${activeFilter === "intelligence" ? "border-neutral-600 bg-neutral-700" : "border-neutral-500 bg-neutral-600"}`}
          onClick={() => {
            setActiveFilter("intelligence");
          }}
        >
          Intelligence
        </button>
        <button
          className={`cursor-pointer rounded border px-3 py-1 hover:brightness-110 ${activeFilter === "logistics" ? "border-neutral-600 bg-neutral-700" : "border-neutral-500 bg-neutral-600"}`}
          onClick={() => {
            setActiveFilter("logistics");
          }}
        >
          Logistics
        </button>
      </div>
      <div className="flex gap-2">
        <div
          className={`flex h-12 w-12 items-center rounded border border-neutral-600 ${formData?.builds[activeBuildIndex]?.data.drifter.name ? "bg-radial from-neutral-700 from-10% to-black/30" : "bg-neutral-700"}`}
        >
          {drifterData?.image ? (
            <ImageHelper
              src={drifterData.image}
              alt={
                formData?.builds?.[activeBuildIndex]?.data?.drifter.name ?? ""
              }
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
              !drifterData ||
                !filteredData.some(
                  (drifter) => drifter.name === drifterData.name,
                )
                ? "text-white"
                : typeTextColor,
            )}
            id={"drifter"}
            name={"drifter"}
            ref={selectInput}
            value={formData?.builds?.[activeBuildIndex]?.data?.drifter.name}
            onChange={(e) => {
              setFormData((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  builds: prev.builds.map((b, idx) =>
                    idx === activeBuildIndex
                      ? {
                          ...b,
                          data: {
                            ...b.data,
                            drifter: {
                              name: e.target.value,
                              mastery: 0,
                              tier: "I",
                            },
                            stats: {
                              agility: 0,
                              strength: 0,
                              intelligence: 0,
                            },
                          },
                        }
                      : b,
                  ),
                };
              });
            }}
          >
            <option value="" hidden>
              Drifter
            </option>
            {filteredData.map((drifter, i) => (
              <option
                key={drifter.name + "_" + i}
                value={drifter.name}
                className={clsx(
                  formData?.builds?.some(
                    (build) => build.data.drifter.name === drifter.name,
                  ) ||
                    formData.support.some((support) => support === drifter.name)
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
          disabled={!formData?.builds?.[activeBuildIndex]?.data?.drifter.name}
          onClick={() => {
            setFormData((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                builds: prev.builds.map((b, idx) =>
                  idx === activeBuildIndex
                    ? {
                        ...b,
                        data: {
                          ...b.data,
                          drifter: {
                            name: "",
                            mastery: 0,
                            tier: "",
                          },
                          stats: {
                            agility: 0,
                            strength: 0,
                            intelligence: 0,
                          },
                        },
                      }
                    : b,
                ),
              };
            });
          }}
        >
          <IoClose className="h-6 w-6" />
        </button>
      </div>
      {formData?.builds?.[activeBuildIndex]?.data?.drifter.name && (
        <>
          <hr className="border-neutral-700" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
                <h2 className="text-lg">Details</h2>
                <div className="flex grow items-center justify-center rounded bg-neutral-800 p-2">
                  <p className="text-center text-sm">
                    WIP - All build features are not complete and may not
                    reflect the stats in-game.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
                <h2 className="text-lg">Skills</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <h3>Active Skill</h3>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded border border-neutral-600 bg-neutral-800 shadow-sm shadow-black">
                        {drifterData?.activeSkill.image ? (
                          <ImageHelper
                            src={drifterData.activeSkill.image}
                            width={256}
                            height={256}
                            alt={drifterData.activeSkill.name}
                          />
                        ) : null}
                      </div>
                      <div className="flex grow items-center justify-center rounded bg-neutral-800 p-2">
                        <p className="text-sm wrap-anywhere">
                          {drifterData?.activeSkill.name}
                        </p>
                      </div>
                    </div>
                    <div className="mt-1 grow rounded bg-neutral-800 p-2">
                      <SkillDescriptionParser
                        description={
                          drifterData?.activeSkill.description ??
                          "No description available."
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3>Passive Skill</h3>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded border border-neutral-600 bg-neutral-800 shadow-sm shadow-black">
                        {drifterData?.passiveSkill.image ? (
                          <ImageHelper
                            src={drifterData.passiveSkill.image}
                            width={256}
                            height={256}
                            alt={drifterData.passiveSkill.name}
                          />
                        ) : null}
                      </div>
                      <div className="flex grow items-center justify-center rounded bg-neutral-800 p-2">
                        <p className="text-sm wrap-anywhere">
                          {drifterData?.passiveSkill.name}
                        </p>
                      </div>
                    </div>
                    <div className="mt-1 grow rounded bg-neutral-800 p-2">
                      <SkillDescriptionParser
                        description={
                          drifterData?.passiveSkill.description ??
                          "No description available."
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2 className="text-lg">Mastery</h2>
              <div className="flex flex-wrap gap-2">
                {MASTERY_OPTIONS.map((option) => (
                  <button
                    key={option}
                    className={clsx(
                      "flex h-12 w-12 cursor-pointer items-center justify-center rounded p-2",
                      (formData?.builds?.[activeBuildIndex]?.data?.drifter
                        .mastery ?? 0) === Number(option)
                        ? typeHighlight
                        : "bg-neutral-800",
                    )}
                    onClick={() => {
                      setFormData((prev) => {
                        if (!prev) return prev;
                        return {
                          ...prev,
                          builds: prev.builds.map((b, idx) =>
                            idx === activeBuildIndex
                              ? {
                                  ...b,
                                  data: {
                                    ...b.data,
                                    drifter: {
                                      ...b.data.drifter,
                                      mastery: Number(option),
                                    },
                                  },
                                }
                              : b,
                          ),
                        };
                      });
                    }}
                  >
                    {option}
                  </button>
                ))}
                <div className="flex h-12 grow items-center justify-center rounded bg-neutral-800">
                  <input
                    type="number"
                    placeholder="Custom"
                    ref={custom_mastery_drifter}
                    className={clsx(
                      "flex h-12 grow rounded text-center outline-none",
                      MASTERY_OPTIONS.find(
                        (option) =>
                          Number(option) ===
                          formData?.builds?.[activeBuildIndex]?.data?.drifter
                            .mastery,
                      )
                        ? "bg-neutral-800"
                        : typeHighlight,
                    )}
                    max={50}
                    min={0}
                    value={
                      MASTERY_OPTIONS.find(
                        (option) =>
                          Number(option) ===
                          formData?.builds?.[activeBuildIndex]?.data?.drifter
                            .mastery,
                      )
                        ? ""
                        : formData?.builds?.[activeBuildIndex]?.data?.drifter
                            .mastery
                    }
                    onChange={(e) => {
                      if (Number(e.target.value) > 50) {
                        e.target.value = "";
                        setFormData((prev) => {
                          if (!prev) return prev;
                          return {
                            ...prev,
                            builds: prev.builds.map((b, idx) =>
                              idx === activeBuildIndex
                                ? {
                                    ...b,
                                    data: {
                                      ...b.data,
                                      drifter: {
                                        ...b.data.drifter,
                                        mastery: 0,
                                      },
                                    },
                                  }
                                : b,
                            ),
                          };
                        });
                        return;
                      }
                      setFormData((prev) => {
                        if (!prev) return prev;
                        return {
                          ...prev,
                          builds: prev.builds.map((b, idx) =>
                            idx === activeBuildIndex
                              ? {
                                  ...b,
                                  data: {
                                    ...b.data,
                                    drifter: {
                                      ...b.data.drifter,
                                      mastery: Number(e.target.value),
                                    },
                                  },
                                }
                              : b,
                          ),
                        };
                      });
                    }}
                  />
                </div>
                <button
                  className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded bg-neutral-800 transition-all hover:text-red-500 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40`}
                  disabled={
                    (formData?.builds?.[activeBuildIndex]?.data?.drifter
                      .mastery ?? 0) === 0
                  }
                  onClick={() => {
                    if (custom_mastery_drifter.current) {
                      custom_mastery_drifter.current.value = "";
                    }
                    setFormData((prev) => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        builds: prev.builds.map((b, idx) =>
                          idx === activeBuildIndex
                            ? {
                                ...b,
                                data: {
                                  ...b.data,
                                  drifter: {
                                    ...b.data.drifter,
                                    mastery: 0,
                                  },
                                },
                              }
                            : b,
                        ),
                      };
                    });
                  }}
                >
                  <IoClose className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2 className="text-lg">Tier</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {TIER_LEVELS.map((tier) => (
                  <button
                    key={tier}
                    aria-label={"Set tier level to " + tier}
                    className={clsx(
                      "flex h-12 w-12 cursor-pointer items-center justify-center rounded p-2",
                      (formData?.builds?.[activeBuildIndex]?.data?.drifter
                        .tier !== ""
                        ? formData?.builds?.[activeBuildIndex]?.data?.drifter
                            .tier
                        : "I") === String(tier)
                        ? typeHighlight
                        : "bg-neutral-800",
                    )}
                    onClick={() => {
                      setFormData((prev) => {
                        if (!prev) return prev;
                        return {
                          ...prev,
                          builds: prev.builds.map((b, idx) =>
                            idx === activeBuildIndex
                              ? {
                                  ...b,
                                  data: {
                                    ...b.data,
                                    drifter: {
                                      ...b.data.drifter,
                                      tier: String(tier),
                                    },
                                  },
                                }
                              : b,
                          ),
                        };
                      });
                    }}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2 className="text-lg">Battle Infusion</h2>
              <div className="flex items-center justify-center gap-2">
                <button className="cursor-pointer">
                  <FaMinus />
                </button>
                <span>0</span>
                <button className="cursor-pointer">
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2 className="text-lg">Support Bonuses</h2>
              <div className="flex justify-between gap-2">
                {drifterData?.supportEffects.negative.name === "None" ? (
                  ""
                ) : (
                  <div className="flex flex-1 justify-center gap-2 rounded bg-neutral-800 p-2">
                    <span className="text-red-400">-</span>
                    <span>{drifterData?.supportEffects.negative.name}</span>
                  </div>
                )}

                <div className="flex flex-1 justify-center gap-2 rounded bg-neutral-800 p-2">
                  <span className="text-green-400">+</span>
                  <span>{drifterData?.supportEffects.positive.name}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Drifter;
