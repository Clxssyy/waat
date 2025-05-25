"use client";

import { useState } from "react";
import Comments from "./comments";
import DescriptionPage from "../description/page";
import Drifter from "./drifter";
import Equipment from "./equipment";
import data from "public/data.json";
import { FaMinus, FaPlus } from "react-icons/fa6";
import type {
  ActiveTab,
  ActiveBuildIndex,
  ActiveSlots,
} from "~/app/_utils/types";
import { useBuildForm } from "./buildFormContext";
import Support from "./support";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type Character = inferRouterOutputs<AppRouter>["character"]["getById"];
type EquipmentSlot = "helmet" | "chest" | "boots" | "weapon" | "drifter";

const Builder = ({
  props,
}: {
  props: {
    character: Character;
    isCreator: Boolean;
  };
}) => {
  const { character, isCreator } = props;

  if (!character) {
    return <div>Character not found.</div>;
  }

  const [activeTab, setActiveTab] = useState<ActiveTab>("equipment");
  const [activeSlot, setActiveSlot] = useState<EquipmentSlot>("weapon");
  const [activeBuildIndex, setActiveBuildIndex] = useState<ActiveBuildIndex>(0);
  const { formData, setFormData } = useBuildForm();

  let drifterData;
  if (formData.builds[activeBuildIndex]?.data.drifter) {
    drifterData = data.drifter[formData.builds[activeBuildIndex]?.data.drifter];
  }

  return (
    <div className="mx-14 flex grow gap-14">
      <div className="mb-4 flex h-fit min-w-1/3 flex-col items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 p-4">
        <div className="flex w-66 justify-center">
          <div className="relative flex gap-1 rounded-full border border-neutral-600 bg-neutral-700 p-2 shadow-lg">
            <button
              onClick={() => {
                if (activeBuildIndex != 0 && formData!.builds[0]) {
                  setActiveBuildIndex(0);
                  setActiveSlot("weapon");
                } else if (!formData!.builds[0]) {
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
                formData!.builds[0] ? "bg-cyan-400" : "bg-neutral-800"
              } ${!character.builds[0] && formData!.builds[0] ? "animate-pulse" : ""}`}
            ></button>
            {activeBuildIndex === 0 ? (
              <div className="absolute bottom-0.5 left-[21%] h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400"></div>
            ) : (
              ""
            )}
            <button
              onClick={() => {
                if (activeBuildIndex != 1 && formData!.builds[1]) {
                  setActiveBuildIndex(1);
                  setActiveSlot("weapon");
                } else if (!formData!.builds[1] && formData!.builds[0]) {
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
                formData!.builds[1] ? "bg-cyan-400" : "bg-neutral-800"
              } ${!character.builds[1] && formData!.builds[1] ? "animate-pulse" : ""} ${!character.builds[1] ? "animate-bounce" : ""} ${!formData!.builds[0] ? "cursor-not-allowed" : "cursor-pointer hover:outline-2 hover:outline-cyan-600"}`}
            ></button>
            {activeBuildIndex === 1 ? (
              <div className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400"></div>
            ) : (
              ""
            )}
            <button
              onClick={() => {
                if (activeBuildIndex != 2 && formData!.builds[2]) {
                  setActiveBuildIndex(2);
                  setActiveSlot("weapon");
                } else if (!formData!.builds[2] && formData!.builds[1]) {
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
                formData!.builds[2] ? "bg-cyan-400" : "bg-neutral-800"
              } ${!character.builds[2] && formData!.builds[2] ? "animate-pulse" : ""} ${(!character.builds[2] && character.builds[1]) || (formData.builds[1] && !character.builds[2]) ? "animate-bounce" : ""} ${!formData!.builds[1] ? "cursor-not-allowed" : "cursor-pointer hover:outline-2 hover:outline-cyan-600"}`}
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
            className={`relative flex h-82 w-36 cursor-pointer items-center justify-center border border-neutral-600 bg-neutral-700 shadow-lg hover:outline-2 hover:outline-cyan-600 ${activeSlot === "weapon" ? "outline-1 outline-cyan-600" : ""}`}
            onClick={() => {
              if (activeSlot != "weapon") setActiveSlot("weapon");
              if (activeTab != "equipment") setActiveTab("equipment");
            }}
          >
            {formData?.builds?.[activeBuildIndex]?.data?.equipment.weapon ? (
              <div>
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
              className={`relative flex h-26 w-28 cursor-pointer items-center justify-center border border-neutral-600 bg-neutral-700 shadow-lg hover:outline-2 hover:outline-cyan-600 ${activeSlot === "helmet" ? "outline-1 outline-cyan-600" : ""}`}
              onClick={() => {
                if (activeSlot != "helmet") setActiveSlot("helmet");
                if (activeTab != "equipment") setActiveTab("equipment");
              }}
            >
              {formData?.builds?.[activeBuildIndex]?.data?.equipment.helmet ? (
                <div>
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
              className={`relative flex h-26 w-28 cursor-pointer items-center justify-center border border-neutral-600 bg-neutral-700 shadow-lg hover:outline-2 hover:outline-cyan-600 ${activeSlot === "chest" ? "outline-1 outline-cyan-600" : ""}`}
              onClick={() => {
                if (activeSlot != "chest") setActiveSlot("chest");
                if (activeTab != "equipment") setActiveTab("equipment");
              }}
            >
              {formData?.builds?.[activeBuildIndex]?.data?.equipment.chest ? (
                <div>
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
              className={`relative flex h-26 w-28 cursor-pointer items-center justify-center border border-neutral-600 bg-neutral-700 shadow-lg hover:outline-2 hover:outline-cyan-600 ${activeSlot === "boots" ? "outline-1 outline-cyan-600" : ""}`}
              onClick={() => {
                if (activeSlot != "boots") setActiveSlot("boots");
                if (activeTab != "equipment") setActiveTab("equipment");
              }}
            >
              {formData?.builds?.[activeBuildIndex]?.data?.equipment.boots ? (
                <div>
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
          className={`relative flex h-20 w-66 cursor-pointer items-center justify-center border border-neutral-600 bg-neutral-700 shadow-lg hover:outline-2 hover:outline-cyan-600 ${activeSlot === "drifter" ? "outline-1 outline-cyan-600" : ""}`}
          onClick={() => {
            if (activeSlot != "drifter") setActiveSlot("drifter");
            if (activeTab != "drifter") setActiveTab("drifter");
          }}
        >
          {formData?.builds?.[activeBuildIndex]?.data?.drifter ? (
            <div>{formData?.builds?.[activeBuildIndex]?.data?.drifter}</div>
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
                <FaMinus />
                <p>000</p>
                <FaPlus />
              </div>
            </div>
            <div className="mx-4 flex flex-col gap-1 rounded-lg bg-neutral-800 p-2 text-center shadow-lg">
              <h3 className="text-sm">
                Agility <span>({drifterData?.agiBonus ?? "0.0"})</span>
              </h3>
              <div className="flex items-center justify-center gap-2">
                <FaMinus />
                <p>000</p>
                <FaPlus />
              </div>
            </div>
            <div className="mx-4 flex flex-col gap-1 rounded-lg bg-neutral-800 p-2 text-center shadow-lg">
              <h3 className="text-sm">
                Intelligence <span>({drifterData?.intBonus ?? "0.0"})</span>
              </h3>
              <div className="flex items-center justify-center gap-2">
                <FaMinus />
                <p>000</p>
                <FaPlus />
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
                props={{
                  slot: activeSlot as Exclude<ActiveSlots, "drifter">,
                  activeBuildIndex: activeBuildIndex,
                }}
              />
            )}
            {activeTab === "drifter" && (
              <Drifter props={{ buildNumber: activeBuildIndex }} />
            )}
            {activeTab === "support" && <Support />}
            {activeTab === "description" && <DescriptionPage />}
            {activeTab === "comments" && <Comments />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
