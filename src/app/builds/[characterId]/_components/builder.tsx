"use client";

import { useState } from "react";
import Comments from "./comments";
import DescriptionPage from "../description/page";
import Drifter from "./drifter";
import Equipment from "./equipment";
import data from "public/data.json";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { api } from "~/trpc/react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import type { ActiveTab, BuildNumber } from "~/app/_utils/types";
import { useBuildForm } from "./buildFormContext";

type EquipmentSlot = "helmet" | "chest" | "boots" | "weapon" | "drifter";
type RouterOutput = inferRouterOutputs<AppRouter>;
type Character = RouterOutput["character"]["getById"];

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
  const [activeBuildIndex, setActiveBuildIndex] = useState<BuildNumber>(0);
  const { formData, setFormData } = useBuildForm();

  const addBuild = api.character.addBuild.useMutation();

  return (
    <div className="flex grow">
      <div className="flex w-1/3 flex-col items-center gap-2 pt-2 pb-10">
        <div className="flex w-66 justify-center">
          <div className="flex gap-1 rounded-full bg-stone-800 p-2">
            <button
              onClick={() => {
                if (activeBuildIndex != 0 && character!.builds[0]) {
                  setActiveBuildIndex(0);
                  setActiveSlot("weapon");
                } else if (!character!.builds[0] && isCreator) {
                  addBuild.mutate(
                    { characterId: character!.id },
                    {
                      onSuccess: async () => {
                        setActiveBuildIndex(0);
                        setActiveSlot("weapon");
                      },
                    },
                  );
                }
              }}
              className={`relative h-4 w-4 cursor-pointer rounded-full hover:outline-2 hover:outline-cyan-600 ${
                character!.builds[0] ? "bg-cyan-400" : "bg-white/10"
              }`}
            >
              {activeBuildIndex === 0 ? (
                <div className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-600"></div>
              ) : (
                ""
              )}
            </button>
            <button
              onClick={() => {
                if (activeBuildIndex != 1 && character!.builds[1]) {
                  setActiveBuildIndex(1);
                  setActiveSlot("weapon");
                } else if (!character!.builds[1] && isCreator) {
                  addBuild.mutate(
                    { characterId: character!.id },
                    {
                      onSuccess: async () => {
                        setActiveBuildIndex(1);
                        setActiveSlot("weapon");
                      },
                    },
                  );
                }
              }}
              className={`relative h-4 w-4 cursor-pointer rounded-full hover:outline-2 hover:outline-cyan-600 ${
                character!.builds[1] ? "bg-cyan-400" : "bg-white/10"
              } `}
            >
              {activeBuildIndex === 1 ? (
                <div className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-600"></div>
              ) : (
                ""
              )}
            </button>
            <button
              onClick={() => {
                if (activeBuildIndex != 2 && character!.builds[2]) {
                  setActiveBuildIndex(2);
                  setActiveSlot("weapon");
                } else if (!character!.builds[2] && isCreator) {
                  addBuild.mutate(
                    { characterId: character!.id },
                    {
                      onSuccess: async () => {
                        setActiveBuildIndex(2);
                        setActiveSlot("weapon");
                      },
                    },
                  );
                }
              }}
              className={`relative h-4 w-4 cursor-pointer rounded-full hover:outline-2 hover:outline-cyan-600 ${
                character!.builds[2] ? "bg-cyan-400" : "bg-white/10"
              } ${activeBuildIndex === 2 ? "outline-1 outline-cyan-600" : ""}`}
            >
              {activeBuildIndex === 2 ? (
                <div className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-600"></div>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={`relative flex h-82 w-36 cursor-pointer items-center justify-center bg-stone-800 hover:outline-2 hover:outline-cyan-600 ${activeSlot === "weapon" ? "outline-1 outline-cyan-600" : ""}`}
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
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-stone-500">
                <FaPlus />
              </div>
            )}
            <div className="absolute -left-12 h-8 w-8 rounded bg-stone-800"></div>
          </button>
          <div className="flex flex-col gap-2">
            <button
              className={`relative flex h-26 w-28 cursor-pointer items-center justify-center bg-stone-800 hover:outline-2 hover:outline-cyan-600 ${activeSlot === "helmet" ? "outline-1 outline-cyan-600" : ""}`}
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-stone-500">
                  <FaPlus />
                </div>
              )}
              <div className="absolute -right-12 h-8 w-8 rounded bg-stone-800"></div>
            </button>
            <button
              className={`relative flex h-26 w-28 cursor-pointer items-center justify-center bg-stone-800 hover:outline-2 hover:outline-cyan-600 ${activeSlot === "chest" ? "outline-1 outline-cyan-600" : ""}`}
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-stone-500">
                  <FaPlus />
                </div>
              )}
              <div className="absolute -right-12 h-8 w-8 rounded bg-stone-800"></div>
            </button>
            <button
              className={`relative flex h-26 w-28 cursor-pointer items-center justify-center bg-stone-800 hover:outline-2 hover:outline-cyan-600 ${activeSlot === "boots" ? "outline-1 outline-cyan-600" : ""}`}
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-stone-500">
                  <FaPlus />
                </div>
              )}
              <div className="absolute -right-12 h-8 w-8 rounded bg-stone-800"></div>
            </button>
          </div>
        </div>
        <button
          className={`relative flex h-20 w-66 cursor-pointer items-center justify-center bg-stone-800 hover:outline-2 hover:outline-cyan-600 ${activeSlot === "drifter" ? "outline-1 outline-cyan-600" : ""}`}
          onClick={() => {
            if (activeSlot != "drifter") setActiveSlot("drifter");
            if (activeTab != "drifter") setActiveTab("drifter");
          }}
        >
          {formData?.builds?.[activeBuildIndex]?.data?.drifter ? (
            <div>{formData?.builds?.[activeBuildIndex]?.data?.drifter}</div>
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-stone-500">
              <FaPlus />
            </div>
          )}
        </button>
        <div className="flex w-66 grow flex-col divide-y divide-white/10 bg-stone-800">
          <h2 className="w-full p-2 text-center">Stats</h2>
          <div className="flex w-full grow flex-col justify-evenly">
            <div className="flex w-full flex-col gap-1 text-center">
              <h3 className="text-sm">
                Strength <span>(0.0)</span>
              </h3>
              <div className="flex items-center justify-center gap-2">
                <FaMinus />
                <p>000</p>
                <FaPlus />
              </div>
            </div>
            <div className="flex w-full flex-col gap-1 text-center">
              <h3 className="text-sm">
                Agility <span>(0.0)</span>
              </h3>
              <div className="flex items-center justify-center gap-2">
                <FaMinus />
                <p>000</p>
                <FaPlus />
              </div>
            </div>
            <div className="flex w-full flex-col gap-1 text-center">
              <h3 className="text-sm">
                Intelligence <span>(0.0)</span>
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
      <div className="flex grow items-center justify-center">
        <div className="flex h-5/6 w-11/12 flex-col items-center">
          <div className="grid h-8 w-11/12 grid-cols-4 gap-2">
            <div
              className={`flex items-center justify-center rounded-t-lg ${activeTab === "equipment" ? "scale-105 bg-stone-800" : "bg-stone-900"}`}
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
              className={`flex items-center justify-center rounded-t-lg ${activeTab === "drifter" ? "scale-105 bg-stone-800" : "bg-stone-900"}`}
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
              className={`flex items-center justify-center rounded-t-lg ${activeTab === "description" ? "scale-105 bg-stone-800" : "bg-stone-900"}`}
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
              className={`flex items-center justify-center rounded-t-lg ${activeTab === "comments" ? "scale-105 bg-stone-800" : "bg-stone-900"}`}
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
          <div className="relative flex w-full flex-col rounded bg-stone-800">
            {activeTab === "equipment" && (
              <Equipment
                props={{ slot: activeSlot, buildNumber: activeBuildIndex }}
              />
            )}
            {activeTab === "drifter" && (
              <Drifter props={{ buildNumber: activeBuildIndex }} />
            )}
            {activeTab === "description" && <DescriptionPage />}
            {activeTab === "comments" && <Comments />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
