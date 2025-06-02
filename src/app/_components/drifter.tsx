"use client";

import { useRef, useState } from "react";
import { useBuildForm } from "./buildFormContext";
import data from "public/data.json";
import { IoClose } from "react-icons/io5";
import type { ActiveBuildIndex, ActiveFilter } from "~/types";

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
        <div className="h-12 w-12 rounded border border-neutral-600 bg-neutral-700"></div>
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
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2>Info</h2>
              <div className="flex flex-col rounded bg-neutral-800 p-2">
                <p>Active Skill: {drifterData?.activeSkill.name}</p>
                <p>Passive Skill: {drifterData?.passiveSkill.name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2>Mastery</h2>
              <div className="flex flex-wrap gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>0</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>10</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>20</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>30</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>40</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>45</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>46</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>47</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>48</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>49</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>50</span>
                </div>
                <div className="flex h-12 grow items-center justify-center rounded bg-neutral-800 p-2 px-2 text-lg">
                  <span>Custom</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <IoClose className="h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2>Tier</h2>
              <div className="flex flex-wrap justify-evenly gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>I</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>II</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>III</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>IV</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>V</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>VI</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>VII</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>VIII</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>IX</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>X</span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded bg-neutral-800 p-2 text-lg">
                  <span>XI</span>
                </div>
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
