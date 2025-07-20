"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useBuildForm } from "./buildFormContext";
import data from "public/data.json";
import { IoClose } from "react-icons/io5";
import type { ActiveFilter, SelectOptions } from "~/types";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RiResetLeftFill } from "react-icons/ri";
import { MASTERY_OPTIONS, rarityOrder, TIER_LEVELS } from "~/utils";
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
import { modSchema, skillsSchema } from "~/schemas";
import { notFound } from "next/navigation";

const Equipment = () => {
  const { characterData, setCharacterData, activeSlot, activeBuildIndex } =
    useBuildForm();
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const custom_mastery_equipment = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setActiveFilter("all");
  }, [activeSlot]);

  const filteredOptions = useMemo(
    () =>
      data[activeSlot]
        .filter((item) => item.type === activeFilter || activeFilter === "all")
        .sort((a: SelectOptions, b: SelectOptions) => {
          return (
            rarityOrder[a.rarity as keyof typeof rarityOrder] -
            rarityOrder[b.rarity as keyof typeof rarityOrder]
          );
        }),
    [activeFilter, activeSlot],
  );

  if (activeSlot === "drifters") notFound();
  if (!characterData) notFound();
  if (!characterData.builds[activeBuildIndex]) notFound();

  const equipmentData = data[activeSlot].find(
    (equipment) =>
      equipment.name ===
      characterData.builds[activeBuildIndex]?.data.equipment[activeSlot].name,
  );

  let skillData;
  if (equipmentData && "set" in equipmentData) {
    skillData = data.skills[equipmentData.set as keyof typeof data.skills];
  }

  return (
    <div className="flex flex-col gap-2 rounded p-2">
      <div className="flex flex-wrap gap-2">
        <button
          className={clsx(
            "w-12 cursor-pointer rounded border px-3 py-1 transition-all hover:brightness-110",
            activeFilter === "all"
              ? clsx(
                  equipmentData
                    ? clsx(
                        getBorderBackgroundOffsetColor(equipmentData.rarity),
                        getBackgroundColor(equipmentData.rarity),
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
                  equipmentData
                    ? clsx(
                        getBorderBackgroundOffsetColor(equipmentData.rarity),
                        getBackgroundColor(equipmentData.rarity),
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
                  equipmentData
                    ? clsx(
                        getBorderBackgroundOffsetColor(equipmentData.rarity),
                        getBackgroundColor(equipmentData.rarity),
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
                  equipmentData
                    ? clsx(
                        getBorderBackgroundOffsetColor(equipmentData.rarity),
                        getBackgroundColor(equipmentData.rarity),
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
        {activeSlot === "chest" && (
          <button
            className={clsx(
              "cursor-pointer rounded border px-3 py-1 transition-all hover:brightness-110",
              activeFilter === "logistics"
                ? clsx(
                    equipmentData
                      ? clsx(
                          getBorderBackgroundOffsetColor(equipmentData.rarity),
                          getBackgroundColor(equipmentData.rarity),
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
        )}
      </div>
      <SelectMenu
        options={filteredOptions}
        allOptions={data[activeSlot]}
        placeholder={activeSlot[0]?.toUpperCase() + activeSlot.slice(1)}
        value={
          characterData.builds[activeBuildIndex].data.equipment[activeSlot].name
        }
        onChange={(val) =>
          setCharacterData((prev) => {
            return {
              ...prev,
              builds: prev.builds.map((b, idx) =>
                idx === activeBuildIndex
                  ? activeSlot === "weapon"
                    ? {
                        ...b,
                        data: {
                          ...b.data,
                          equipment: {
                            ...b.data.equipment,
                            [activeSlot]: {
                              name: val,
                              mastery: 0,
                              tier: "I",
                              mod: modSchema.parse({}),
                            },
                          },
                          skills: skillsSchema.parse({}),
                        },
                      }
                    : {
                        ...b,
                        data: {
                          ...b.data,
                          equipment: {
                            ...b.data.equipment,
                            [activeSlot]: {
                              name: val,
                              mastery: 0,
                              tier: "I",
                              mod: modSchema.parse({}),
                            },
                          },
                        },
                      }
                  : b,
              ),
            };
          })
        }
      />
      {characterData.builds[activeBuildIndex].data.equipment[activeSlot]
        .name && (
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

              {activeSlot === "weapon" ? (
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <h3>Basic Attacks</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillData?.basic_attacks.map((skill, i) => {
                        return (
                          <button
                            key={i}
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
                                            skills: {
                                              ...b.data.skills,
                                              basic:
                                                skill.name !==
                                                characterData.builds[
                                                  activeBuildIndex
                                                ]?.data.skills.basic
                                                  ? skill.name
                                                  : "",
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
                                characterData.builds[activeBuildIndex]?.data
                                  .skills.basic
                                ? clsx(
                                    "border-2",
                                    getBorderColor(equipmentData?.rarity),
                                  )
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
                      {characterData.builds[activeBuildIndex].data.skills
                        .basic ? (
                        <div className="flex grow items-center justify-center rounded bg-neutral-800 p-2">
                          <p className="text-sm wrap-anywhere">
                            {
                              characterData.builds[activeBuildIndex].data.skills
                                .basic
                            }
                          </p>
                        </div>
                      ) : null}
                    </div>
                    {characterData.builds[activeBuildIndex].data.skills
                      .basic ? (
                      <div className="mt-1 grow rounded bg-neutral-800 p-2">
                        <SkillDescriptionParser
                          description={
                            skillData?.basic_attacks.find(
                              (skill) =>
                                characterData.builds[activeBuildIndex]?.data
                                  .skills.basic === skill.name,
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
                              setCharacterData((prev) => {
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
                                              common:
                                                skill.name !==
                                                characterData?.builds?.[
                                                  activeBuildIndex
                                                ]?.data?.skills?.common
                                                  ? skill.name
                                                  : "",
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
                                characterData.builds[activeBuildIndex]?.data
                                  .skills.common
                                ? clsx(
                                    "border-2",
                                    getBorderColor(equipmentData?.rarity),
                                  )
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
                      {characterData.builds[activeBuildIndex].data.skills
                        .common ? (
                        <div className="flex grow items-center justify-center rounded bg-neutral-800 p-2">
                          <p className="text-sm wrap-anywhere">
                            {
                              characterData.builds[activeBuildIndex].data.skills
                                .common
                            }
                          </p>
                        </div>
                      ) : null}
                    </div>
                    {characterData.builds[activeBuildIndex].data.skills
                      .common ? (
                      <div className="mt-1 grow rounded bg-neutral-800 p-2">
                        <SkillDescriptionParser
                          description={
                            skillData?.common_skills.find(
                              (skill) =>
                                characterData.builds[activeBuildIndex]?.data
                                  .skills.common === skill.name,
                            )?.description ?? "No description available."
                          }
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <h3>Skill 2 (Weapon Skill)</h3>
                    <div className="flex flex-wrap gap-2">
                      <div
                        className={clsx(
                          "flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded border-2 bg-neutral-800 shadow-sm shadow-black",
                          getBorderColor(equipmentData?.rarity),
                        )}
                      >
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
                      <div
                        className={clsx(
                          "flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded border-2 bg-neutral-800 shadow-sm shadow-black",
                          getBorderColor(equipmentData?.rarity),
                        )}
                      >
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
                          skillData?.passive_skill.description ??
                          "No description available."
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col">
                  <h3>
                    {activeSlot.charAt(0).toUpperCase() + activeSlot.slice(1)}{" "}
                    Skill
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <div
                      className={clsx(
                        "flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded border-2 bg-neutral-800 shadow-sm shadow-black",
                        getBorderColor(equipmentData?.rarity),
                      )}
                    >
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
              )}
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
                    characterData.builds[activeBuildIndex]?.data.equipment[
                      activeSlot
                    ].mastery === Number(option)
                      ? clsx(
                          getBorderBackgroundOffsetColor(equipmentData?.rarity),
                          "border hover:brightness-110",
                          getBackgroundColor(equipmentData?.rarity),
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
                                  equipment: {
                                    ...b.data.equipment,
                                    [activeSlot]: {
                                      ...b.data.equipment[activeSlot],
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
                      characterData.builds[activeBuildIndex]?.data.equipment[
                        activeSlot
                      ].mastery,
                  )
                    ? "bg-neutral-800 hover:brightness-125"
                    : clsx(
                        getBorderBackgroundOffsetColor(equipmentData?.rarity),
                        "border hover:brightness-110",
                        getBackgroundColor(equipmentData?.rarity),
                      ),
                )}
                max={50}
                min={0}
                value={
                  MASTERY_OPTIONS.find(
                    (option) =>
                      Number(option) ===
                      characterData.builds[activeBuildIndex]?.data.equipment[
                        activeSlot
                      ].mastery,
                  )
                    ? ""
                    : characterData.builds[activeBuildIndex]?.data.equipment[
                        activeSlot
                      ].mastery
                }
                onChange={(e) => {
                  if (Number(e.target.value) > 50) e.target.value = "";
                  setCharacterData((prev) => {
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
                                  [activeSlot]: {
                                    ...b.data.equipment[activeSlot],
                                    mastery:
                                      Number(e.target.value) > 50
                                        ? 0
                                        : Number(e.target.value),
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
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded bg-neutral-800 transition-all hover:text-red-500 hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={
                  characterData.builds[activeBuildIndex].data.equipment[
                    activeSlot
                  ].mastery === 0
                }
                onClick={() => {
                  if (custom_mastery_equipment.current)
                    custom_mastery_equipment.current.value = "";
                  setCharacterData((prev) => {
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
                                  [activeSlot]: {
                                    ...b.data.equipment[activeSlot],
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
          <div className="flex flex-wrap gap-2">
            <div className="flex min-w-fit grow flex-col gap-2">
              <div className="flex min-w-fit flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
                <h2 className="text-lg">Tier</h2>
                <div className="grid grid-cols-3 gap-2 md:grid-cols-6 2xl:grid-cols-12">
                  {TIER_LEVELS.map((tier) => (
                    <button
                      key={tier}
                      aria-label={"Set tier level to " + tier}
                      className={clsx(
                        "flex h-12 min-w-12 cursor-pointer items-center justify-center rounded p-2",
                        characterData.builds[activeBuildIndex]?.data.equipment[
                          activeSlot
                        ].tier === tier
                          ? clsx(
                              getBorderBackgroundOffsetColor(
                                equipmentData?.rarity,
                              ),
                              "border hover:brightness-110",
                              getBackgroundColor(equipmentData?.rarity),
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
                                      equipment: {
                                        ...b.data.equipment,
                                        [activeSlot]: {
                                          ...b.data.equipment[activeSlot],
                                          tier: tier,
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
                                    equipment: {
                                      ...b.data.equipment,
                                      [activeSlot]: {
                                        ...b.data.equipment[activeSlot],
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
                    <RiResetLeftFill />
                  </button>
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
                    <span className={getTextColor(equipmentData?.rarity)}>
                      +
                    </span>{" "}
                    0
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
              <div className="flex grow flex-col gap-2 rounded border-neutral-600 bg-neutral-700 p-2">
                <h2 className="text-lg">Hypercharge</h2>
                <div className="grow rounded bg-neutral-800"></div>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
            <h2 className="text-lg">Mods</h2>
            <SelectMenu
              options={[
                {
                  name: "Legendary Mod",
                  image: "",
                  type: "Does nothing.",
                  rarity: "legendary",
                },
                {
                  name: "Epic Mod",
                  image: "",
                  type: "Does nothing.",
                  rarity: "epic",
                },
                {
                  name: "Rare Mod",
                  image: "",
                  type: "Does nothing.",
                  rarity: "rare",
                },
              ]}
              value={
                characterData.builds[activeBuildIndex].data.equipment[
                  activeSlot
                ].mod.name
              }
              placeholder="Mods"
              onChange={(val) => {
                setCharacterData((prev) => {
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
                                [activeSlot]: {
                                  ...b.data.equipment[activeSlot],
                                  mod: {
                                    name: val,
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
              selectColor="bg-neutral-800"
            />
          </div>
          {characterData.builds[activeBuildIndex].data.equipment[activeSlot].mod
            .name && (
            <>
              <hr className="border-neutral-700" />
              <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
                <h2 className="text-lg">Details</h2>
                <div className="rounded bg-neutral-800 p-2">Coming soon...</div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Equipment;
