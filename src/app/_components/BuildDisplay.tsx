"use client";

import { FaMinus, FaPlus } from "react-icons/fa6";
import { useBuildForm } from "./buildFormContext";
import { notFound } from "next/navigation";
import { useItemData } from "~/utils";
import type data from "public/data.json";

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

  if (!character) notFound();

  const boots = formData.builds[activeBuildIndex]?.data.equipment.boots;
  const helmet = formData.builds[activeBuildIndex]?.data.equipment.helmet;
  const chest = formData.builds[activeBuildIndex]?.data.equipment.chest;
  const weapon = formData.builds[activeBuildIndex]?.data.equipment.weapon;
  const drifter = formData.builds[activeBuildIndex]?.data.drifter;

  const drifterData = useItemData(
    "drifter",
    drifter as keyof typeof data.drifter | undefined,
  );

  const weaponData = useItemData(
    "weapon",
    weapon as keyof typeof data.weapon | undefined,
  );

  const chestData = useItemData(
    "chest",
    chest as keyof typeof data.chest | undefined,
  );

  const helmetData = useItemData(
    "helmet",
    helmet as keyof typeof data.helmet | undefined,
  );

  const bootsData = useItemData(
    "boots",
    boots as keyof typeof data.boots | undefined,
  );

  return (
    <div className="flex h-fit min-w-1/3 flex-col items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 p-4">
      <div className="flex w-66 justify-center">
        <div className="relative flex gap-1 rounded-full border border-neutral-600 bg-neutral-700 p-2 shadow-lg">
          <button
            aria-label="Build 1"
            onClick={() => {
              if (activeBuildIndex != 0 && formData.builds[0]) {
                setActiveBuildIndex(0);
                setActiveSlot("weapon");
              } else if (!formData.builds[0]) {
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
                setActiveBuildIndex(0);
                setActiveSlot("weapon");
              }
            }}
            className={`h-4 w-4 cursor-pointer rounded-full hover:outline-2 hover:outline-cyan-600 ${
              formData.builds[0] ? "bg-cyan-400" : "bg-neutral-800"
            } ${!character.builds[0] && formData.builds[0] ? "animate-pulse" : ""}`}
          ></button>
          {activeBuildIndex === 0 ? (
            <div className="absolute bottom-0.5 left-[21%] h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400"></div>
          ) : (
            ""
          )}
          <button
            aria-label="Build 2"
            onClick={() => {
              if (activeBuildIndex != 1 && formData.builds[1]) {
                setActiveBuildIndex(1);
                setActiveSlot("weapon");
              } else if (!formData.builds[1] && formData.builds[0]) {
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
                setActiveBuildIndex(1);
                setActiveSlot("weapon");
              }
            }}
            className={`h-4 w-4 rounded-full ${
              formData.builds[1] ? "bg-cyan-400" : "bg-neutral-800"
            } ${!character.builds[1] && formData.builds[1] ? "animate-pulse" : ""} ${!character.builds[1] ? "animate-bounce" : ""} ${!formData.builds[0] ? "cursor-not-allowed" : "cursor-pointer hover:outline-2 hover:outline-cyan-600"}`}
          ></button>
          {activeBuildIndex === 1 ? (
            <div className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400"></div>
          ) : (
            ""
          )}
          <button
            aria-label="Build 3"
            onClick={() => {
              if (activeBuildIndex != 2 && formData.builds[2]) {
                setActiveBuildIndex(2);
                setActiveSlot("weapon");
              } else if (!formData.builds[2] && formData.builds[1]) {
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
                setActiveBuildIndex(2);
                setActiveSlot("weapon");
              }
            }}
            className={`h-4 w-4 rounded-full ${
              formData.builds[2] ? "bg-cyan-400" : "bg-neutral-800"
            } ${!character.builds[2] && formData.builds[2] ? "animate-pulse" : ""} ${(!character.builds[2] && character.builds[1]) || (formData.builds[1] && !character.builds[2]) ? "animate-bounce" : ""} ${!formData.builds[1] ? "cursor-not-allowed" : "cursor-pointer hover:outline-2 hover:outline-cyan-600"}`}
          ></button>
          {activeBuildIndex === 2 ? (
            <div className="absolute right-1/6 bottom-0.5 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400"></div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="relative bg-neutral-700">
          {formData?.builds?.some(
            (build) =>
              build.data.equipment.weapon === weapon &&
              build.id !== formData.builds[activeBuildIndex]?.id &&
              build.data.equipment.weapon !== "",
          ) ? (
            <div className="absolute top-2 right-2 z-20 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
              <span className="text-sm">!</span>
            </div>
          ) : null}
          <button
            className={`active:scale-[98%] ${weaponData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 shadow-yellow-600 hover:border-yellow-600" : `${weaponData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 shadow-blue-600 hover:border-blue-600" : `${weaponData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 shadow-green-600 hover:border-green-600" : `${weaponData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 shadow-purple-600 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-82 w-36 cursor-pointer items-center justify-center border transition-all ${activeSlot === "weapon" ? `border-2 ${weaponData?.rarity === "legendary" ? "border-yellow-600" : `${weaponData?.rarity === "epic" ? "border-purple-600" : `${weaponData?.rarity === "rare" ? "border-blue-600" : `${weaponData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
            aria-label="Weapon Slot"
            onClick={() => {
              if (activeSlot != "weapon") setActiveSlot("weapon");
              if (activeTab != "equipment") setActiveTab("equipment");
            }}
          >
            {weapon ? (
              <div className="truncate p-1 text-sm text-wrap">
                {weapon.charAt(0).toUpperCase() +
                  weapon
                    .slice(1)
                    .replace(/_/g, " ")
                    .replace(/(\s[a-z])/g, (match) => match.toUpperCase())}
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                <FaPlus />
              </div>
            )}
            <div className="absolute -left-12 h-8 w-8 rounded border border-neutral-600 bg-neutral-700 shadow-lg"></div>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative bg-neutral-700">
            {formData?.builds?.some(
              (build) =>
                build.data.equipment.helmet === helmet &&
                build.id !== formData.builds[activeBuildIndex]?.id &&
                build.data.equipment.helmet !== "",
            ) ? (
              <div className="absolute top-2 right-2 z-20 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
                <span className="text-sm">!</span>
              </div>
            ) : null}
            <button
              className={`active:scale-95 ${helmetData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 shadow-yellow-600 hover:border-yellow-600" : `${helmetData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 shadow-blue-600 hover:border-blue-600" : `${helmetData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 shadow-green-600 hover:border-green-600" : `${helmetData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 shadow-purple-600 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-26 w-28 cursor-pointer items-center justify-center border transition-all ${activeSlot === "helmet" ? `border-2 ${helmetData?.rarity === "legendary" ? "border-yellow-600" : `${helmetData?.rarity === "epic" ? "border-purple-600" : `${helmetData?.rarity === "rare" ? "border-blue-600" : `${helmetData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
              aria-label="Helmet Slot"
              onClick={() => {
                if (activeSlot != "helmet") setActiveSlot("helmet");
                if (activeTab != "equipment") setActiveTab("equipment");
              }}
            >
              {helmet ? (
                <div className="truncate p-1 text-sm text-wrap">
                  {helmet.charAt(0).toUpperCase() +
                    helmet
                      .slice(1)
                      .replace(/_/g, " ")
                      .replace(/(\s[a-z])/g, (match) => match.toUpperCase())}
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                  <FaPlus />
                </div>
              )}
              <div className="absolute -right-12 h-8 w-8 rounded border border-neutral-600 bg-neutral-700 shadow-lg"></div>
            </button>
          </div>
          <div className="relative bg-neutral-700">
            {formData?.builds?.some(
              (build) =>
                build.data.equipment.chest === chest &&
                build.id !== formData.builds[activeBuildIndex]?.id &&
                build.data.equipment.chest !== "",
            ) ? (
              <div className="absolute top-2 right-2 z-20 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
                <span className="text-sm">!</span>
              </div>
            ) : null}
            <button
              className={`active:scale-95 ${chestData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 shadow-yellow-600 hover:border-yellow-600" : `${chestData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 shadow-blue-600 hover:border-blue-600" : `${chestData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 shadow-green-600 hover:border-green-600" : `${chestData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 shadow-purple-600 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-26 w-28 cursor-pointer items-center justify-center border transition-all ${activeSlot === "chest" ? `border-2 ${chestData?.rarity === "legendary" ? "border-yellow-600" : `${chestData?.rarity === "epic" ? "border-purple-600" : `${chestData?.rarity === "rare" ? "border-blue-600" : `${chestData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
              aria-label="Chest Slot"
              onClick={() => {
                if (activeSlot != "chest") setActiveSlot("chest");
                if (activeTab != "equipment") setActiveTab("equipment");
              }}
            >
              {chest ? (
                <div className="truncate p-1 text-sm text-wrap">
                  {chest.charAt(0).toUpperCase() +
                    chest
                      .slice(1)
                      .replace(/_/g, " ")
                      .replace(/(\s[a-z])/g, (match) => match.toUpperCase())}
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                  <FaPlus />
                </div>
              )}
              <div className="absolute -right-12 h-8 w-8 rounded border border-neutral-600 bg-neutral-700 shadow-lg"></div>
            </button>
          </div>
          <div className="relative bg-neutral-700">
            {formData?.builds?.some(
              (build) =>
                build.data.equipment.boots === boots &&
                build.id !== formData.builds[activeBuildIndex]?.id &&
                build.data.equipment.boots !== "",
            ) ? (
              <div className="absolute top-2 right-2 z-20 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
                <span className="text-sm">!</span>
              </div>
            ) : null}
            <button
              className={`active:scale-95 ${bootsData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 shadow-yellow-600 hover:border-yellow-600" : `${bootsData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 shadow-blue-600 hover:border-blue-600" : `${bootsData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 shadow-green-600 hover:border-green-600" : `${bootsData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 shadow-purple-600 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-26 w-28 cursor-pointer items-center justify-center border transition-all ${activeSlot === "boots" ? `border-2 ${bootsData?.rarity === "legendary" ? "border-yellow-600" : `${bootsData?.rarity === "epic" ? "border-purple-600" : `${bootsData?.rarity === "rare" ? "border-blue-600" : `${bootsData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
              aria-label="Boots Slot"
              onClick={() => {
                if (activeSlot != "boots") setActiveSlot("boots");
                if (activeTab != "equipment") setActiveTab("equipment");
              }}
            >
              {boots ? (
                <div className="truncate p-1 text-sm text-wrap">
                  {boots.charAt(0).toUpperCase() +
                    boots
                      .slice(1)
                      .replace(/_/g, " ")
                      .replace(/(\s[a-z])/g, (match) => match.toUpperCase())}
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                  <FaPlus />
                </div>
              )}
              <div className="absolute -right-12 h-8 w-8 rounded border border-neutral-600 bg-neutral-700 shadow-lg"></div>
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        {formData?.builds?.some(
          (build) =>
            build.data.drifter === drifter &&
            build.id !== formData.builds[activeBuildIndex]?.id &&
            build.data.drifter !== "",
        ) ? (
          <div className="absolute top-2 right-2 z-20 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
            <span className="text-sm">!</span>
          </div>
        ) : null}
        <button
          className={`relative flex h-20 w-66 cursor-pointer items-center justify-center border bg-neutral-700 shadow-lg transition-all hover:border-cyan-600 active:scale-95 ${activeSlot === "drifter" ? "border-2 border-cyan-600" : "border-neutral-600"}`}
          aria-label="Drifter Slot"
          onClick={() => {
            if (activeSlot != "drifter") setActiveSlot("drifter");
            if (activeTab != "drifter") setActiveTab("drifter");
          }}
        >
          {drifter ? (
            <div className="truncate p-1 text-sm text-wrap">
              {drifter.charAt(0).toUpperCase() +
                drifter
                  .slice(1)
                  .replace(/_/g, " ")
                  .replace(/(\s[a-z])/g, (match) => match.toUpperCase())}
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
              <FaPlus />
            </div>
          )}
        </button>
      </div>
      <div className="flex h-72 w-66 flex-col divide-y divide-white/10 border border-neutral-600 bg-neutral-700 shadow-lg">
        <h2 className="w-full p-2 text-center">
          Stats <span className="text-neutral-400">(0)</span>
        </h2>
        <div className="flex w-full grow flex-col justify-evenly">
          <div className="mx-4 flex flex-col gap-1 rounded-lg bg-neutral-800 p-2 text-center shadow-lg">
            <h3 className="text-sm">
              Strength <span>({drifterData?.strBonus ?? "0.0"})</span>
            </h3>
            <div className="flex items-center justify-center gap-2">
              <button
                aria-label="Decrease Strength"
                onClick={() => {
                  setFormData((prev) => {
                    if (!prev) return prev;
                    if (
                      formData?.builds[activeBuildIndex]?.data.stats
                        .strength === 0
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
                {formData?.builds?.[activeBuildIndex]?.data?.stats?.strength}
              </p>
              <button
                aria-label="Increase Strength"
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
          <div className="mx-4 flex flex-col gap-1 rounded-lg bg-neutral-800 p-2 text-center shadow-lg">
            <h3 className="text-sm">
              Agility <span>({drifterData?.agiBonus ?? "0.0"})</span>
            </h3>
            <div className="flex items-center justify-center gap-2">
              <button
                aria-label="Decrease Agility"
                onClick={() => {
                  setFormData((prev) => {
                    if (!prev) return prev;
                    if (
                      formData?.builds[activeBuildIndex]?.data.stats.agility ===
                      0
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
                {formData?.builds?.[activeBuildIndex]?.data?.stats?.agility}
              </p>
              <button
                aria-label="Increase Agility"
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
          <div className="mx-4 flex flex-col gap-1 rounded-lg bg-neutral-800 p-2 text-center shadow-lg">
            <h3 className="text-sm">
              Intelligence <span>({drifterData?.intBonus ?? "0.0"})</span>
            </h3>
            <div className="flex items-center justify-center gap-2">
              <button
                aria-label="Decrease Intelligence"
                onClick={() => {
                  setFormData((prev) => {
                    if (!prev) return prev;
                    if (
                      formData?.builds[activeBuildIndex]?.data.stats
                        .intelligence === 0
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
                {
                  formData?.builds?.[activeBuildIndex]?.data?.stats
                    ?.intelligence
                }
              </p>
              <button
                aria-label="Increase Intelligence"
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
  );
};

export default BuildDisplay;
