"use client";

import { useEffect, useRef, useState } from "react";
import { useBuildForm } from "./buildFormContext";
import data from "public/data.json";
import { IoClose } from "react-icons/io5";
import type { ActiveFilter, ActiveBuildIndex, ActiveSlots } from "~/types";

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

  const modPlaceholder = true;
  type EquipmentData = {
    rarity: string;
    core_skill: {
      name: string;
      description: string;
    };
    type: string;
  };

  let equipmentData: EquipmentData | undefined;
  if (formData?.builds[activeBuildIndex]?.data.equipment) {
    const equipmentKey =
      formData.builds[activeBuildIndex]?.data.equipment[slot];
    equipmentData =
      equipmentKey && equipmentKey in data[slot]
        ? (data[slot][
            equipmentKey as keyof (typeof data)[typeof slot]
          ] as EquipmentData)
        : undefined;
  }

  return (
    <div className="flex flex-col gap-2 rounded p-2">
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
        {slot === "chest" && (
          <button
            className={`cursor-pointer rounded border px-3 py-1 hover:brightness-125 ${activeFilter === "logistics" ? "border-neutral-600 bg-neutral-700" : "border-neutral-500 bg-neutral-600"}`}
            onClick={() => {
              setActiveFilter("logistics");
            }}
          >
            Logistics
          </button>
        )}
      </div>
      <div className="flex gap-2">
        <div className="h-12 w-12 rounded border border-neutral-600 bg-neutral-700"></div>
        <div className="h-12 grow rounded bg-neutral-700">
          <select
            className="h-full w-full rounded border border-neutral-600 bg-neutral-700 px-2 text-lg"
            aria-label={slot}
            ref={selectInput}
            value={formData.builds?.[activeBuildIndex]?.data?.equipment[slot]}
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
                              [slot]: e.target.value,
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
            {filteredData.map(([equipmentKey, equipment]) => (
              <option
                key={equipmentKey}
                value={equipmentKey}
                className={`${
                  formData?.builds?.some(
                    (build) =>
                      build.data.equipment[slot] === equipmentKey &&
                      build.id !== formData.builds[activeBuildIndex]?.id,
                  )
                    ? "text-neutral-500"
                    : "text-white"
                } ${equipment.rarity === "legendary" ? "bg-yellow-600/20" : `${equipment.rarity === "epic" ? "bg-purple-600/20" : `${equipment.rarity === "rare" ? "bg-blue-600/20" : `${equipment.rarity === "common" ? "bg-green-600/20" : ""}`}`}`}`}
              >
                {equipmentKey.charAt(0).toUpperCase() +
                  equipmentKey
                    .slice(1)
                    .replace(/_/g, " ")
                    .replace(/(\s[a-z])/g, (match) => match.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
        <button
          className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded border border-neutral-600 bg-neutral-700 hover:text-red-500 hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-40`}
          aria-label={`Clear`}
          disabled={
            !formData?.builds?.[activeBuildIndex]?.data?.equipment[slot]
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
                            [slot]: "",
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
      {formData?.builds?.[activeBuildIndex]?.data?.equipment[slot] && (
        <>
          <hr className="border-neutral-700" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
              <h2>Info</h2>
              <div className="rounded bg-neutral-800 p-2">
                <p>Active Skill: {equipmentData?.core_skill.name}</p>
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
              <h2>Mods</h2>
              <div className="flex gap-2">
                <div className="h-12 w-12 rounded bg-neutral-800"></div>
                <select
                  className="h-12 grow rounded bg-neutral-800 px-2 text-lg"
                  disabled
                >
                  <option value="">Mod</option>
                </select>
                <button
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded bg-neutral-800 hover:text-red-500"
                  disabled
                >
                  <IoClose className="h-6 w-6" />
                </button>
              </div>
            </div>
            {modPlaceholder && (
              <>
                <hr className="border-neutral-700" />
                <div className="flex flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
                  <h2>Info</h2>
                  <div className="rounded bg-neutral-800 p-2">
                    Coming soon...
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Equipment;
