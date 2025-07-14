"use client";

import { useEffect, useRef, useState } from "react";
import { useBuildForm } from "./buildFormContext";
import data from "public/data.json";
import { IoClose } from "react-icons/io5";
import type { ActiveFilter, ActiveBuildIndex, ActiveSlots } from "~/types";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { MASTERY_OPTIONS, TIER_LEVELS } from "~/utils";
import ImageHelper from "./ImageHelper";
import SkillDescriptionParser from "./SkillDescriptionParser";
import clsx from "clsx";

type slots = Exclude<ActiveSlots, "drifter">;

const Equipment = ({
  slot,
  activeBuildIndex,
}: {
  slot: slots;
  activeBuildIndex: ActiveBuildIndex;
}) => {
  const { formData, setFormData } = useBuildForm();
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const selectInput = useRef<HTMLSelectElement>(null);
  const custom_mastery_equipment = useRef<HTMLInputElement>(null);
  const [dataPool, setDataPool] = useState(data[slot]);
  const filteredData = Object.entries(dataPool).filter(([, equipment]) => {
    if (activeFilter === "all") return true;
    if (activeFilter === equipment.type) return true;
    return false;
  });

  useEffect(() => {
    setDataPool(data[slot]);
    setActiveFilter("all");
  }, [slot]);

  type EquipmentData = {
    name: string;
    rarity: string;
    core_skill: {
      name: string;
      description: string;
      image: string;
    };
    type: string;
    set?: string;
    image: string;
  };

  let equipmentData: EquipmentData | undefined;
  let skillData;

  if (formData?.builds[activeBuildIndex]?.data.equipment[slot].name) {
    const equipmentKey =
      formData.builds[activeBuildIndex].data.equipment[slot].name;
    equipmentData = data[slot].find(
      (equipment) => equipment.name === equipmentKey,
    );

    if (equipmentData) {
      skillData = data.skills[equipmentData?.set as keyof typeof data.skills];
    }
  }

  const rarityHighlight = clsx(
    "border-2 bg-radial from-neutral-800 from-10%",
    equipmentData?.rarity === "legendary" &&
      "border-yellow-600 to-yellow-600/60",
    equipmentData?.rarity === "epic" && "border-purple-600 to-purple-600/60",
    equipmentData?.rarity === "rare" && "border-blue-600 to-blue-600/60",
    equipmentData?.rarity === "common" && "border-green-600 to-green-600/60",
  );

  const rarityBorderColor = clsx(
    equipmentData?.rarity === "legendary" && "border-yellow-600",
    equipmentData?.rarity === "epic" && "border-purple-600",
    equipmentData?.rarity === "rare" && "border-blue-600",
    equipmentData?.rarity === "common" && "border-green-600",
    !equipmentData?.rarity && "border-cyan-400",
  );

  function getRarityOptionHighlight(equipmentData: EquipmentData): string {
    return clsx(
      equipmentData?.rarity === "legendary" && "bg-yellow-600/20",
      equipmentData?.rarity === "epic" && "bg-purple-600/20",
      equipmentData?.rarity === "rare" && "bg-blue-600/20",
      equipmentData?.rarity === "common" && "bg-green-600/20",
    );
  }

  const rarityTextColor = clsx(
    equipmentData?.rarity === "legendary" && "text-yellow-600",
    equipmentData?.rarity === "epic" && "text-purple-600",
    equipmentData?.rarity === "rare" && "text-blue-600",
    equipmentData?.rarity === "common" && "text-green-600",
  );

  return (
    <div className="flex flex-col gap-2 rounded p-2">
      <div className="flex flex-wrap gap-2">
        <button
          className={clsx(
            "cursor-pointer rounded border px-3 py-1 hover:brightness-110",
            activeFilter === "all"
              ? clsx("bg-neutral-700", rarityBorderColor)
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
            "cursor-pointer rounded border px-3 py-1 hover:brightness-110",
            activeFilter === "strength"
              ? clsx("bg-neutral-700", rarityBorderColor)
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
            "cursor-pointer rounded border px-3 py-1 hover:brightness-110",
            activeFilter === "agility"
              ? clsx("bg-neutral-700", rarityBorderColor)
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
            "cursor-pointer rounded border px-3 py-1 hover:brightness-110",
            activeFilter === "intelligence"
              ? clsx("bg-neutral-700", rarityBorderColor)
              : "border-neutral-500 bg-neutral-600",
          )}
          onClick={() => {
            setActiveFilter("intelligence");
          }}
        >
          Intelligence
        </button>
        {slot === "chest" && (
          <button
            className={clsx(
              "cursor-pointer rounded border px-3 py-1 hover:brightness-110",
              activeFilter === "logistics"
                ? clsx("bg-neutral-700", rarityBorderColor)
                : "border-neutral-500 bg-neutral-600",
            )}
            onClick={() => {
              setActiveFilter("logistics");
            }}
          >
            Logistics
          </button>
        )}
      </div>
      <div className="flex gap-2">
        <div
          className={`h-12 w-12 rounded border border-neutral-600 ${formData?.builds[activeBuildIndex]?.data.equipment ? `${equipmentData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30" : `${equipmentData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30" : `${equipmentData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30" : `${equipmentData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30" : "bg-neutral-700"}`}`}`}` : "bg-neutral-700"}`}
        >
          {equipmentData?.image ? (
            <ImageHelper
              src={equipmentData.image}
              alt={
                formData.builds?.[activeBuildIndex]?.data?.equipment[slot]
                  .name ?? ""
              }
              width={800}
              height={800}
            />
          ) : null}
        </div>
        <div className="h-12 grow rounded bg-neutral-700">
          <select
            className={clsx(
              "h-full w-full cursor-pointer rounded border border-neutral-600 bg-neutral-700 px-2 text-lg outline-none",
              !equipmentData ||
                !filteredData.some(
                  ([, equipment]) => equipment.name === equipmentData.name,
                )
                ? "text-white"
                : rarityTextColor,
            )}
            aria-label={slot}
            ref={selectInput}
            value={
              formData.builds?.[activeBuildIndex]?.data?.equipment[slot].name
            }
            onChange={(e) => {
              setFormData((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  builds: prev.builds.map((b, idx) =>
                    idx === activeBuildIndex
                      ? slot === "weapon"
                        ? {
                            ...b,
                            data: {
                              ...b.data,
                              equipment: {
                                ...b.data.equipment,
                                [slot]: {
                                  name: e.target.value,
                                  mastery: 0,
                                  tier: "I",
                                  mod: {
                                    name: "",
                                  },
                                },
                              },
                              skills: {
                                basic: "",
                                common: "",
                              },
                            },
                          }
                        : {
                            ...b,
                            data: {
                              ...b.data,
                              equipment: {
                                ...b.data.equipment,
                                [slot]: {
                                  name: e.target.value,
                                  mastery: 0,
                                  tier: "I",
                                },
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
              {slot.charAt(0).toUpperCase() + slot.slice(1)}
            </option>
            <option value="" className="text-white">
              None
            </option>
            {filteredData.map(([i, equipment]) => (
              <option
                key={i}
                value={equipment.name}
                className={clsx(
                  formData?.builds?.some(
                    (build) =>
                      build.data.equipment[slot].name === equipment.name,
                  )
                    ? "text-neutral-500"
                    : "text-white",
                  getRarityOptionHighlight(equipment),
                )}
              >
                {equipment.name}
              </option>
            ))}
          </select>
        </div>
        <button
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded border border-neutral-600 bg-neutral-700 transition-all hover:text-red-500 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Clear equipment"
          disabled={
            !formData?.builds?.[activeBuildIndex]?.data?.equipment[slot].name
          }
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
                          equipment: {
                            ...b.data.equipment,
                            [slot]: {
                              name: "",
                              mastery: 0,
                              tier: "",
                            },
                          },
                        },
                      }
                    : b,
                ),
              };
            });
            setActiveFilter("all");
          }}
        >
          <IoClose className="h-6 w-6" />
        </button>
      </div>
      {formData?.builds?.[activeBuildIndex]?.data?.equipment[slot].name && (
        <>
          <hr className="border-neutral-700" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2 className="text-lg">Details</h2>
              <div className="flex justify-center rounded bg-neutral-800 p-2">
                <p className="text-sm">
                  WIP - All build features are not complete and may not reflect
                  the stats in-game.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2 className="text-lg">Skills</h2>
              <div className="grid grid-cols-2 gap-2">
                {slot === "weapon" ? (
                  <>
                    <div className="flex flex-col">
                      <h3>Basic Attacks</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillData?.basic_attacks.map((skill, i) => {
                          return (
                            <button
                              key={i}
                              onClick={() => {
                                let newSkill = skill.name;
                                if (
                                  newSkill ===
                                  formData?.builds?.[activeBuildIndex]?.data
                                    ?.skills?.basic
                                )
                                  newSkill = "";
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
                                              skills: {
                                                ...b.data.skills,
                                                basic: newSkill,
                                              },
                                            },
                                          }
                                        : b,
                                    ),
                                  };
                                });
                              }}
                              className={clsx(
                                "flex h-12 w-12 cursor-pointer flex-col items-center justify-center overflow-hidden rounded bg-neutral-800 shadow-sm shadow-black",
                                skill.name ===
                                  formData?.builds?.[activeBuildIndex]?.data
                                    ?.skills?.basic
                                  ? clsx(rarityBorderColor, "border-2")
                                  : "border border-neutral-600",
                              )}
                            >
                              {skill.image ? (
                                <ImageHelper
                                  src={skill.image}
                                  width={256}
                                  height={256}
                                  alt={skill.name}
                                />
                              ) : null}
                            </button>
                          );
                        })}
                        {formData?.builds?.[activeBuildIndex]?.data?.skills
                          ?.basic ? (
                          <div className="flex grow items-center justify-center rounded bg-neutral-800 p-2">
                            <p className="text-sm wrap-anywhere">
                              {
                                formData.builds?.[activeBuildIndex].data.skills
                                  .basic
                              }
                            </p>
                          </div>
                        ) : null}
                      </div>
                      {formData?.builds?.[activeBuildIndex]?.data?.skills
                        ?.basic ? (
                        <div className="mt-1 grow rounded bg-neutral-800 p-2">
                          <SkillDescriptionParser
                            description={
                              skillData?.basic_attacks.find(
                                (skill) =>
                                  formData?.builds?.[activeBuildIndex]?.data
                                    ?.skills?.basic === skill.name,
                              )?.description ?? "No description available."
                            }
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col">
                      <h3>Skill 1</h3>
                      <div className="flex flex-wrap gap-2">
                        {skillData?.common_skills.map((skill, i) => {
                          return (
                            <button
                              key={i}
                              onClick={() => {
                                let newSkill = skill.name;
                                if (
                                  newSkill ===
                                  formData?.builds?.[activeBuildIndex]?.data
                                    ?.skills?.common
                                )
                                  newSkill = "";
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
                                              skills: {
                                                ...b.data.skills,
                                                common: newSkill,
                                              },
                                            },
                                          }
                                        : b,
                                    ),
                                  };
                                });
                              }}
                              className={clsx(
                                "flex h-12 w-12 cursor-pointer flex-col items-center justify-center overflow-hidden rounded bg-neutral-800 shadow-sm shadow-black",
                                skill.name ===
                                  formData?.builds?.[activeBuildIndex]?.data
                                    ?.skills?.common
                                  ? clsx(rarityBorderColor, "border-2")
                                  : "border border-neutral-600",
                              )}
                            >
                              {skill.image ? (
                                <ImageHelper
                                  src={skill.image}
                                  width={256}
                                  height={256}
                                  alt={skill.name}
                                />
                              ) : null}
                            </button>
                          );
                        })}
                        {formData?.builds?.[activeBuildIndex]?.data?.skills
                          ?.common ? (
                          <div className="flex grow items-center justify-center rounded bg-neutral-800 p-2">
                            <p className="text-sm wrap-anywhere">
                              {
                                formData.builds?.[activeBuildIndex].data.skills
                                  .common
                              }
                            </p>
                          </div>
                        ) : null}
                      </div>
                      {formData?.builds?.[activeBuildIndex]?.data?.skills
                        ?.common ? (
                        <div className="mt-1 grow rounded bg-neutral-800 p-2">
                          <SkillDescriptionParser
                            description={
                              skillData?.common_skills.find(
                                (skill) =>
                                  formData?.builds?.[activeBuildIndex]?.data
                                    ?.skills?.common === skill.name,
                              )?.description ?? "No description available."
                            }
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col">
                      <h3>Skill 2 (Weapon Skill)</h3>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded border border-neutral-600 bg-neutral-800 shadow-sm shadow-black">
                          {equipmentData?.core_skill.image ? (
                            <ImageHelper
                              src={equipmentData.core_skill.image}
                              width={256}
                              height={256}
                              alt={equipmentData.core_skill.name}
                            />
                          ) : null}
                        </div>
                        <div className="flex grow items-center justify-center rounded bg-neutral-800 p-2">
                          <p className="text-sm wrap-anywhere">
                            {equipmentData?.core_skill.name}
                          </p>
                        </div>
                      </div>
                      <div className="mt-1 grow rounded bg-neutral-800 p-2">
                        <SkillDescriptionParser
                          description={
                            equipmentData?.core_skill.description ??
                            "No description available."
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <h3>Passive Skill</h3>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded border border-neutral-600 bg-neutral-800 shadow-sm shadow-black">
                          {skillData?.passive_skill.image ? (
                            <ImageHelper
                              src={skillData.passive_skill.image}
                              width={256}
                              height={256}
                              alt={skillData.passive_skill.name}
                            />
                          ) : null}
                        </div>
                        <div className="flex grow items-center justify-center rounded bg-neutral-800 p-2">
                          <p className="text-sm wrap-anywhere">
                            {skillData?.passive_skill.name}
                          </p>
                        </div>
                      </div>
                      <div className="mt-1 grow rounded bg-neutral-800 p-2">
                        <SkillDescriptionParser
                          description={
                            skillData
                              ? skillData.passive_skill.description
                              : "No description available."
                          }
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col">
                    <h3>
                      {slot.charAt(0).toUpperCase() + slot.slice(1)} Skill
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded border border-neutral-600 bg-neutral-800 shadow-sm shadow-black">
                        {equipmentData?.core_skill.image ? (
                          <ImageHelper
                            src={equipmentData.core_skill.image}
                            width={256}
                            height={256}
                            alt={equipmentData.core_skill.name}
                          />
                        ) : null}
                      </div>
                      <div className="flex grow items-center justify-center rounded bg-neutral-800 p-2">
                        <p className="text-sm wrap-anywhere">
                          {equipmentData?.core_skill.name}
                        </p>
                      </div>
                    </div>
                    <div className="mt-1 grow rounded bg-neutral-800 p-2">
                      <SkillDescriptionParser
                        description={
                          equipmentData?.core_skill.description != ""
                            ? equipmentData!.core_skill.description
                            : "No description available."
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
            <h2 className="text-lg">Mastery</h2>
            <div className="flex flex-wrap gap-2">
              {MASTERY_OPTIONS.map((option) => (
                <button
                  key={option}
                  aria-label={"Set mastery level to " + option}
                  className={clsx(
                    "flex h-12 w-12 cursor-pointer items-center justify-center rounded p-2",
                    (formData?.builds?.[activeBuildIndex]?.data?.equipment[slot]
                      .mastery ?? 0) === Number(option)
                      ? rarityHighlight
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
                                  equipment: {
                                    ...b.data.equipment,
                                    [slot]: {
                                      ...b.data.equipment[slot],
                                      mastery: Number(option),
                                    },
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
              <input
                type="number"
                placeholder="Custom"
                ref={custom_mastery_equipment}
                className={clsx(
                  "flex h-12 grow rounded text-center outline-none",
                  MASTERY_OPTIONS.find(
                    (option) =>
                      Number(option) ===
                      formData?.builds?.[activeBuildIndex]?.data?.equipment[
                        slot
                      ].mastery,
                  )
                    ? "bg-neutral-800"
                    : rarityHighlight,
                )}
                max={50}
                min={0}
                value={
                  MASTERY_OPTIONS.find(
                    (option) =>
                      Number(option) ===
                      formData?.builds?.[activeBuildIndex]?.data?.equipment[
                        slot
                      ].mastery,
                  )
                    ? ""
                    : formData?.builds?.[activeBuildIndex]?.data?.equipment[
                        slot
                      ].mastery
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
                                  equipment: {
                                    ...b.data.equipment,
                                    [slot]: {
                                      ...b.data.equipment[slot],
                                      mastery: 0,
                                    },
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
                                equipment: {
                                  ...b.data.equipment,
                                  [slot]: {
                                    ...b.data.equipment[slot],
                                    mastery: Number(e.target.value),
                                  },
                                },
                              },
                            }
                          : b,
                      ),
                    };
                  });
                }}
              />
              <button
                aria-label="Clear mastery level"
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded bg-neutral-800 transition-all hover:text-red-500 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={
                  (formData?.builds?.[activeBuildIndex]?.data?.equipment[slot]
                    .mastery ?? 0) === 0
                }
                onClick={() => {
                  if (custom_mastery_equipment.current) {
                    custom_mastery_equipment.current.value = "";
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
                                equipment: {
                                  ...b.data.equipment,
                                  [slot]: {
                                    ...b.data.equipment[slot],
                                    mastery: 0,
                                  },
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
          <div className="flex w-full flex-col gap-2">
            <div className="flex grow flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2 className="text-lg">Tier</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {TIER_LEVELS.map((tier) => (
                  <button
                    key={tier}
                    aria-label={"Set tier level to " + tier}
                    className={clsx(
                      "flex h-12 w-12 cursor-pointer items-center justify-center rounded p-2",
                      (formData?.builds?.[activeBuildIndex]?.data?.equipment[
                        slot
                      ].tier !== ""
                        ? formData?.builds?.[activeBuildIndex]?.data?.equipment[
                            slot
                          ].tier
                        : "I") === String(tier)
                        ? rarityHighlight
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
                                    equipment: {
                                      ...b.data.equipment,
                                      [slot]: {
                                        ...b.data.equipment[slot],
                                        tier: String(tier),
                                      },
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
            <div className="flex grow flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2 className="text-lg">Battle Infusion</h2>
              <div className="grid grid-cols-4 items-center justify-center gap-2 rounded-lg bg-neutral-800 p-2">
                <button
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Decrease battle infusion"
                >
                  <FaMinus />
                </button>
                <span className="col-span-2 text-center">
                  <span className={rarityTextColor}>+</span> 0
                </span>
                <button
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase battle infusion"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
          {equipmentData?.rarity !== "legendary" ? (
            <div className="grow rounded border-neutral-600 bg-neutral-700 p-2">
              <h2 className="text-lg">Hypercharge</h2>
            </div>
          ) : null}
          <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
            <h2 className="text-lg">Mods</h2>
            <div className="flex gap-2">
              <div className="h-12 w-12 rounded bg-neutral-800"></div>
              <select
                id="equipment-mod-select"
                aria-label="Select equipment mod"
                className="h-12 grow cursor-pointer rounded bg-neutral-800 px-2 text-lg outline-none"
                value={
                  formData?.builds[activeBuildIndex]?.data.equipment[slot].mod
                    ?.name ?? ""
                }
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
                                equipment: {
                                  ...b.data.equipment,
                                  [slot]: {
                                    ...b.data.equipment[slot],
                                    mod: {
                                      name: e.target.value,
                                    },
                                  },
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
                  Mod
                </option>
                <option value="">None</option>
                <option value="placeholder">Placeholder</option>
              </select>
              <button
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded bg-neutral-800 transition-all hover:text-red-500 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Clear mod selection"
                disabled={
                  formData?.builds[activeBuildIndex]?.data.equipment[slot].mod
                    ?.name === ""
                }
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
                                equipment: {
                                  ...b.data.equipment,
                                  [slot]: {
                                    ...b.data.equipment[slot],
                                    mod: {
                                      name: "",
                                    },
                                  },
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
          {formData?.builds[activeBuildIndex]?.data.equipment[slot].mod
            ?.name !== "" &&
            formData?.builds[activeBuildIndex]?.data.equipment[slot].mod && (
              <>
                <hr className="border-neutral-700" />
                <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
                  <h2 className="text-lg">Details</h2>
                  <div className="rounded bg-neutral-800 p-2">
                    Coming soon...
                  </div>
                </div>
              </>
            )}
        </>
      )}
    </div>
  );
};

export default Equipment;
