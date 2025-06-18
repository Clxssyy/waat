"use client";

import { FaMinus, FaPlus } from "react-icons/fa6";
import { useBuildForm } from "./buildFormContext";
import { notFound } from "next/navigation";
import data from "public/data.json";
import ImageHelper from "./ImageHelper";
import type { ActiveBuildIndex } from "~/types";
import { useEffect, useState } from "react";

const BuildDisplay = () => {
  const {
    setFormData,
    formData,
    character,
    activeBuildIndex,
    setActiveBuildIndex,
    activeSlot,
    setActiveSlot,
    activeTab,
    setActiveTab,
  } = useBuildForm();
  const [statPoints, setStatPoints] = useState<number>(
    100 -
      ((formData.builds[activeBuildIndex]?.data.stats.agility ?? 0) +
        (formData.builds[activeBuildIndex]?.data.stats.strength ?? 0) +
        (formData.builds[activeBuildIndex]?.data.stats.intelligence ?? 0)),
  );

  useEffect(() => {
    setStatPoints(
      () =>
        100 -
        ((formData.builds[activeBuildIndex]?.data.stats.agility ?? 0) +
          (formData.builds[activeBuildIndex]?.data.stats.strength ?? 0) +
          (formData.builds[activeBuildIndex]?.data.stats.intelligence ?? 0)),
    );
  }, [formData.builds, activeBuildIndex]);

  if (!character) notFound();

  const bootsKey = formData.builds[activeBuildIndex]?.data.equipment.boots;
  const helmetKey = formData.builds[activeBuildIndex]?.data.equipment.helmet;
  const chestKey = formData.builds[activeBuildIndex]?.data.equipment.chest;
  const weaponKey = formData.builds[activeBuildIndex]?.data.equipment.weapon;
  const drifterKey = formData.builds[activeBuildIndex]?.data.drifter;

  const drifterData = data.drifters.find(
    (drifter) => drifter.name === drifterKey,
  );

  const weaponData = data.weapon.find((weapon) => weapon.name === weaponKey);

  const chestData = data.chest.find((chest) => chest.name === chestKey);

  const helmetData = data.helmet.find((helmet) => helmet.name === helmetKey);

  const bootsData = data.boots.find((boots) => boots.name === bootsKey);

  return (
    <div id="display" className="min-w-1/3">
      <div className="flex flex-col items-center gap-2 rounded border border-neutral-700 bg-neutral-800 p-2">
        <div className="relative flex gap-1 rounded-full border border-neutral-600 bg-neutral-700 p-2">
          {Array.from({ length: 3 }, (_, i) => (
            <button
              key={i}
              aria-label={`Build ${i + 1}`}
              onClick={() => {
                if (activeBuildIndex != i && formData.builds[i]) {
                  setActiveBuildIndex(i as ActiveBuildIndex);
                  setActiveSlot("weapon");
                  setActiveTab("equipment");
                } else if (!formData.builds[i]) {
                  setFormData((prev) => {
                    if (!prev) return prev;
                    return {
                      ...prev,
                      builds: [
                        ...prev.builds,
                        {
                          id: "",
                          characterId: prev.id,
                          data: {
                            equipment: {
                              helmet: "",
                              chest: "",
                              boots: "",
                              weapon: "",
                            },
                            stats: {
                              strength: 0,
                              agility: 0,
                              intelligence: 0,
                            },
                            drifter: "",
                          },
                        },
                      ],
                    };
                  });
                  setActiveBuildIndex(i as ActiveBuildIndex);
                  setActiveSlot("weapon");
                  setActiveTab("equipment");
                }
              }}
              className={`h-4 w-4 cursor-pointer rounded-full hover:outline-2 hover:outline-cyan-600 ${activeBuildIndex === i ? "outline-2 outline-cyan-600" : ""} ${
                formData.builds[i] ? "bg-cyan-400" : "bg-neutral-800"
              } ${!character.builds[i] && formData.builds[i] ? "animate-pulse" : ""}`}
            />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <div className="relative h-82 w-32">
            {formData?.builds?.some(
              (build) =>
                build.data.equipment.weapon === weaponKey &&
                build.id !== formData.builds[activeBuildIndex]?.id &&
                build.data.equipment.weapon !== "",
            ) ? (
              <div className="absolute top-2 right-2 z-20 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
                <span className="text-sm">!</span>
              </div>
            ) : null}
            <button
              className={`active:scale-[98%] ${weaponData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 hover:border-yellow-600" : `${weaponData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 hover:border-blue-600" : `${weaponData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 hover:border-green-600" : `${weaponData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-full w-full cursor-pointer items-center justify-center border transition-all ${activeSlot === "weapon" ? `border-2 ${weaponData?.rarity === "legendary" ? "border-yellow-600" : `${weaponData?.rarity === "epic" ? "border-purple-600" : `${weaponData?.rarity === "rare" ? "border-blue-600" : `${weaponData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
              aria-label="Weapon Slot"
              onClick={() => {
                if (activeSlot != "weapon") setActiveSlot("weapon");
                if (activeTab != "equipment") setActiveTab("equipment");
              }}
            >
              {weaponKey ? (
                weaponData?.image ? (
                  <ImageHelper
                    src={weaponData.image}
                    alt={weaponKey}
                    width={800}
                    height={800}
                  />
                ) : (
                  <div className="truncate p-1 text-sm text-wrap">
                    {weaponKey.charAt(0).toUpperCase() +
                      weaponKey
                        .slice(1)
                        .replace(/_/g, " ")
                        .replace(/(\s[a-z])/g, (match) => match.toUpperCase())}
                  </div>
                )
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                  <FaPlus />
                </div>
              )}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative h-26 w-26">
              {formData?.builds?.some(
                (build) =>
                  build.data.equipment.helmet === helmetKey &&
                  build.id !== formData.builds[activeBuildIndex]?.id &&
                  build.data.equipment.helmet !== "",
              ) ? (
                <div className="absolute top-2 right-2 z-20 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
                  <span className="text-sm">!</span>
                </div>
              ) : null}
              <button
                className={`active:scale-95 ${helmetData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 hover:border-yellow-600" : `${helmetData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 hover:border-blue-600" : `${helmetData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 hover:border-green-600" : `${helmetData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-full w-full cursor-pointer items-center justify-center border transition-all ${activeSlot === "helmet" ? `border-2 ${helmetData?.rarity === "legendary" ? "border-yellow-600" : `${helmetData?.rarity === "epic" ? "border-purple-600" : `${helmetData?.rarity === "rare" ? "border-blue-600" : `${helmetData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
                aria-label="Helmet Slot"
                onClick={() => {
                  if (activeSlot != "helmet") setActiveSlot("helmet");
                  if (activeTab != "equipment") setActiveTab("equipment");
                }}
              >
                {helmetKey ? (
                  helmetData?.image ? (
                    <ImageHelper
                      src={helmetData.image}
                      alt={helmetKey}
                      width={800}
                      height={800}
                    />
                  ) : (
                    <div className="truncate p-1 text-sm text-wrap">
                      {helmetKey.charAt(0).toUpperCase() +
                        helmetKey
                          .slice(1)
                          .replace(/_/g, " ")
                          .replace(/(\s[a-z])/g, (match) =>
                            match.toUpperCase(),
                          )}
                    </div>
                  )
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                    <FaPlus />
                  </div>
                )}
              </button>
            </div>
            <div className="relative h-26 w-26">
              {formData?.builds?.some(
                (build) =>
                  build.data.equipment.chest === chestKey &&
                  build.id !== formData.builds[activeBuildIndex]?.id &&
                  build.data.equipment.chest !== "",
              ) ? (
                <div className="absolute top-2 right-2 z-20 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
                  <span className="text-sm">!</span>
                </div>
              ) : null}
              <button
                className={`active:scale-95 ${chestData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 hover:border-yellow-600" : `${chestData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 hover:border-blue-600" : `${chestData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 hover:border-green-600" : `${chestData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-full w-full cursor-pointer items-center justify-center border transition-all ${activeSlot === "chest" ? `border-2 ${chestData?.rarity === "legendary" ? "border-yellow-600" : `${chestData?.rarity === "epic" ? "border-purple-600" : `${chestData?.rarity === "rare" ? "border-blue-600" : `${chestData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
                aria-label="Chest Slot"
                onClick={() => {
                  if (activeSlot != "chest") setActiveSlot("chest");
                  if (activeTab != "equipment") setActiveTab("equipment");
                }}
              >
                {chestKey ? (
                  chestData?.image ? (
                    <ImageHelper
                      src={chestData.image}
                      alt={chestKey}
                      width={800}
                      height={800}
                    />
                  ) : (
                    <div className="truncate p-1 text-sm text-wrap">
                      {chestKey.charAt(0).toUpperCase() +
                        chestKey
                          .slice(1)
                          .replace(/_/g, " ")
                          .replace(/(\s[a-z])/g, (match) =>
                            match.toUpperCase(),
                          )}
                    </div>
                  )
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                    <FaPlus />
                  </div>
                )}
              </button>
            </div>
            <div className="relative h-26 w-26">
              {formData?.builds?.some(
                (build) =>
                  build.data.equipment.boots === bootsKey &&
                  build.id !== formData.builds[activeBuildIndex]?.id &&
                  build.data.equipment.boots !== "",
              ) ? (
                <div className="absolute top-2 right-2 z-20 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
                  <span className="text-sm">!</span>
                </div>
              ) : null}
              <button
                className={`active:scale-95 ${bootsData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 hover:border-yellow-600" : `${bootsData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 hover:border-blue-600" : `${bootsData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 hover:border-green-600" : `${bootsData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-full w-full cursor-pointer items-center justify-center border transition-all ${activeSlot === "boots" ? `border-2 ${bootsData?.rarity === "legendary" ? "border-yellow-600" : `${bootsData?.rarity === "epic" ? "border-purple-600" : `${bootsData?.rarity === "rare" ? "border-blue-600" : `${bootsData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
                aria-label="Boots Slot"
                onClick={() => {
                  if (activeSlot != "boots") setActiveSlot("boots");
                  if (activeTab != "equipment") setActiveTab("equipment");
                }}
              >
                {bootsKey ? (
                  bootsData?.image ? (
                    <ImageHelper
                      src={bootsData.image}
                      alt={bootsKey}
                      width={800}
                      height={800}
                    />
                  ) : (
                    <div className="truncate p-1 text-sm text-wrap">
                      {bootsKey.charAt(0).toUpperCase() +
                        bootsKey
                          .slice(1)
                          .replace(/_/g, " ")
                          .replace(/(\s[a-z])/g, (match) =>
                            match.toUpperCase(),
                          )}
                    </div>
                  )
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                    <FaPlus />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="relative h-24 w-60">
          {formData?.builds?.some(
            (build) =>
              build.data.drifter === drifterKey &&
              build.id !== formData.builds[activeBuildIndex]?.id &&
              build.data.drifter !== "",
          ) ? (
            <div className="absolute top-2 right-2 z-20 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
              <span className="text-sm">!</span>
            </div>
          ) : null}
          <button
            className={`${drifterKey ? "bg-radial from-neutral-700 from-10% to-black/30" : ""} relative flex h-24 w-60 cursor-pointer items-center justify-center overflow-hidden border bg-neutral-700 transition-all hover:border-cyan-600 active:scale-95 ${activeSlot === "drifter" ? "border-2 border-cyan-600" : "border-neutral-600"}`}
            aria-label="Drifter Slot"
            onClick={() => {
              if (activeSlot != "drifter") setActiveSlot("drifter");
              if (activeTab != "drifter") setActiveTab("drifter");
            }}
          >
            {drifterKey ? (
              drifterData?.image ? (
                <ImageHelper
                  src={drifterData.image}
                  alt={drifterKey}
                  width={2436}
                  height={1440}
                />
              ) : (
                <div className="truncate p-1 text-sm text-wrap">
                  {drifterKey.charAt(0).toUpperCase() +
                    drifterKey
                      .slice(1)
                      .replace(/_/g, " ")
                      .replace(/(\s[a-z])/g, (match) => match.toUpperCase())}
                </div>
              )
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                <FaPlus />
              </div>
            )}
          </button>
        </div>
        <div className="flex w-60 grow flex-col gap-2 border border-neutral-600 bg-neutral-700 p-2">
          <h2 className="w-full text-center">
            Stats <span className="text-neutral-400">({statPoints})</span>
          </h2>
          <div className="flex w-full grow flex-col gap-2">
            <div className="mx-4 flex flex-col gap-1 rounded-lg bg-neutral-800 p-2 text-center">
              <h3 className="text-sm">
                Strength <span>({drifterData?.strBonus ?? "0.0"})</span>
              </h3>
              <div className="flex items-center justify-center gap-2">
                <button
                  aria-label="Decrease Strength"
                  className="cursor-pointer"
                  onClick={() => {
                    setFormData((prev) => {
                      if (!prev) return prev;
                      if (
                        (formData?.builds[activeBuildIndex]?.data.stats
                          .strength ?? 0) +
                          (drifterData?.strBase ?? 0) ===
                        (drifterData?.strBase ?? 0)
                      )
                        return prev;
                      return {
                        ...prev,
                        builds: prev.builds.map((b, idx) =>
                          idx === activeBuildIndex
                            ? {
                                ...b,
                                data: {
                                  ...b.data,
                                  stats: {
                                    ...b.data.stats,
                                    ["strength"]:
                                      (formData?.builds[activeBuildIndex]?.data
                                        .stats.strength ?? 0) - 1,
                                  },
                                },
                              }
                            : b,
                        ),
                      };
                    });
                  }}
                >
                  <FaMinus />
                </button>
                <p>
                  {(formData?.builds?.[activeBuildIndex]?.data?.stats
                    ?.strength ?? 0) + (drifterData?.strBase ?? 0)}
                </p>
                <button
                  aria-label="Increase Strength"
                  className="cursor-pointer"
                  onClick={() => {
                    setFormData((prev) => {
                      if (!prev) return prev;
                      if (statPoints === 0) return prev;
                      return {
                        ...prev,
                        builds: prev.builds.map((b, idx) =>
                          idx === activeBuildIndex
                            ? {
                                ...b,
                                data: {
                                  ...b.data,
                                  stats: {
                                    ...b.data.stats,
                                    ["strength"]:
                                      (formData?.builds[activeBuildIndex]?.data
                                        .stats.strength ?? 0) + 1,
                                  },
                                },
                              }
                            : b,
                        ),
                      };
                    });
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="mx-4 flex flex-col gap-1 rounded-lg bg-neutral-800 p-2 text-center">
              <h3 className="text-sm">
                Agility <span>({drifterData?.agiBonus ?? "0.0"})</span>
              </h3>
              <div className="flex items-center justify-center gap-2">
                <button
                  aria-label="Decrease Agility"
                  className="cursor-pointer"
                  onClick={() => {
                    setFormData((prev) => {
                      if (!prev) return prev;
                      if (
                        (formData?.builds[activeBuildIndex]?.data.stats
                          .agility ?? 0) +
                          (drifterData?.agiBase ?? 0) ===
                        (drifterData?.agiBase ?? 0)
                      )
                        return prev;
                      return {
                        ...prev,
                        builds: prev.builds.map((b, idx) =>
                          idx === activeBuildIndex
                            ? {
                                ...b,
                                data: {
                                  ...b.data,
                                  stats: {
                                    ...b.data.stats,
                                    ["agility"]:
                                      (formData?.builds[activeBuildIndex]?.data
                                        .stats.agility ?? 0) - 1,
                                  },
                                },
                              }
                            : b,
                        ),
                      };
                    });
                  }}
                >
                  <FaMinus />
                </button>
                <p>
                  {(formData?.builds?.[activeBuildIndex]?.data?.stats
                    ?.agility ?? 0) + (drifterData?.agiBase ?? 0)}
                </p>
                <button
                  aria-label="Increase Agility"
                  className="cursor-pointer"
                  onClick={() => {
                    setFormData((prev) => {
                      if (!prev) return prev;
                      if (statPoints === 0) return prev;
                      return {
                        ...prev,
                        builds: prev.builds.map((b, idx) =>
                          idx === activeBuildIndex
                            ? {
                                ...b,
                                data: {
                                  ...b.data,
                                  stats: {
                                    ...b.data.stats,
                                    ["agility"]:
                                      (formData?.builds[activeBuildIndex]?.data
                                        .stats.agility ?? 0) + 1,
                                  },
                                },
                              }
                            : b,
                        ),
                      };
                    });
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="mx-4 flex flex-col gap-1 rounded-lg bg-neutral-800 p-2 text-center">
              <h3 className="text-sm">
                Intelligence <span>({drifterData?.intBonus ?? "0.0"})</span>
              </h3>
              <div className="flex items-center justify-center gap-2">
                <button
                  aria-label="Decrease Intelligence"
                  className="cursor-pointer"
                  onClick={() => {
                    setFormData((prev) => {
                      if (!prev) return prev;
                      if (
                        (formData?.builds[activeBuildIndex]?.data.stats
                          .intelligence ?? 0) +
                          (drifterData?.intBase ?? 0) ===
                        (drifterData?.intBase ?? 0)
                      )
                        return prev;
                      return {
                        ...prev,
                        builds: prev.builds.map((b, idx) =>
                          idx === activeBuildIndex
                            ? {
                                ...b,
                                data: {
                                  ...b.data,
                                  stats: {
                                    ...b.data.stats,
                                    ["intelligence"]:
                                      (formData?.builds[activeBuildIndex]?.data
                                        .stats.intelligence ?? 0) - 1,
                                  },
                                },
                              }
                            : b,
                        ),
                      };
                    });
                  }}
                >
                  <FaMinus />
                </button>
                <p>
                  {(formData?.builds?.[activeBuildIndex]?.data?.stats
                    ?.intelligence ?? 0) + (drifterData?.intBase ?? 0)}
                </p>
                <button
                  className="cursor-pointer"
                  aria-label="Increase Intelligence"
                  onClick={() => {
                    setFormData((prev) => {
                      if (!prev) return prev;
                      if (statPoints === 0) return prev;
                      return {
                        ...prev,
                        builds: prev.builds.map((b, idx) =>
                          idx === activeBuildIndex
                            ? {
                                ...b,
                                data: {
                                  ...b.data,
                                  stats: {
                                    ...b.data.stats,
                                    ["intelligence"]:
                                      (formData?.builds[activeBuildIndex]?.data
                                        .stats.intelligence ?? 0) + 1,
                                  },
                                },
                              }
                            : b,
                        ),
                      };
                    });
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildDisplay;
