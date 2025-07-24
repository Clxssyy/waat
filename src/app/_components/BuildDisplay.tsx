"use client";

import { FaDiamond, FaMinus, FaPlus } from "react-icons/fa6";
import { useBuildForm } from "./buildFormContext";
import { notFound } from "next/navigation";
import data from "public/data.json";
import ImageHelper from "./ImageHelper";
import type { ActiveBuildIndex } from "~/types";
import clsx from "clsx";
import {
  getBackdropColor,
  getBorderColor,
  getBorderHoverColor,
} from "~/styles";
import { buildDataSchema } from "~/schemas";

const BuildDisplay = () => {
  const {
    setCharacterData,
    characterData,
    activeBuildIndex,
    setActiveBuildIndex,
    activeSlot,
    setActiveSlot,
    activeTab,
    setActiveTab,
  } = useBuildForm();

  if (!characterData) notFound();
  if (!characterData.builds[activeBuildIndex]) notFound();

  const drifterData = data.drifters.find(
    (drifter) =>
      drifter.name ===
      characterData.builds[activeBuildIndex]?.data.drifter.name,
  );
  const weaponData = data.weapon.find(
    (weapon) =>
      weapon.name ===
      characterData.builds[activeBuildIndex]?.data.equipment.weapon.name,
  );
  const chestData = data.chest.find(
    (chest) =>
      chest.name ===
      characterData.builds[activeBuildIndex]?.data.equipment.chest.name,
  );
  const helmetData = data.helmet.find(
    (helmet) =>
      helmet.name ===
      characterData.builds[activeBuildIndex]?.data.equipment.helmet.name,
  );
  const bootsData = data.boots.find(
    (boots) =>
      boots.name ===
      characterData.builds[activeBuildIndex]?.data.equipment.boots.name,
  );

  const statPoints =
    100 -
    Object.values(characterData.builds[activeBuildIndex].data.stats).reduce(
      (sum, val) => sum + val,
      0,
    );
  const totalStrength = Math.round(
    characterData.builds[activeBuildIndex].data.stats.strength +
      (drifterData?.strBase ?? 0) +
      (drifterData?.strBonus ?? 0) *
        characterData.builds[activeBuildIndex].data.drifter.mastery,
  );
  const totalAgility = Math.round(
    characterData.builds[activeBuildIndex].data.stats.agility +
      (drifterData?.agiBase ?? 0) +
      (drifterData?.agiBonus ?? 0) *
        characterData.builds[activeBuildIndex].data.drifter.mastery,
  );
  const totalIntelligence = Math.round(
    characterData.builds[activeBuildIndex].data.stats.intelligence +
      (drifterData?.intBase ?? 0) +
      (drifterData?.intBonus ?? 0) *
        characterData.builds[activeBuildIndex].data.drifter.mastery,
  );

  return (
    <div id="display" className="min-w-1/3">
      <div className="flex flex-col items-center gap-2 rounded border border-neutral-700 bg-neutral-800 p-2">
        <div className="relative flex gap-1 rounded-full border border-neutral-600 bg-neutral-700 p-2">
          {Array.from({ length: 3 }, (_, i) => (
            <button
              key={i}
              aria-label={`Build ${i + 1}`}
              onClick={() => {
                if (activeBuildIndex !== i && characterData.builds[i]) {
                  setActiveBuildIndex(i as ActiveBuildIndex);
                  setActiveSlot("weapon");
                  setActiveTab("equipment");
                } else if (!characterData.builds[i]) {
                  setCharacterData((prev) => {
                    return {
                      ...prev,
                      builds: [
                        ...prev.builds,
                        {
                          id: "temp-" + crypto.randomUUID(),
                          characterId: prev.id,
                          data: buildDataSchema.parse({}),
                          position: i,
                        },
                      ],
                    };
                  });
                  setActiveBuildIndex(i as ActiveBuildIndex);
                  setActiveSlot("weapon");
                  setActiveTab("equipment");
                }
              }}
              className={clsx(
                "h-4 w-4 cursor-pointer rounded-full hover:outline-2 hover:outline-cyan-300",
                activeBuildIndex === i &&
                  "bg-cyan-500 outline-2 outline-cyan-300",
                characterData.builds[i] ? "bg-cyan-400" : "bg-neutral-800",
                characterData.builds[i]?.id.includes("temp") && "animate-pulse",
              )}
            />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <div className="relative">
            <button
              className={clsx(
                "relative flex h-82 w-32 cursor-pointer items-center justify-center border transition-all",
                weaponData
                  ? clsx(
                      getBackdropColor(weaponData.rarity),
                      getBorderHoverColor(weaponData.rarity),
                    )
                  : "bg-neutral-700 bg-radial from-neutral-700 from-10% to-black/30 hover:border-cyan-400",
                activeSlot === "weapon"
                  ? clsx(
                      "scale-[102%] border-2",
                      weaponData
                        ? getBorderColor(weaponData.rarity)
                        : "border-cyan-400",
                    )
                  : "border-neutral-600",
              )}
              aria-label="Weapon Slot"
              onClick={() => {
                if (activeSlot !== "weapon") setActiveSlot("weapon");
                if (activeTab !== "equipment") setActiveTab("equipment");
              }}
            >
              {weaponData ? (
                weaponData.image ? (
                  <ImageHelper
                    src={weaponData.image}
                    alt={weaponData.name}
                    width={800}
                    height={800}
                    className="size-full object-contain"
                  />
                ) : (
                  <div className="truncate p-1 text-sm text-wrap">
                    {weaponData.name}
                  </div>
                )
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                  <FaPlus />
                </div>
              )}
              {characterData.builds.some(
                (build) =>
                  build.data.equipment.weapon.name === weaponData?.name &&
                  build.id !== characterData.builds[activeBuildIndex]?.id &&
                  build.data.equipment.weapon.name !== "",
              ) ? (
                <div
                  id="weapon-conflict-display"
                  className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400"
                >
                  <span className="text-sm">!</span>
                </div>
              ) : null}
              {characterData.builds[activeBuildIndex].data.equipment.weapon
                .name !== "" ? (
                <div
                  id="weapon-tier-display"
                  className="absolute right-0 bottom-0 w-2/5 border-t border-l border-neutral-600 bg-neutral-700 text-sm"
                >
                  {
                    characterData.builds[activeBuildIndex].data.equipment.weapon
                      .tier
                  }
                </div>
              ) : null}
            </button>
            <button
              id="weapon-mod-display"
              aria-label="Weapon Slot"
              className={clsx(
                "absolute top-1/2 -left-14 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded border border-neutral-600 bg-neutral-700",
                "before:absolute before:-right-4 before:bottom-2 before:h-0.5 before:w-3 before:rotate-[30deg] before:cursor-default before:rounded before:bg-neutral-700",
                "after:absolute after:top-2 after:-right-4 after:h-0.5 after:w-3 after:-rotate-[30deg] after:cursor-default after:rounded after:bg-neutral-700",
                "not-lg:sm:flex 2xl:flex",
              )}
              onClick={() => {
                if (activeSlot !== "weapon") setActiveSlot("weapon");
                if (activeTab !== "equipment") setActiveTab("equipment");
              }}
            >
              {characterData.builds[activeBuildIndex].data.equipment.weapon.mod
                .name !== "" ? (
                <FaDiamond className="text-neutral-500" />
              ) : null}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <button
                className={clsx(
                  "relative flex h-26 w-26 cursor-pointer items-center justify-center border transition-all",
                  helmetData
                    ? clsx(
                        getBackdropColor(helmetData.rarity),
                        getBorderHoverColor(helmetData.rarity),
                      )
                    : "bg-neutral-700 bg-radial from-neutral-700 from-10% to-black/30 hover:border-cyan-400",
                  activeSlot === "helmet"
                    ? clsx(
                        "scale-[102%] border-2",
                        helmetData
                          ? getBorderColor(helmetData.rarity)
                          : "border-cyan-400",
                      )
                    : "border-neutral-600",
                )}
                aria-label="Helmet Slot"
                onClick={() => {
                  if (activeSlot != "helmet") setActiveSlot("helmet");
                  if (activeTab != "equipment") setActiveTab("equipment");
                }}
              >
                {helmetData ? (
                  helmetData.image ? (
                    <ImageHelper
                      src={helmetData.image}
                      alt={helmetData.name}
                      width={800}
                      height={800}
                      className="size-full object-contain"
                    />
                  ) : (
                    <div className="truncate p-1 text-sm text-wrap">
                      {helmetData.name}
                    </div>
                  )
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                    <FaPlus />
                  </div>
                )}
                {characterData.builds.some(
                  (build) =>
                    build.data.equipment.helmet.name === helmetData?.name &&
                    build.id !== characterData.builds[activeBuildIndex]?.id &&
                    build.data.equipment.helmet.name !== "",
                ) ? (
                  <div
                    id="helmet-conflict-display"
                    className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400"
                  >
                    <span className="text-sm">!</span>
                  </div>
                ) : null}
                {characterData.builds[activeBuildIndex].data.equipment.helmet
                  .name !== "" ? (
                  <div
                    id="helmet-tier-display"
                    className="absolute right-0 bottom-0 w-2/5 border-t border-l border-neutral-600 bg-neutral-700 text-sm"
                  >
                    {
                      characterData.builds[activeBuildIndex].data.equipment
                        .helmet.tier
                    }
                  </div>
                ) : null}
              </button>
              <button
                id="helmet-mod-display"
                aria-label="Helmet Slot"
                className={clsx(
                  "absolute top-1/2 -right-14 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded border border-neutral-600 bg-neutral-700",
                  "before:absolute before:bottom-2 before:-left-4 before:h-0.5 before:w-3 before:-rotate-[30deg] before:cursor-default before:rounded before:bg-neutral-700",
                  "after:absolute after:top-2 after:-left-4 after:h-0.5 after:w-3 after:rotate-[30deg] after:cursor-default after:rounded after:bg-neutral-700",
                  "not-lg:sm:flex 2xl:flex",
                )}
                onClick={() => {
                  if (activeSlot !== "helmet") setActiveSlot("helmet");
                  if (activeTab !== "equipment") setActiveTab("equipment");
                }}
              >
                {characterData.builds[activeBuildIndex].data.equipment.helmet
                  .mod.name !== "" ? (
                  <FaDiamond className="text-neutral-500" />
                ) : null}
              </button>
            </div>
            <div className="relative">
              <button
                className={clsx(
                  "relative flex h-26 w-26 cursor-pointer items-center justify-center border transition-all",
                  chestData
                    ? clsx(
                        getBackdropColor(chestData.rarity),
                        getBorderHoverColor(chestData.rarity),
                      )
                    : "bg-neutral-700 bg-radial from-neutral-700 from-10% to-black/30 hover:border-cyan-400",
                  activeSlot === "chest"
                    ? clsx(
                        "scale-[102%] border-2",
                        chestData
                          ? getBorderColor(chestData.rarity)
                          : "border-cyan-400",
                      )
                    : "border-neutral-600",
                )}
                aria-label="Chest Slot"
                onClick={() => {
                  if (activeSlot !== "chest") setActiveSlot("chest");
                  if (activeTab !== "equipment") setActiveTab("equipment");
                }}
              >
                {chestData ? (
                  chestData?.image ? (
                    <ImageHelper
                      src={chestData.image}
                      alt={chestData.name}
                      width={800}
                      height={800}
                      className="size-full object-contain"
                    />
                  ) : (
                    <div className="truncate p-1 text-sm text-wrap">
                      {chestData.name}
                    </div>
                  )
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                    <FaPlus />
                  </div>
                )}
                {characterData.builds.some(
                  (build) =>
                    build.data.equipment.chest.name === chestData?.name &&
                    build.id !== characterData.builds[activeBuildIndex]?.id &&
                    build.data.equipment.chest.name !== "",
                ) ? (
                  <div
                    id="chest-conflict-display"
                    className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400"
                  >
                    <span className="text-sm">!</span>
                  </div>
                ) : null}
                {characterData.builds[activeBuildIndex].data.equipment.chest
                  .name !== "" ? (
                  <div
                    id="chest-tier-display"
                    className="absolute right-0 bottom-0 w-2/5 border-t border-l border-neutral-600 bg-neutral-700 text-sm"
                  >
                    {
                      characterData.builds[activeBuildIndex].data.equipment
                        .chest.tier
                    }
                  </div>
                ) : null}
              </button>
              <button
                id="chest-mod-display"
                aria-label="Chest Slot"
                className={clsx(
                  "absolute top-1/2 -right-14 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded border border-neutral-600 bg-neutral-700",
                  "before:absolute before:bottom-2 before:-left-4 before:h-0.5 before:w-3 before:-rotate-[30deg] before:cursor-default before:rounded before:bg-neutral-700",
                  "after:absolute after:top-2 after:-left-4 after:h-0.5 after:w-3 after:rotate-[30deg] after:cursor-default after:rounded after:bg-neutral-700",
                  "not-lg:sm:flex 2xl:flex",
                )}
                onClick={() => {
                  if (activeSlot !== "chest") setActiveSlot("chest");
                  if (activeTab !== "equipment") setActiveTab("equipment");
                }}
              >
                {characterData.builds[activeBuildIndex].data.equipment.chest.mod
                  .name !== "" ? (
                  <FaDiamond className="text-neutral-500" />
                ) : null}
              </button>
            </div>
            <div className="relative">
              <button
                className={clsx(
                  "relative flex h-26 w-26 cursor-pointer items-center justify-center border transition-all",
                  bootsData
                    ? clsx(
                        getBackdropColor(bootsData.rarity),
                        getBorderHoverColor(bootsData.rarity),
                      )
                    : "bg-neutral-700 bg-radial from-neutral-700 from-10% to-black/30 hover:border-cyan-400",
                  activeSlot === "boots"
                    ? clsx(
                        "scale-[102%] border-2",
                        bootsData
                          ? getBorderColor(bootsData.rarity)
                          : "border-cyan-400",
                      )
                    : "border-neutral-600",
                )}
                aria-label="Boots Slot"
                onClick={() => {
                  if (activeSlot !== "boots") setActiveSlot("boots");
                  if (activeTab !== "equipment") setActiveTab("equipment");
                }}
              >
                {bootsData ? (
                  bootsData?.image ? (
                    <ImageHelper
                      src={bootsData.image}
                      alt={bootsData.name}
                      width={800}
                      height={800}
                      className="size-full object-contain"
                    />
                  ) : (
                    <div className="truncate p-1 text-sm text-wrap">
                      {bootsData.name}
                    </div>
                  )
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                    <FaPlus />
                  </div>
                )}
                {characterData.builds.some(
                  (build) =>
                    build.data.equipment.boots.name === bootsData?.name &&
                    build.id !== characterData.builds[activeBuildIndex]?.id &&
                    build.data.equipment.boots.name !== "",
                ) ? (
                  <div
                    id="boots-conflict-display"
                    className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400"
                  >
                    <span className="text-sm">!</span>
                  </div>
                ) : null}
                {characterData.builds[activeBuildIndex].data.equipment.boots
                  .name !== "" ? (
                  <div
                    id="boots-tier-display"
                    className="absolute right-0 bottom-0 w-2/5 border-t border-l border-neutral-600 bg-neutral-700 text-sm"
                  >
                    {
                      characterData.builds[activeBuildIndex].data.equipment
                        .boots.tier
                    }
                  </div>
                ) : null}
              </button>
              <button
                id="boots-mod-display"
                aria-label="Boots Slot"
                className={clsx(
                  "absolute top-1/2 -right-14 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded border border-neutral-600 bg-neutral-700",
                  "before:absolute before:bottom-2 before:-left-4 before:h-0.5 before:w-3 before:-rotate-[30deg] before:cursor-default before:rounded before:bg-neutral-700",
                  "after:absolute after:top-2 after:-left-4 after:h-0.5 after:w-3 after:rotate-[30deg] after:cursor-default after:rounded after:bg-neutral-700",
                  "not-lg:sm:flex 2xl:flex",
                )}
                onClick={() => {
                  if (activeSlot !== "boots") setActiveSlot("boots");
                  if (activeTab !== "equipment") setActiveTab("equipment");
                }}
              >
                {characterData.builds[activeBuildIndex].data.equipment.boots.mod
                  .name !== "" ? (
                  <FaDiamond className="text-neutral-500" />
                ) : null}
              </button>
            </div>
          </div>
        </div>
        <button
          className={clsx(
            "relative flex h-24 w-60 cursor-pointer items-center justify-center border bg-neutral-700 bg-radial from-neutral-700 from-10% to-black/30 transition-all",
            drifterData
              ? clsx(
                  getBackdropColor(drifterData.type),
                  getBorderHoverColor(drifterData.type),
                )
              : "bg-neutral-700 bg-radial from-neutral-700 from-10% to-black/30 hover:border-cyan-400",
            activeSlot === "drifters"
              ? clsx(
                  "scale-[102%] border-2",
                  drifterData
                    ? getBorderColor(drifterData.type)
                    : "border-cyan-400",
                )
              : "border-neutral-600",
          )}
          aria-label="Drifter Slot"
          onClick={() => {
            if (activeSlot !== "drifters") setActiveSlot("drifters");
            if (activeTab !== "drifters") setActiveTab("drifters");
          }}
        >
          {drifterData ? (
            drifterData?.image ? (
              <ImageHelper
                src={drifterData.image}
                alt={drifterData.name}
                width={2436}
                height={1440}
                className="size-full object-cover"
              />
            ) : (
              <div className="truncate p-1 text-sm text-wrap">
                {drifterData.name}
              </div>
            )
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
              <FaPlus />
            </div>
          )}
          {characterData.builds.some(
            (build) =>
              build.data.drifter.name === drifterData?.name &&
              build.id !== characterData.builds[activeBuildIndex]?.id &&
              build.data.drifter.name !== "",
          ) ||
          characterData.support.some(
            (support) => support === drifterData?.name && support !== "",
          ) ? (
            <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
              <span className="text-sm">!</span>
            </div>
          ) : null}
          {characterData.builds[activeBuildIndex].data.drifter.name !== "" ? (
            <div className="absolute right-0 bottom-0 w-1/5 border-t border-l border-neutral-600 bg-neutral-700 text-sm">
              {characterData.builds[activeBuildIndex].data.drifter.tier}
            </div>
          ) : null}
        </button>
        <div className="flex w-full justify-between border border-neutral-600 bg-neutral-700 p-2">
          <p className="flex w-full justify-between">
            <span>Power</span>
            <span>#</span>
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 border border-neutral-600 bg-neutral-700 p-2">
          <h2 className="text-center">
            Stats{" "}
            <span className="text-neutral-400">
              ( <span className="text-cyan-400">{statPoints}</span> )
            </span>
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2 rounded-lg bg-neutral-800 p-2 text-center">
              <h3 className="text-sm">
                Strength{" "}
                <span className="text-neutral-400">
                  ({" "}
                  <span className="text-purple-400">
                    {drifterData?.strBonus ?? "0"}
                  </span>{" "}
                  )
                </span>
              </h3>
              <div className="grid grid-cols-4 items-center justify-center gap-2">
                <button
                  aria-label="Decrease Strength"
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all outline-none hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={
                    characterData.builds[activeBuildIndex].data.stats
                      .strength === 0
                  }
                  onClick={(e) => {
                    const amount = e.shiftKey
                      ? (characterData.builds[activeBuildIndex]?.data.stats
                          .strength ?? 0) >= 5
                        ? 5
                        : (characterData.builds[activeBuildIndex]?.data.stats
                            .strength ?? 0)
                      : 1;
                    setCharacterData((prev) => {
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
                                    strength: b.data.stats.strength - amount,
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
                <p className="col-span-2 text-sm">
                  <span className="font-semibold">{totalStrength}</span>{" "}
                  <span className="text-neutral-400">
                    ({" "}
                    <span className="text-cyan-400">
                      {
                        characterData.builds[activeBuildIndex].data.stats
                          .strength
                      }{" "}
                    </span>
                    )
                  </span>
                </p>
                <button
                  aria-label="Increase Strength"
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all outline-none hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={statPoints === 0}
                  onClick={(e) => {
                    const amount = e.shiftKey
                      ? statPoints >= 5
                        ? 5
                        : statPoints
                      : 1;
                    setCharacterData((prev) => {
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
                                    strength: b.data.stats.strength + amount,
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
              <div
                id="strength-stat-source-display"
                className="rounded bg-neutral-700/40"
              >
                <div
                  className="flex h-1 gap-0.5 rounded transition-all"
                  style={{
                    width:
                      totalStrength === 0
                        ? 0
                        : String(
                            (totalStrength /
                              (totalStrength +
                                totalAgility +
                                totalIntelligence)) *
                              100,
                          ) + "%",
                  }}
                >
                  {drifterData && (
                    <div
                      id="strength-base"
                      className="h-full rounded bg-gradient-to-r from-neutral-500 to-neutral-400"
                      style={{
                        width:
                          totalStrength === 0
                            ? 0
                            : String(
                                ((drifterData?.strBase ?? 0) / totalStrength) *
                                  100,
                              ) + "%",
                      }}
                    />
                  )}
                  {drifterData &&
                    characterData.builds[activeBuildIndex].data.drifter
                      .mastery > 0 && (
                      <div
                        id="strength-mastery-bonus"
                        className="h-full rounded bg-gradient-to-r from-purple-500 to-purple-400"
                        style={{
                          width:
                            totalStrength === 0
                              ? 0
                              : String(
                                  (((drifterData?.strBonus ?? 0) *
                                    characterData.builds[activeBuildIndex].data
                                      .drifter.mastery) /
                                    totalStrength) *
                                    100,
                                ) + "%",
                        }}
                      />
                    )}
                  {characterData.builds[activeBuildIndex].data.stats.strength >
                    0 && (
                    <div
                      id="strength-added-stats"
                      className="h-full rounded bg-gradient-to-r from-cyan-500 to-cyan-400"
                      style={{
                        width:
                          totalStrength === 0
                            ? 0
                            : String(
                                (characterData.builds[activeBuildIndex].data
                                  .stats.strength /
                                  totalStrength) *
                                  100,
                              ) + "%",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-neutral-800 p-2 text-center">
              <h3 className="text-sm">
                Agility{" "}
                <span className="text-neutral-400">
                  ({" "}
                  <span className="text-purple-400">
                    {drifterData?.agiBonus ?? "0"}{" "}
                  </span>
                  )
                </span>
              </h3>
              <div className="grid grid-cols-4 items-center justify-center gap-2">
                <button
                  aria-label="Decrease Agility"
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all outline-none hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={
                    characterData.builds[activeBuildIndex].data.stats
                      .agility === 0
                  }
                  onClick={(e) => {
                    const amount = e.shiftKey
                      ? (characterData.builds[activeBuildIndex]?.data.stats
                          .agility ?? 0) >= 5
                        ? 5
                        : (characterData.builds[activeBuildIndex]?.data.stats
                            .agility ?? 0)
                      : 1;
                    setCharacterData((prev) => {
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
                                    agility: b.data.stats.agility - amount,
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
                <p className="col-span-2 text-sm">
                  <span className="font-semibold">{totalAgility}</span>{" "}
                  <span className="text-neutral-400">
                    ({" "}
                    <span className="text-cyan-400">
                      {
                        characterData.builds[activeBuildIndex].data.stats
                          .agility
                      }
                    </span>{" "}
                    )
                  </span>
                </p>
                <button
                  aria-label="Increase Agility"
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all outline-none hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={statPoints === 0}
                  onClick={(e) => {
                    const amount = e.shiftKey
                      ? statPoints >= 5
                        ? 5
                        : statPoints
                      : 1;
                    setCharacterData((prev) => {
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
                                    agility: b.data.stats.agility + amount,
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
              <div
                id="agility-stat-source-display"
                className="rounded bg-neutral-700/40"
              >
                <div
                  className="flex h-1 gap-0.5 rounded transition-all"
                  style={{
                    width:
                      totalAgility === 0
                        ? 0
                        : String(
                            (totalAgility /
                              (totalStrength +
                                totalAgility +
                                totalIntelligence)) *
                              100,
                          ) + "%",
                  }}
                >
                  {drifterData && (
                    <div
                      id="agility-base"
                      className="h-full rounded bg-gradient-to-r from-neutral-500 to-neutral-400"
                      style={{
                        width:
                          totalAgility === 0
                            ? 0
                            : String(
                                ((drifterData?.strBase ?? 0) / totalAgility) *
                                  100,
                              ) + "%",
                      }}
                    />
                  )}
                  {drifterData &&
                    characterData.builds[activeBuildIndex].data.drifter
                      .mastery > 0 && (
                      <div
                        id="agility-mastery-bonus"
                        className="h-full rounded bg-gradient-to-r from-purple-500 to-purple-400"
                        style={{
                          width:
                            totalAgility === 0
                              ? 0
                              : String(
                                  (((drifterData?.strBonus ?? 0) *
                                    characterData.builds[activeBuildIndex].data
                                      .drifter.mastery) /
                                    totalAgility) *
                                    100,
                                ) + "%",
                        }}
                      />
                    )}
                  {characterData.builds[activeBuildIndex].data.stats.agility >
                    0 && (
                    <div
                      id="agility-added-stats"
                      className="h-full rounded bg-gradient-to-r from-cyan-500 to-cyan-400"
                      style={{
                        width:
                          totalAgility === 0
                            ? 0
                            : String(
                                (characterData.builds[activeBuildIndex].data
                                  .stats.agility /
                                  totalAgility) *
                                  100,
                              ) + "%",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-neutral-800 p-2 text-center">
              <h3 className="text-sm">
                Intelligence{" "}
                <span className="text-neutral-400">
                  ({" "}
                  <span className="text-purple-400">
                    {drifterData?.intBonus ?? "0"}
                  </span>{" "}
                  )
                </span>
              </h3>
              <div className="grid grid-cols-4 items-center justify-center gap-2">
                <button
                  aria-label="Decrease Intelligence"
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all outline-none hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={
                    characterData.builds[activeBuildIndex].data.stats
                      .intelligence === 0
                  }
                  onClick={(e) => {
                    const amount = e.shiftKey
                      ? (characterData.builds[activeBuildIndex]?.data.stats
                          .intelligence ?? 0) >= 5
                        ? 5
                        : (characterData.builds[activeBuildIndex]?.data.stats
                            .intelligence ?? 0)
                      : 1;
                    setCharacterData((prev) => {
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
                                    intelligence:
                                      b.data.stats.intelligence - amount,
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
                <p className="col-span-2 text-sm">
                  <span className="font-semibold">{totalIntelligence}</span>{" "}
                  <span className="text-neutral-400">
                    ({" "}
                    <span className="text-cyan-400">
                      {
                        characterData.builds[activeBuildIndex].data.stats
                          .intelligence
                      }{" "}
                    </span>
                    )
                  </span>
                </p>
                <button
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all outline-none hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Increase Intelligence"
                  disabled={statPoints === 0}
                  onClick={(e) => {
                    const amount = e.shiftKey
                      ? statPoints >= 5
                        ? 5
                        : statPoints
                      : 1;
                    setCharacterData((prev) => {
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
                                    intelligence:
                                      b.data.stats.intelligence + amount,
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
              <div
                id="intelligence-stat-source-display"
                className="rounded bg-neutral-700/40"
              >
                <div
                  className="flex h-1 gap-0.5 rounded transition-all"
                  style={{
                    width:
                      totalIntelligence === 0
                        ? 0
                        : String(
                            (totalIntelligence /
                              (totalStrength +
                                totalAgility +
                                totalIntelligence)) *
                              100,
                          ) + "%",
                  }}
                >
                  {drifterData && (
                    <div
                      id="intelligence-base"
                      className="h-full rounded bg-gradient-to-r from-neutral-500 to-neutral-400"
                      style={{
                        width:
                          totalIntelligence === 0
                            ? 0
                            : String(
                                ((drifterData?.strBase ?? 0) /
                                  totalIntelligence) *
                                  100,
                              ) + "%",
                      }}
                    />
                  )}
                  {drifterData &&
                    characterData.builds[activeBuildIndex].data.drifter
                      .mastery > 0 && (
                      <div
                        id="intelligence-mastery-bonus"
                        className="h-full rounded bg-gradient-to-r from-purple-500 to-purple-400"
                        style={{
                          width:
                            totalIntelligence === 0
                              ? 0
                              : String(
                                  (((drifterData?.strBonus ?? 0) *
                                    characterData.builds[activeBuildIndex].data
                                      .drifter.mastery) /
                                    totalIntelligence) *
                                    100,
                                ) + "%",
                        }}
                      />
                    )}
                  {characterData.builds[activeBuildIndex].data.stats
                    .intelligence > 0 && (
                    <div
                      id="intelligence-added-stats"
                      className="h-full rounded bg-gradient-to-r from-cyan-500 to-cyan-400"
                      style={{
                        width:
                          totalIntelligence === 0
                            ? 0
                            : String(
                                (characterData.builds[activeBuildIndex].data
                                  .stats.intelligence /
                                  totalIntelligence) *
                                  100,
                              ) + "%",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              className="w-full cursor-pointer rounded-lg bg-neutral-800 p-0.5 text-sm transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-80"
              aria-label="Clear stat points"
              disabled={
                !Object.values(
                  characterData.builds[activeBuildIndex].data.stats,
                ).some((stat) => stat > 0)
              }
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
                              stats: {
                                strength: 0,
                                agility: 0,
                                intelligence: 0,
                              },
                            },
                          }
                        : b,
                    ),
                  };
                });
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="flex w-full grow flex-col gap-2 border border-neutral-600 bg-neutral-700 p-2">
          <h2 className="text-center">Details</h2>
          <div className="flex flex-col text-sm">
            <p className="flex justify-between px-2 py-1 odd:bg-neutral-800">
              <span>HP</span>
              <span>#</span>
            </p>
            <p className="flex justify-between px-2 py-1 odd:bg-neutral-800">
              <span>MP</span>
              <span>#</span>
            </p>
            <p className="flex justify-between px-2 py-1 odd:bg-neutral-800">
              <span>Attack Power</span>
              <span>#</span>
            </p>
            <p className="flex justify-between px-2 py-1 odd:bg-neutral-800">
              <span>Armor</span>
              <span>#</span>
            </p>
            <p className="flex justify-between px-2 py-1 odd:bg-neutral-800">
              <span>Magic Resistance</span>
              <span>#</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildDisplay;
