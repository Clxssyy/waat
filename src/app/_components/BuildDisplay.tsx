"use client";

import { FaDiamond, FaMinus, FaPlus } from "react-icons/fa6";
import { useBuildForm } from "./buildFormContext";
import { notFound } from "next/navigation";
import data from "public/data.json";
import ImageHelper from "./ImageHelper";
import type { ActiveBuildIndex } from "~/types";
import { useEffect, useState } from "react";
import clsx from "clsx";

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

  const bootsKey = formData.builds[activeBuildIndex]?.data.equipment.boots.name;
  const helmetKey =
    formData.builds[activeBuildIndex]?.data.equipment.helmet.name;
  const chestKey = formData.builds[activeBuildIndex]?.data.equipment.chest.name;
  const weaponKey =
    formData.builds[activeBuildIndex]?.data.equipment.weapon.name;
  const drifterKey = formData.builds[activeBuildIndex]?.data.drifter.name;

  const drifterData = data.drifters.find(
    (drifter) => drifter.name === drifterKey,
  );

  const weaponData = data.weapon.find((weapon) => weapon.name === weaponKey);

  const chestData = data.chest.find((chest) => chest.name === chestKey);

  const helmetData = data.helmet.find((helmet) => helmet.name === helmetKey);

  const bootsData = data.boots.find((boots) => boots.name === bootsKey);

  const typeOutlineColor = clsx(
    "border-2",
    drifterData?.type === "strength" && "border-red-400",
    drifterData?.type === "intelligence" && "border-blue-400",
    drifterData?.type === "agility" && "border-green-400",
    drifterData?.type === "logistics" && "border-yellow-400",
    !drifterData?.type && "border-cyan-400",
  );

  const typeHoverColor = clsx(
    drifterData?.type === "strength" && "hover:border-red-400",
    drifterData?.type === "intelligence" && "hover:border-blue-400",
    drifterData?.type === "agility" && "hover:border-green-400",
    drifterData?.type === "logistics" && "hover:border-yellow-400",
    !drifterData?.type && "hover:border-cyan-400",
  );

  function getEquipmentOutline(
    data: typeof weaponData | typeof bootsData,
  ): string {
    return clsx(
      "border-2",
      data?.rarity === "legendary" && "border-yellow-600",
      data?.rarity === "epic" && "border-purple-600",
      data?.rarity === "rare" && "border-blue-600",
      data?.rarity === "common" && "border-green-600",
      !data?.rarity && "border-cyan-400",
    );
  }

  function getEquipmentBackground(
    data: typeof weaponData | typeof bootsData,
  ): string {
    return clsx(
      "bg-radial from-neutral-700 from-10%",
      data?.rarity === "legendary" &&
        "to-yellow-600/30 hover:border-yellow-600",
      data?.rarity === "epic" && "to-purple-600/30 hover:border-purple-600",
      data?.rarity === "rare" && "to-blue-600/30 hover:border-blue-600",
      data?.rarity === "common" && "to-green-600/30 hover:border-green-600",
      !data?.rarity && "hover:border-cyan-400",
    );
  }

  const totalStrength =
    (formData?.builds?.[activeBuildIndex]?.data?.stats?.strength ?? 0) +
    (drifterData?.strBase ?? 0) +
    (drifterData?.strBonus ?? 0) *
      (formData?.builds?.[activeBuildIndex]?.data?.drifter.mastery ?? 0);

  const totalAgility =
    (formData?.builds?.[activeBuildIndex]?.data?.stats?.agility ?? 0) +
    (drifterData?.agiBase ?? 0) +
    (drifterData?.agiBonus ?? 0) *
      (formData?.builds?.[activeBuildIndex]?.data?.drifter.mastery ?? 0);

  const totalIntelligence =
    (formData?.builds?.[activeBuildIndex]?.data?.stats?.intelligence ?? 0) +
    (drifterData?.intBase ?? 0) +
    (drifterData?.intBonus ?? 0) *
      (formData?.builds?.[activeBuildIndex]?.data?.drifter.mastery ?? 0);

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
                          id: "temp" + i,
                          characterId: prev.id,
                          data: {
                            equipment: {
                              helmet: {
                                name: "",
                                mastery: 0,
                                tier: "",
                                mod: {
                                  name: "",
                                },
                              },
                              chest: {
                                name: "",
                                mastery: 0,
                                tier: "",
                                mod: {
                                  name: "",
                                },
                              },
                              boots: {
                                name: "",
                                mastery: 0,
                                tier: "",
                                mod: {
                                  name: "",
                                },
                              },
                              weapon: {
                                name: "",
                                mastery: 0,
                                tier: "",
                                mod: {
                                  name: "",
                                },
                              },
                            },
                            stats: {
                              strength: 0,
                              agility: 0,
                              intelligence: 0,
                            },
                            drifter: {
                              name: "",
                              mastery: 0,
                              tier: "",
                            },
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
              className={clsx(
                "h-4 w-4 cursor-pointer rounded-full hover:outline-2 hover:outline-cyan-300",
                activeBuildIndex === i &&
                  "bg-cyan-500 outline-2 outline-cyan-300",
                formData.builds[i] ? "bg-cyan-400" : "bg-neutral-800",
                !character.builds[i] && formData.builds[i] && "animate-pulse",
              )}
            />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <div className="relative">
            <button
              className={clsx(
                "relative flex h-82 w-32 cursor-pointer items-center justify-center border transition-all active:scale-[98%]",
                clsx(
                  getEquipmentBackground(weaponData),
                  activeSlot === "weapon"
                    ? getEquipmentOutline(weaponData)
                    : "border-neutral-600",
                ),
              )}
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
              {formData?.builds?.some(
                (build) =>
                  build.data.equipment.weapon.name === weaponKey &&
                  build.id !== formData.builds[activeBuildIndex]?.id &&
                  build.data.equipment.weapon.name !== "",
              ) ? (
                <div
                  id="weapon-conflict-display"
                  className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400"
                >
                  <span className="text-sm">!</span>
                </div>
              ) : null}
              {formData.builds[activeBuildIndex]?.data.equipment.weapon.name !==
              "" ? (
                <div
                  id="weapon-tier-display"
                  className="absolute right-0 bottom-0 w-2/5 border-t border-l border-neutral-600 bg-neutral-700 text-sm"
                >
                  {formData.builds[activeBuildIndex]?.data.equipment.weapon
                    .tier === ""
                    ? "I"
                    : formData.builds[activeBuildIndex]?.data.equipment.weapon
                        .tier}
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
                if (activeSlot != "weapon") setActiveSlot("weapon");
                if (activeTab != "equipment") setActiveTab("equipment");
                const element = document.getElementById("equipment-mod-select");

                if (element) element.scrollIntoView();
              }}
            >
              {formData.builds[activeBuildIndex]?.data.equipment.weapon.mod &&
              formData?.builds[activeBuildIndex]?.data.equipment.weapon.mod
                ?.name !== "" ? (
                <FaDiamond className="text-neutral-500" />
              ) : null}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative">
              <button
                className={clsx(
                  "relative flex h-26 w-26 cursor-pointer items-center justify-center border transition-all active:scale-[98%]",
                  getEquipmentBackground(helmetData),
                  activeSlot === "helmet"
                    ? getEquipmentOutline(helmetData)
                    : "border-neutral-600",
                )}
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
                {formData?.builds?.some(
                  (build) =>
                    build.data.equipment.helmet.name === helmetKey &&
                    build.id !== formData.builds[activeBuildIndex]?.id &&
                    build.data.equipment.helmet.name !== "",
                ) ? (
                  <div
                    id="helmet-conflict-display"
                    className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400"
                  >
                    <span className="text-sm">!</span>
                  </div>
                ) : null}
                {formData.builds[activeBuildIndex]?.data.equipment.helmet
                  .name !== "" ? (
                  <div
                    id="helmet-tier-display"
                    className="absolute right-0 bottom-0 w-2/5 border-t border-l border-neutral-600 bg-neutral-700 text-sm"
                  >
                    {formData.builds[activeBuildIndex]?.data.equipment.helmet
                      .tier === ""
                      ? "I"
                      : formData.builds[activeBuildIndex]?.data.equipment.helmet
                          .tier}
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
                  if (activeSlot != "helmet") setActiveSlot("helmet");
                  if (activeTab != "equipment") setActiveTab("equipment");
                  const element = document.getElementById(
                    "equipment-mod-select",
                  );

                  if (element) element.scrollIntoView();
                }}
              >
                {formData.builds[activeBuildIndex]?.data.equipment.helmet.mod &&
                formData?.builds[activeBuildIndex]?.data.equipment.helmet.mod
                  ?.name !== "" ? (
                  <FaDiamond className="text-neutral-500" />
                ) : null}
              </button>
            </div>
            <div className="relative">
              <button
                className={clsx(
                  "relative flex h-26 w-26 cursor-pointer items-center justify-center border transition-all active:scale-[98%]",
                  getEquipmentBackground(chestData),
                  activeSlot === "chest"
                    ? getEquipmentOutline(chestData)
                    : "border-neutral-600",
                )}
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
                {formData?.builds?.some(
                  (build) =>
                    build.data.equipment.chest.name === chestKey &&
                    build.id !== formData.builds[activeBuildIndex]?.id &&
                    build.data.equipment.chest.name !== "",
                ) ? (
                  <div
                    id="chest-conflict-display"
                    className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400"
                  >
                    <span className="text-sm">!</span>
                  </div>
                ) : null}
                {formData.builds[activeBuildIndex]?.data.equipment.chest
                  .name !== "" ? (
                  <div
                    id="chest-tier-display"
                    className="absolute right-0 bottom-0 w-2/5 border-t border-l border-neutral-600 bg-neutral-700 text-sm"
                  >
                    {formData.builds[activeBuildIndex]?.data.equipment.chest
                      .tier === ""
                      ? "I"
                      : formData.builds[activeBuildIndex]?.data.equipment.chest
                          .tier}
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
                  if (activeSlot != "chest") setActiveSlot("chest");
                  if (activeTab != "equipment") setActiveTab("equipment");
                  const element = document.getElementById(
                    "equipment-mod-select",
                  );

                  if (element) element.scrollIntoView();
                }}
              >
                {formData.builds[activeBuildIndex]?.data.equipment.chest.mod &&
                formData?.builds[activeBuildIndex]?.data.equipment.chest.mod
                  ?.name !== "" ? (
                  <FaDiamond className="text-neutral-500" />
                ) : null}
              </button>
            </div>
            <div className="relative">
              <button
                className={clsx(
                  "relative flex h-26 w-26 cursor-pointer items-center justify-center border transition-all active:scale-[98%]",
                  getEquipmentBackground(bootsData),
                  activeSlot === "boots"
                    ? getEquipmentOutline(bootsData)
                    : "border-neutral-600",
                )}
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
                {formData?.builds?.some(
                  (build) =>
                    build.data.equipment.boots.name === bootsKey &&
                    build.id !== formData.builds[activeBuildIndex]?.id &&
                    build.data.equipment.boots.name !== "",
                ) ? (
                  <div
                    id="boots-conflict-display"
                    className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400"
                  >
                    <span className="text-sm">!</span>
                  </div>
                ) : null}
                {formData.builds[activeBuildIndex]?.data.equipment.boots
                  .name !== "" ? (
                  <div
                    id="boots-tier-display"
                    className="absolute right-0 bottom-0 w-2/5 border-t border-l border-neutral-600 bg-neutral-700 text-sm"
                  >
                    {formData.builds[activeBuildIndex]?.data.equipment.boots
                      .tier === ""
                      ? "I"
                      : formData.builds[activeBuildIndex]?.data.equipment.boots
                          .tier}
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
                  if (activeSlot != "boots") setActiveSlot("boots");
                  if (activeTab != "equipment") setActiveTab("equipment");
                  const element = document.getElementById(
                    "equipment-mod-select",
                  );

                  if (element) element.scrollIntoView();
                }}
              >
                {formData.builds[activeBuildIndex]?.data.equipment.boots.mod &&
                formData?.builds[activeBuildIndex]?.data.equipment.boots.mod
                  ?.name !== "" ? (
                  <FaDiamond className="text-neutral-500" />
                ) : null}
              </button>
            </div>
          </div>
        </div>
        <button
          className={clsx(
            "relative flex h-24 w-60 cursor-pointer items-center justify-center border bg-neutral-700 bg-radial from-neutral-700 from-10% to-black/30 transition-all active:scale-[98%]",
            typeHoverColor,
            activeSlot === "drifter" ? typeOutlineColor : "border-neutral-600",
          )}
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
                className="h-full w-full object-cover"
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
          {formData?.builds?.some(
            (build) =>
              build.data.drifter.name === drifterKey &&
              build.id !== formData.builds[activeBuildIndex]?.id &&
              build.data.drifter.name !== "",
          ) ||
          formData.support.some(
            (support) => support === drifterKey && support !== "",
          ) ? (
            <div className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full border border-red-400 bg-red-500/50 font-bold text-red-400">
              <span className="text-sm">!</span>
            </div>
          ) : null}
          {formData.builds[activeBuildIndex]?.data.drifter.name !== "" ? (
            <div className="absolute right-0 bottom-0 w-1/5 border-t border-l border-neutral-600 bg-neutral-700 text-sm">
              {formData.builds[activeBuildIndex]?.data.drifter.tier === ""
                ? "I"
                : formData.builds[activeBuildIndex]?.data.drifter.tier}
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
                    {drifterData?.strBonus ?? "0.0"}
                  </span>{" "}
                  )
                </span>
              </h3>
              <div className="grid grid-cols-4 items-center justify-center gap-2">
                <button
                  aria-label="Decrease Strength"
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all outline-none hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={
                    (formData?.builds[activeBuildIndex]?.data.stats.strength ??
                      0) === 0
                  }
                  onClick={(e) => {
                    const amount = e.shiftKey
                      ? (formData?.builds[activeBuildIndex]?.data.stats
                          .strength ?? 0) >= 5
                        ? 5
                        : (formData?.builds[activeBuildIndex]?.data.stats
                            .strength ?? 0)
                      : 1;
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
                                    strength:
                                      (formData?.builds[activeBuildIndex]?.data
                                        .stats.strength ?? 0) - amount,
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
                  {Math.floor(totalStrength)}{" "}
                  <span className="text-neutral-400">
                    ({" "}
                    <span className="text-cyan-400">
                      {formData?.builds?.[activeBuildIndex]?.data?.stats
                        ?.strength ?? 0}{" "}
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
                                    strength:
                                      (formData?.builds[activeBuildIndex]?.data
                                        .stats.strength ?? 0) + amount,
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
                className="flex h-1 rounded bg-neutral-700/40 transition-all"
              >
                <div
                  id="strength-base"
                  className="h-full rounded bg-neutral-500"
                  style={{
                    width:
                      totalStrength === 0
                        ? 0
                        : String(
                            ((drifterData?.strBase ?? 0) / totalStrength) * 100,
                          ) + "%",
                  }}
                />
                <div
                  id="strength-mastery-bonus"
                  className="h-full rounded bg-purple-400"
                  style={{
                    width:
                      totalStrength === 0
                        ? 0
                        : String(
                            (((drifterData?.strBonus ?? 0) *
                              (formData?.builds?.[activeBuildIndex]?.data
                                ?.drifter.mastery ?? 0)) /
                              totalStrength) *
                              100,
                          ) + "%",
                  }}
                />
                <div
                  id="strength-added-stats"
                  className="h-full rounded bg-cyan-400"
                  style={{
                    width:
                      totalStrength === 0
                        ? 0
                        : String(
                            ((formData?.builds?.[activeBuildIndex]?.data?.stats
                              ?.strength ?? 0) /
                              totalStrength) *
                              100,
                          ) + "%",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-neutral-800 p-2 text-center">
              <h3 className="text-sm">
                Agility{" "}
                <span className="text-neutral-400">
                  ({" "}
                  <span className="text-purple-400">
                    {drifterData?.agiBonus ?? "0.0"}{" "}
                  </span>
                  )
                </span>
              </h3>
              <div className="grid grid-cols-4 items-center justify-center gap-2">
                <button
                  aria-label="Decrease Agility"
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all outline-none hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={
                    (formData?.builds[activeBuildIndex]?.data.stats.agility ??
                      0) === 0
                  }
                  onClick={(e) => {
                    const amount = e.shiftKey
                      ? (formData?.builds[activeBuildIndex]?.data.stats
                          .strength ?? 0) >= 5
                        ? 5
                        : (formData?.builds[activeBuildIndex]?.data.stats
                            .strength ?? 0)
                      : 1;
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
                                    agility:
                                      (formData?.builds[activeBuildIndex]?.data
                                        .stats.agility ?? 0) - amount,
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
                  {Math.floor(totalAgility)}{" "}
                  <span className="text-neutral-400">
                    ({" "}
                    <span className="text-cyan-400">
                      {formData?.builds?.[activeBuildIndex]?.data?.stats
                        ?.agility ?? 0}
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
                                    agility:
                                      (formData?.builds[activeBuildIndex]?.data
                                        .stats.agility ?? 0) + amount,
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
                className="flex h-1 rounded bg-neutral-700/40 transition-all"
              >
                <div
                  id="agility-base"
                  className="h-full rounded bg-neutral-500"
                  style={{
                    width:
                      totalAgility === 0
                        ? 0
                        : String(
                            ((drifterData?.agiBase ?? 0) / totalAgility) * 100,
                          ) + "%",
                  }}
                />
                <div
                  id="agility-mastery-bonus"
                  className="h-full rounded bg-purple-400"
                  style={{
                    width:
                      totalAgility === 0
                        ? 0
                        : String(
                            (((drifterData?.agiBonus ?? 0) *
                              (formData?.builds?.[activeBuildIndex]?.data
                                ?.drifter.mastery ?? 0)) /
                              totalAgility) *
                              100,
                          ) + "%",
                  }}
                />
                <div
                  id="agility-added-stats"
                  className="h-full rounded bg-cyan-400"
                  style={{
                    width:
                      totalAgility === 0
                        ? 0
                        : String(
                            ((formData?.builds?.[activeBuildIndex]?.data?.stats
                              ?.agility ?? 0) /
                              totalAgility) *
                              100,
                          ) + "%",
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-lg bg-neutral-800 p-2 text-center">
              <h3 className="text-sm">
                Intelligence{" "}
                <span className="text-neutral-400">
                  ({" "}
                  <span className="text-purple-400">
                    {drifterData?.intBonus ?? "0.0"}
                  </span>{" "}
                  )
                </span>
              </h3>
              <div className="grid grid-cols-4 items-center justify-center gap-2">
                <button
                  aria-label="Decrease Intelligence"
                  className="cursor-pointer place-items-center rounded-full bg-neutral-700/40 p-0.5 transition-all outline-none hover:brightness-125 active:bg-neutral-700/60 disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={
                    (formData?.builds[activeBuildIndex]?.data.stats
                      .intelligence ?? 0) === 0
                  }
                  onClick={(e) => {
                    const amount = e.shiftKey
                      ? (formData?.builds[activeBuildIndex]?.data.stats
                          .strength ?? 0) >= 5
                        ? 5
                        : (formData?.builds[activeBuildIndex]?.data.stats
                            .strength ?? 0)
                      : 1;
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
                                    intelligence:
                                      (formData?.builds[activeBuildIndex]?.data
                                        .stats.intelligence ?? 0) - amount,
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
                  {Math.floor(totalIntelligence)}{" "}
                  <span className="text-neutral-400">
                    ({" "}
                    <span className="text-cyan-400">
                      {formData?.builds?.[activeBuildIndex]?.data?.stats
                        ?.intelligence ?? 0}{" "}
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
                                    intelligence:
                                      (formData?.builds[activeBuildIndex]?.data
                                        .stats.intelligence ?? 0) + amount,
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
                className="flex h-1 rounded bg-neutral-700/40 transition-all"
              >
                <div
                  id="intelligence-base"
                  className="h-full rounded bg-neutral-500"
                  style={{
                    width:
                      totalIntelligence === 0
                        ? 0
                        : String(
                            ((drifterData?.intBase ?? 0) / totalIntelligence) *
                              100,
                          ) + "%",
                  }}
                />
                <div
                  id="intelligence-mastery-bonus"
                  className="h-full rounded bg-purple-400"
                  style={{
                    width:
                      totalIntelligence === 0
                        ? 0
                        : String(
                            (((drifterData?.intBonus ?? 0) *
                              (formData?.builds?.[activeBuildIndex]?.data
                                ?.drifter.mastery ?? 0)) /
                              totalIntelligence) *
                              100,
                          ) + "%",
                  }}
                />
                <div
                  id="intelligence-added-stats"
                  className="h-full rounded bg-cyan-400"
                  style={{
                    width:
                      totalIntelligence === 0
                        ? 0
                        : String(
                            ((formData?.builds?.[activeBuildIndex]?.data?.stats
                              ?.intelligence ?? 0) /
                              totalIntelligence) *
                              100,
                          ) + "%",
                  }}
                />
              </div>
            </div>
            <button
              className="w-full cursor-pointer rounded-lg bg-neutral-800 p-0.5 text-sm transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-80"
              aria-label="Clear stat points"
              disabled={
                formData?.builds?.[activeBuildIndex]?.data?.stats
                  ?.intelligence === 0 &&
                formData?.builds?.[activeBuildIndex]?.data?.stats?.strength ===
                  0 &&
                formData?.builds?.[activeBuildIndex]?.data?.stats?.agility === 0
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
