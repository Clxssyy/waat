"use client";

import { useState } from "react";
import Comments from "./comments";
import DescriptionPage from "../description/page";
import Drifter from "./drifter";
import Equipment from "./equipment";
import data from "public/data.json";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const Builder = ({
  props,
}: {
  props: {
    character: any;
    isCreator: Boolean;
  };
}) => {
  const { character, isCreator } = props;
  const [activeTab, setActiveTab] = useState<String>("equipment");
  const [activeSlot, setActiveSlot] = useState<String>("");
  const [activeBuild, setActiveBuild] = useState<number>(0);
  const [buildData, setBuildData] = useState<any>(
    character.builds[activeBuild]?.data,
  );

  const testJson = {
    drifter: "",
    weapon: "",
    helmet: "",
    chest: "",
    boots: "",
  };

  const addBuild = api.character.addBuild.useMutation();
  const getCharacter = api.character.getByBuildId.useQuery({
    buildId: character.builds[0].id,
  });
  const router = useRouter();

  return (
    <div className="flex grow">
      <div className="flex w-1/3 flex-col items-center gap-2 pt-2 pb-10">
        <div className="flex w-66 justify-center">
          <div className="flex gap-1 rounded-full bg-stone-800 p-2">
            <button
              onClick={() => {
                if (activeBuild != 0 && character.builds[0]) {
                  setActiveBuild(0);
                  setActiveSlot("weapon");
                } else if (!character.builds[0] && isCreator) {
                  addBuild.mutate(
                    { characterId: character.id },
                    {
                      onSuccess: async () => {
                        const refetchResult = await getCharacter.refetch();
                        setActiveBuild(0);
                        setActiveSlot("weapon");
                        setBuildData(refetchResult.data?.builds[0]?.data);
                        router.refresh();
                      },
                    },
                  );
                }
              }}
              className={`relative h-4 w-4 cursor-pointer rounded-full hover:outline-2 hover:outline-cyan-600 ${
                character.builds[0] ? "bg-cyan-400" : "bg-white/10"
              }`}
            >
              {activeBuild === 0 ? (
                <div className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-600"></div>
              ) : (
                ""
              )}
            </button>
            <button
              onClick={() => {
                if (activeBuild != 1 && character.builds[1]) {
                  setActiveBuild(1);
                  setActiveSlot("weapon");
                } else if (!character.builds[1] && isCreator) {
                  addBuild.mutate(
                    { characterId: character.id },
                    {
                      onSuccess: async () => {
                        const refetchResult = await getCharacter.refetch();
                        setActiveBuild(1);
                        setActiveSlot("weapon");
                        setBuildData(refetchResult.data?.builds[1]?.data);
                        router.refresh();
                      },
                    },
                  );
                }
              }}
              className={`relative h-4 w-4 cursor-pointer rounded-full hover:outline-2 hover:outline-cyan-600 ${
                character.builds[1] ? "bg-cyan-400" : "bg-white/10"
              } `}
            >
              {activeBuild === 1 ? (
                <div className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-600"></div>
              ) : (
                ""
              )}
            </button>
            <button
              onClick={() => {
                if (activeBuild != 2 && character.builds[2]) {
                  setActiveBuild(2);
                  setActiveSlot("weapon");
                } else if (!character.builds[2] && isCreator) {
                  addBuild.mutate(
                    { characterId: character.id },
                    {
                      onSuccess: async () => {
                        const refetchResult = await getCharacter.refetch();
                        setActiveBuild(2);
                        setActiveSlot("weapon");
                        setBuildData(refetchResult.data?.builds[2]?.data);
                        router.refresh();
                      },
                    },
                  );
                }
              }}
              className={`relative h-4 w-4 cursor-pointer rounded-full hover:outline-2 hover:outline-cyan-600 ${
                character.builds[2] ? "bg-cyan-400" : "bg-white/10"
              } ${activeBuild === 2 ? "outline-1 outline-cyan-600" : ""}`}
            >
              {activeBuild === 2 ? (
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
            {testJson.weapon ? (
              testJson.weapon
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
              {testJson.helmet ? (
                testJson.helmet
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
              {buildData.equipment.chest ? (
                <div>{buildData.equipment.chest}</div>
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
              {testJson.boots ? (
                testJson.boots
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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-stone-500">
            <FaPlus />
          </div>
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
                  if (activeSlot === "drifter" || activeSlot === "")
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
                  if (activeSlot != "drifter" || activeSlot === "")
                    setActiveSlot("drifter");
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
          <div className="relative flex w-full grow flex-col bg-stone-800">
            {activeTab === "equipment" && (
              <Equipment props={{ slot: activeSlot }} />
            )}
            {activeTab === "drifter" && <Drifter />}
            {activeTab === "description" && <DescriptionPage />}
            {activeTab === "comments" && <Comments />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
