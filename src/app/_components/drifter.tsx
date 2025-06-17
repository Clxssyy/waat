"use client";

import { useRef, useState } from "react";
import { useBuildForm } from "./buildFormContext";
import data from "public/data.json";
import { IoClose } from "react-icons/io5";
import type { ActiveBuildIndex, ActiveFilter } from "~/types";
import { MASTERY_OPTIONS, TIER_LEVELS } from "~/utils";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ImageHelper from "./ImageHelper";

const Drifter = ({
  activeBuildIndex,
}: {
  activeBuildIndex: ActiveBuildIndex;
}) => {
  const { formData, setFormData } = useBuildForm();
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const selectInput = useRef<HTMLSelectElement>(null);

  const drifters = data.drifter;
  const filteredWeapons = Object.entries(drifters).filter(([, drifter]) => {
    if (activeFilter === "all") return true;
    if (activeFilter === drifter.type) return true;
    return false;
  });

  let drifterData;
  if (formData?.builds[activeBuildIndex]?.data.drifter) {
    const drifterKey = formData.builds[activeBuildIndex]?.data.drifter;
    drifterData =
      drifterKey && drifterKey in data.drifter
        ? data.drifter[drifterKey as keyof typeof data.drifter]
        : undefined;
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <button
          className={`cursor-pointer rounded border px-3 py-1 hover:brightness-125 ${activeFilter === "all" ? "border-neutral-600 bg-neutral-700" : "border-neutral-500 bg-neutral-600"}`}
          onClick={() => {
            setActiveFilter("all");
          }}
        >
          All
        </button>
        <button
          className={`cursor-pointer rounded border px-3 py-1 hover:brightness-125 ${activeFilter === "strength" ? "border-neutral-600 bg-neutral-700" : "border-neutral-500 bg-neutral-600"}`}
          onClick={() => {
            setActiveFilter("strength");
          }}
        >
          Strength
        </button>
        <button
          className={`cursor-pointer rounded border px-3 py-1 hover:brightness-125 ${activeFilter === "agility" ? "border-neutral-600 bg-neutral-700" : "border-neutral-500 bg-neutral-600"}`}
          onClick={() => {
            setActiveFilter("agility");
          }}
        >
          Agility
        </button>
        <button
          className={`cursor-pointer rounded border px-3 py-1 hover:brightness-125 ${activeFilter === "intelligence" ? "border-neutral-600 bg-neutral-700" : "border-neutral-500 bg-neutral-600"}`}
          onClick={() => {
            setActiveFilter("intelligence");
          }}
        >
          Intelligence
        </button>
        <button
          className={`cursor-pointer rounded border px-3 py-1 hover:brightness-125 ${activeFilter === "logistics" ? "border-neutral-600 bg-neutral-700" : "border-neutral-500 bg-neutral-600"}`}
          onClick={() => {
            setActiveFilter("logistics");
          }}
        >
          Logistics
        </button>
      </div>
      <div className="flex gap-2">
        <div
          className={`flex h-12 w-12 items-center rounded border border-neutral-600 ${formData?.builds[activeBuildIndex]?.data.drifter ? "bg-radial from-neutral-700 from-10% to-black/30" : "bg-neutral-700"}`}
        >
          {drifterData?.image ? (
            <ImageHelper
              src={drifterData.image}
              alt={formData?.builds?.[activeBuildIndex]?.data?.drifter ?? ""}
              width={2436}
              height={1440}
            />
          ) : null}
        </div>
        <div className="h-12 grow rounded bg-neutral-700">
          <select
            className="h-full w-full rounded border border-neutral-600 bg-neutral-700 px-2 text-lg"
            id={"drifter"}
            name={"drifter"}
            ref={selectInput}
            value={formData?.builds?.[activeBuildIndex]?.data?.drifter}
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
                            drifter: e.target.value,
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
            {filteredWeapons.map(([drifterKey]) => (
              <option
                key={drifterKey}
                value={drifterKey}
                className={`${
                  formData?.builds?.some(
                    (build) =>
                      build.data.drifter === drifterKey &&
                      build.id !== formData.builds[activeBuildIndex]?.id,
                  )
                    ? "text-neutral-500"
                    : "text-white"
                }`}
              >
                {drifterKey.charAt(0).toUpperCase() +
                  drifterKey
                    .slice(1)
                    .replace(/_/g, " ")
                    .replace(/(\s[a-z])/g, (match) => match.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
        <button
          className={`flex h-12 w-12 items-center justify-center rounded border border-neutral-600 bg-neutral-700 hover:text-red-500 hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-40`}
          disabled={!formData?.builds?.[activeBuildIndex]?.data?.drifter}
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
                          drifter: "",
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
      {formData?.builds?.[activeBuildIndex]?.data?.drifter && (
        <>
          <hr className="border-neutral-700" />
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="flex flex-1 flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
                <h2 className="text-lg">Details</h2>
                <div className="flex grow items-center justify-center rounded bg-neutral-800 p-2">
                  <p className="text-center text-sm">
                    WIP - All build features are not complete and will not
                    reflect the stats in-game.
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
                <h2 className="text-lg">Skills</h2>
                <div className="flex flex-col">
                  <h3 className="text-sm">Active Skill</h3>
                  <div className="flex gap-2">
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
                    <div className="flex items-center rounded bg-neutral-800 p-2">
                      <p className="text-sm">{drifterData?.activeSkill.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm">Passive Skill</h3>
                  <div className="flex gap-2">
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
                    <div className="flex items-center rounded bg-neutral-800 p-2">
                      <p className="text-sm">
                        {drifterData?.passiveSkill.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2>Mastery</h2>
              <div className="flex flex-wrap gap-2">
                {MASTERY_OPTIONS.map((option) => (
                  <div
                    key={option}
                    className={
                      "flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg"
                    }
                  >
                    <span>{option}</span>
                  </div>
                ))}
                <div className="flex h-12 grow items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  Custom
                </div>
                <button
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded bg-neutral-800 hover:text-red-500"
                  disabled
                >
                  <IoClose className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2>Tier</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {TIER_LEVELS.map((tier) => (
                  <div
                    key={tier}
                    className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg"
                  >
                    <span>{tier}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2>Battle Infusion</h2>
              <div className="flex items-center justify-center gap-2">
                <button>
                  <FaMinus />
                </button>
                <p>0</p>
                <button>
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2>Support Bonuses</h2>
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
