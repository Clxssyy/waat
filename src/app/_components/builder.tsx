"use client";

import { useCallback, useEffect, useState } from "react";
import Comments from "./comments";
import Drifter from "./drifter";
import Equipment from "./equipment";
import data from "public/data.json";
import { FaMinus, FaPlus } from "react-icons/fa6";
import type { ActiveTab, ActiveBuildIndex, ActiveSlots } from "~/types";
import { useBuildForm } from "./buildFormContext";
import Support from "./support";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Description from "../characters/[characterId]/description/page";

type Character = inferRouterOutputs<AppRouter>["character"]["getById"];

const Builder = ({ character }: { character: Character }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<ActiveTab>("equipment");
  const [activeSlot, setActiveSlot] = useState<ActiveSlots>("weapon");
  const { formData, setFormData } = useBuildForm();

  const _ = formData.builds.findIndex((build) => {
    return build.id === searchParams.get("build");
  });

  const buildIndex = _ === -1 ? 0 : _;

  const [activeBuildIndex, setActiveBuildIndex] = useState<ActiveBuildIndex>(
    buildIndex as ActiveBuildIndex,
  );

  const router = useRouter();

  const updateParams = useCallback(() => {
    const p = new URLSearchParams(searchParams.toString());
    if (formData?.builds[activeBuildIndex]?.id)
      p.set("build", formData?.builds[activeBuildIndex]?.id);
    else p.delete("build");

    router.replace(`${pathname}?${p.toString()}`);
  }, [router, activeBuildIndex, formData, searchParams, character, pathname]);

  useEffect(updateParams, [updateParams]);

  let drifterData;
  if (formData?.builds[activeBuildIndex]?.data.drifter) {
    const drifterKey = formData.builds[activeBuildIndex]?.data.drifter;
    drifterData =
      drifterKey && drifterKey in data.drifter
        ? data.drifter[drifterKey as keyof typeof data.drifter]
        : undefined;
  }

  let weaponData;
  if (formData?.builds[activeBuildIndex]?.data.equipment) {
    const weaponKey = formData.builds[activeBuildIndex]?.data.equipment.weapon;
    weaponData =
      weaponKey && weaponKey in data.weapon
        ? data.weapon[weaponKey as keyof typeof data.weapon]
        : undefined;
  }

  let chestData;
  if (formData?.builds[activeBuildIndex]?.data.equipment) {
    const chestKey = formData.builds[activeBuildIndex]?.data.equipment.chest;
    chestData =
      chestKey && chestKey in data.chest
        ? data.chest[chestKey as keyof typeof data.chest]
        : undefined;
  }

  let helmetData;
  if (formData?.builds[activeBuildIndex]?.data.equipment) {
    const helmetKey = formData.builds[activeBuildIndex]?.data.equipment.helmet;
    helmetData =
      helmetKey && helmetKey in data.helmet
        ? data.helmet[helmetKey as keyof typeof data.helmet]
        : undefined;
  }

  let bootData;
  if (formData?.builds[activeBuildIndex]?.data.equipment) {
    const bootsKey = formData.builds[activeBuildIndex]?.data.equipment.boots;
    bootData =
      bootsKey && bootsKey in data.boots
        ? data.boots[bootsKey as keyof typeof data.boots]
        : undefined;
  }

  if (!character) {
    return <div>Character not found.</div>;
  }

  return (
    <div className="mx-14 flex grow gap-14">
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
          <button
            className={`active:scale-[98%] ${weaponData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 shadow-yellow-600 hover:border-yellow-600" : `${weaponData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 shadow-blue-600 hover:border-blue-600" : `${weaponData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 shadow-green-600 hover:border-green-600" : `${weaponData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 shadow-purple-600 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-82 w-36 cursor-pointer items-center justify-center border transition-all ${activeSlot === "weapon" ? `border-2 ${weaponData?.rarity === "legendary" ? "border-yellow-600" : `${weaponData?.rarity === "epic" ? "border-purple-600" : `${weaponData?.rarity === "rare" ? "border-blue-600" : `${weaponData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
            aria-label="Weapon Slot"
            onClick={() => {
              if (activeSlot != "weapon") setActiveSlot("weapon");
              if (activeTab != "equipment") setActiveTab("equipment");
            }}
          >
            {formData?.builds?.[activeBuildIndex]?.data?.equipment.weapon ? (
              <div className="truncate p-1 text-sm">
                {formData?.builds?.[activeBuildIndex]?.data?.equipment.weapon}
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                <FaPlus />
              </div>
            )}
            <div className="absolute -left-12 h-8 w-8 rounded border border-neutral-600 bg-neutral-700 shadow-lg"></div>
          </button>
          <div className="flex flex-col gap-2">
            <button
              className={`active:scale-95 ${helmetData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 shadow-yellow-600 hover:border-yellow-600" : `${helmetData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 shadow-blue-600 hover:border-blue-600" : `${helmetData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 shadow-green-600 hover:border-green-600" : `${helmetData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 shadow-purple-600 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-26 w-28 cursor-pointer items-center justify-center border transition-all ${activeSlot === "helmet" ? `border-2 ${helmetData?.rarity === "legendary" ? "border-yellow-600" : `${helmetData?.rarity === "epic" ? "border-purple-600" : `${helmetData?.rarity === "rare" ? "border-blue-600" : `${helmetData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
              aria-label="Helmet Slot"
              onClick={() => {
                if (activeSlot != "helmet") setActiveSlot("helmet");
                if (activeTab != "equipment") setActiveTab("equipment");
              }}
            >
              {formData?.builds?.[activeBuildIndex]?.data?.equipment.helmet ? (
                <div className="truncate p-1 text-sm">
                  {formData?.builds?.[activeBuildIndex]?.data?.equipment.helmet}
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                  <FaPlus />
                </div>
              )}
              <div className="absolute -right-12 h-8 w-8 rounded border border-neutral-600 bg-neutral-700 shadow-lg"></div>
            </button>
            <button
              className={`active:scale-95 ${chestData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 shadow-yellow-600 hover:border-yellow-600" : `${chestData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 shadow-blue-600 hover:border-blue-600" : `${chestData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 shadow-green-600 hover:border-green-600" : `${chestData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 shadow-purple-600 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-26 w-28 cursor-pointer items-center justify-center border transition-all ${activeSlot === "chest" ? `border-2 ${chestData?.rarity === "legendary" ? "border-yellow-600" : `${chestData?.rarity === "epic" ? "border-purple-600" : `${chestData?.rarity === "rare" ? "border-blue-600" : `${chestData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
              aria-label="Chest Slot"
              onClick={() => {
                if (activeSlot != "chest") setActiveSlot("chest");
                if (activeTab != "equipment") setActiveTab("equipment");
              }}
            >
              {formData?.builds?.[activeBuildIndex]?.data?.equipment.chest ? (
                <div className="truncate p-1 text-sm">
                  {formData?.builds?.[activeBuildIndex]?.data?.equipment.chest}
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                  <FaPlus />
                </div>
              )}
              <div className="absolute -right-12 h-8 w-8 rounded border border-neutral-600 bg-neutral-700 shadow-lg"></div>
            </button>
            <button
              className={`active:scale-95 ${bootData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 shadow-yellow-600 hover:border-yellow-600" : `${bootData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 shadow-blue-600 hover:border-blue-600" : `${bootData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 shadow-green-600 hover:border-green-600" : `${bootData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 shadow-purple-600 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-26 w-28 cursor-pointer items-center justify-center border transition-all ${activeSlot === "boots" ? `border-2 ${bootData?.rarity === "legendary" ? "border-yellow-600" : `${bootData?.rarity === "epic" ? "border-purple-600" : `${bootData?.rarity === "rare" ? "border-blue-600" : `${bootData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
              aria-label="Boots Slot"
              onClick={() => {
                if (activeSlot != "boots") setActiveSlot("boots");
                if (activeTab != "equipment") setActiveTab("equipment");
              }}
            >
              {formData?.builds?.[activeBuildIndex]?.data?.equipment.boots ? (
                <div className="truncate p-1 text-sm">
                  {formData?.builds?.[activeBuildIndex]?.data?.equipment.boots}
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
        <button
          className={`relative flex h-20 w-66 cursor-pointer items-center justify-center border bg-neutral-700 shadow-lg transition-all hover:border-cyan-600 active:scale-95 ${activeSlot === "drifter" ? "border-2 border-cyan-600" : "border-neutral-600"}`}
          aria-label="Drifter Slot"
          onClick={() => {
            if (activeSlot != "drifter") setActiveSlot("drifter");
            if (activeTab != "drifter") setActiveTab("drifter");
          }}
        >
          {formData?.builds?.[activeBuildIndex]?.data?.drifter ? (
            <div className="truncate p-1 text-sm">
              {formData?.builds?.[activeBuildIndex]?.data?.drifter}
            </div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
              <FaPlus />
            </div>
          )}
        </button>
        <div className="flex h-76 w-66 flex-col divide-y divide-white/10 border border-neutral-600 bg-neutral-700 shadow-lg">
          <h2 className="w-full p-2 text-center">Stats</h2>
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
                        formData?.builds[activeBuildIndex]?.data.stats
                          .agility === 0
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
      <div className="mb-4 flex grow">
        <div className="flex grow flex-col items-center">
          <div className="grid h-8 w-11/12 grid-cols-5 gap-2">
            <div
              className={`flex items-center justify-center rounded-t-lg ${activeTab === "equipment" ? "scale-105 border border-b-0 border-neutral-700 bg-neutral-800" : "bg-neutral-900"}`}
            >
              <button
                className="h-full w-full cursor-pointer rounded-t-lg hover:bg-white/5"
                aria-label="Equipment Tab"
                onClick={() => {
                  if (activeTab != "equipment") setActiveTab("equipment");
                  if (activeSlot === "drifter" || activeSlot === undefined)
                    setActiveSlot("weapon");
                }}
              >
                Equipment
              </button>
            </div>
            <div
              className={`flex items-center justify-center rounded-t-lg ${activeTab === "drifter" ? "scale-105 border border-b-0 border-neutral-700 bg-neutral-800" : "bg-neutral-900"}`}
            >
              <button
                className="h-full w-full cursor-pointer rounded-t-lg hover:bg-white/5"
                aria-label="Drifter Tab"
                onClick={() => {
                  if (activeTab != "drifter") setActiveTab("drifter");
                  if (activeSlot != "drifter") setActiveSlot("drifter");
                }}
              >
                Drifter
              </button>
            </div>
            <div
              className={`flex items-center justify-center rounded-t-lg ${activeTab === "support" ? "scale-105 border border-b-0 border-neutral-700 bg-neutral-800" : "bg-neutral-900"}`}
            >
              <button
                className="h-full w-full cursor-pointer rounded-t-lg hover:bg-white/5"
                aria-label="Support Tab"
                onClick={() => {
                  if (activeTab != "support") setActiveTab("support");
                }}
              >
                Support
              </button>
            </div>
            <div
              className={`flex items-center justify-center rounded-t-lg ${activeTab === "description" ? "scale-105 border border-b-0 border-neutral-700 bg-neutral-800" : "bg-neutral-900"}`}
            >
              <button
                className="h-full w-full cursor-pointer rounded-t-lg hover:bg-white/5"
                aria-label="Description Tab"
                onClick={() => {
                  if (activeTab != "description") setActiveTab("description");
                }}
              >
                Description
              </button>
            </div>
            <div
              className={`flex items-center justify-center rounded-t-lg ${activeTab === "comments" ? "scale-105 border border-b-0 border-neutral-700 bg-neutral-800" : "bg-neutral-900"}`}
            >
              <button
                className="h-full w-full cursor-pointer rounded-t-lg hover:bg-white/5"
                aria-label="Comments Tab"
                onClick={() => {
                  if (activeTab != "comments") setActiveTab("comments");
                }}
              >
                Comments
              </button>
            </div>
          </div>
          <div className="flex w-full flex-col rounded border border-neutral-700 bg-neutral-800">
            {activeTab === "equipment" && (
              <Equipment
                slot={activeSlot as Exclude<ActiveSlots, "drifter">}
                activeBuildIndex={activeBuildIndex}
              />
            )}
            {activeTab === "drifter" && (
              <Drifter activeBuildIndex={activeBuildIndex} />
            )}
            {activeTab === "support" && <Support />}
            {activeTab === "description" && <Description />}
            {activeTab === "comments" && <Comments />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
