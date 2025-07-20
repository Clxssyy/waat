"use client";

import { useMemo, useRef, useState } from "react";
import { useBuildForm } from "./buildFormContext";
import data from "public/data.json";
import { IoClose } from "react-icons/io5";
import type { ActiveFilter } from "~/types";
import { MASTERY_OPTIONS, TIER_LEVELS } from "~/utils";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ImageHelper from "./ImageHelper";
import SkillDescriptionParser from "./SkillDescriptionParser";
import clsx from "clsx";
import {
  getBackgroundColor,
  getBorderBackgroundOffsetColor,
  getBorderColor,
  getTextColor,
} from "~/styles";
import SelectMenu from "./SelectMenu";
import { statsSchema } from "~/schemas";
import { notFound } from "next/navigation";
import { RiResetLeftFill } from "react-icons/ri";

const Drifter = () => {
  const { characterData, setCharacterData, activeSlot, activeBuildIndex } =
    useBuildForm();
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const custom_mastery_drifter = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(
    () =>
      data.drifters.filter(
        (item) => item.type === activeFilter || activeFilter === "all",
      ),
    [activeFilter],
  );

  if (!characterData) notFound();
  if (!characterData.builds[activeBuildIndex]) notFound();

  const drifterData = data.drifters.find(
    (drifter) =>
      drifter.name ===
      characterData.builds[activeBuildIndex]?.data.drifter.name,
  );

  return (
    <div className="flex flex-col gap-2 rounded p-2">
      <div className="flex flex-wrap gap-2">
        <button
          className={clsx(
            "w-12 cursor-pointer rounded border px-3 py-1 transition-all hover:brightness-110",
            activeFilter === "all"
              ? clsx(
                  drifterData
                    ? clsx(
                        getBorderBackgroundOffsetColor(drifterData.type),
                        getBackgroundColor(drifterData.type),
                      )
                    : "border-cyan-300 bg-cyan-400",
                )
              : "border-neutral-500 bg-neutral-600",
          )}
          onClick={() => {
            setActiveFilter("all");
          }}
        >
          All
        </button>
        <button
          className={clsx(
            "cursor-pointer rounded border px-3 py-1 transition-all hover:brightness-110",
            activeFilter === "strength"
              ? clsx(
                  drifterData
                    ? clsx(
                        getBorderBackgroundOffsetColor(drifterData.type),
                        getBackgroundColor(drifterData.type),
                      )
                    : "border-cyan-300 bg-cyan-400",
                )
              : "border-neutral-500 bg-neutral-600",
          )}
          onClick={() => {
            setActiveFilter("strength");
          }}
        >
          Strength
        </button>
        <button
          className={clsx(
            "cursor-pointer rounded border px-3 py-1 transition-all hover:brightness-110",
            activeFilter === "agility"
              ? clsx(
                  drifterData
                    ? clsx(
                        getBorderBackgroundOffsetColor(drifterData.type),
                        getBackgroundColor(drifterData.type),
                      )
                    : "border-cyan-300 bg-cyan-400",
                )
              : "border-neutral-500 bg-neutral-600",
          )}
          onClick={() => {
            setActiveFilter("agility");
          }}
        >
          Agility
        </button>
        <button
          className={clsx(
            "cursor-pointer rounded border px-3 py-1 transition-all hover:brightness-110",
            activeFilter === "intelligence"
              ? clsx(
                  drifterData
                    ? clsx(
                        getBorderBackgroundOffsetColor(drifterData.type),
                        getBackgroundColor(drifterData.type),
                      )
                    : "border-cyan-300 bg-cyan-400",
                )
              : "border-neutral-500 bg-neutral-600",
          )}
          onClick={() => {
            setActiveFilter("intelligence");
          }}
        >
          Intelligence
        </button>
        <button
          className={clsx(
            "cursor-pointer rounded border px-3 py-1 transition-all hover:brightness-110",
            activeFilter === "logistics"
              ? clsx(
                  drifterData
                    ? clsx(
                        getBorderBackgroundOffsetColor(drifterData.type),
                        getBackgroundColor(drifterData.type),
                      )
                    : "border-cyan-300 bg-cyan-400",
                )
              : "border-neutral-500 bg-neutral-600",
          )}
          onClick={() => {
            setActiveFilter("logistics");
          }}
        >
          Logistics
        </button>
      </div>
      <SelectMenu
        options={filteredOptions}
        allOptions={data.drifters}
        placeholder={activeSlot[0]?.toUpperCase() + activeSlot.slice(1)}
        value={characterData.builds[activeBuildIndex].data.drifter.name}
        onChange={(val) =>
          setCharacterData((prev) => {
            return {
              ...prev,
              builds: prev.builds.map((b, idx) =>
                idx === activeBuildIndex
                  ? {
                      ...b,
                      data: {
                        ...b.data,
                        drifter: {
                          name: val,
                          mastery: 0,
                          tier: "I",
                        },
                        stats: statsSchema.parse({}),
                      },
                    }
                  : b,
              ),
            };
          })
        }
      />
      {characterData.builds[activeBuildIndex].data.drifter.name && (
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
                      <div
                        className={clsx(
                          "flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded border-2 bg-neutral-800 shadow-sm shadow-black",
                          getBorderColor(drifterData?.type),
                        )}
                      >
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
                      <div
                        className={clsx(
                          "flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded border-2 bg-neutral-800 shadow-sm shadow-black",
                          getBorderColor(drifterData?.type),
                        )}
                      >
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
                      characterData.builds[activeBuildIndex]?.data.drifter
                        .mastery === Number(option)
                        ? clsx(
                            getBorderBackgroundOffsetColor(drifterData?.type),
                            "border hover:brightness-110",
                            getBackgroundColor(drifterData?.type),
                          )
                        : "bg-neutral-800 hover:brightness-125",
                    )}
                    onClick={() => {
                      setCharacterData((prev) => {
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
                          characterData.builds[activeBuildIndex]?.data.drifter
                            .mastery,
                      )
                        ? "bg-neutral-800 hover:brightness-125"
                        : clsx(
                            getBorderBackgroundOffsetColor(drifterData?.type),
                            "border hover:brightness-110",
                            getBackgroundColor(drifterData?.type),
                          ),
                    )}
                    max={50}
                    min={0}
                    value={
                      MASTERY_OPTIONS.find(
                        (option) =>
                          Number(option) ===
                          characterData.builds[activeBuildIndex]?.data.drifter
                            .mastery,
                      )
                        ? ""
                        : characterData.builds[activeBuildIndex]?.data.drifter
                            .mastery
                    }
                    onChange={(e) => {
                      if (Number(e.target.value) > 50) e.target.value = "";
                      setCharacterData((prev) => {
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
                                      mastery:
                                        Number(e.target.value) > 50
                                          ? 0
                                          : Number(e.target.value),
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
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded bg-neutral-800 transition-all hover:text-red-500 hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Clear drifter mastery"
                  disabled={
                    characterData.builds[activeBuildIndex]?.data.drifter
                      .mastery === 0
                  }
                  onClick={() => {
                    if (custom_mastery_drifter.current)
                      custom_mastery_drifter.current.value = "";
                    setCharacterData((prev) => {
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
              <div className="grid grid-cols-3 gap-2 md:grid-cols-6 2xl:grid-cols-12">
                {TIER_LEVELS.map((tier) => (
                  <button
                    key={tier}
                    aria-label={"Set tier level to " + tier}
                    className={clsx(
                      "flex h-12 min-w-12 cursor-pointer items-center justify-center rounded p-2",
                      characterData.builds[activeBuildIndex]?.data.drifter
                        .tier === tier
                        ? clsx(
                            getBorderBackgroundOffsetColor(drifterData?.type),
                            "border hover:brightness-110",
                            getBackgroundColor(drifterData?.type),
                          )
                        : "bg-neutral-800 hover:brightness-125",
                    )}
                    onClick={() => {
                      setCharacterData((prev) => {
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
                                      tier: tier,
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
                <button
                  aria-label={"Set tier level to default."}
                  className={clsx(
                    "flex h-12 min-w-12 cursor-pointer items-center justify-center rounded bg-neutral-800 p-2 hover:brightness-125",
                  )}
                  onClick={() => {
                    setCharacterData((prev) => {
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
                                    tier: "I",
                                  },
                                },
                              }
                            : b,
                        ),
                      };
                    });
                  }}
                >
                  <RiResetLeftFill />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2 className="text-lg">Battle Infusion</h2>
              <div className="grid grid-cols-4 items-center justify-center gap-2 rounded-lg bg-neutral-800 p-2">
                <button
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease battle infusion"
                >
                  <FaMinus />
                </button>
                <span className="col-span-2 text-center">
                  <span className={getTextColor(drifterData?.type)}>+</span> 0
                </span>
                <button
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase battle infusion"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2 className="text-lg">Support Bonuses</h2>
              <div className="flex justify-between gap-2">
                {drifterData?.supportEffects.negative.name === "None" ? null : (
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
