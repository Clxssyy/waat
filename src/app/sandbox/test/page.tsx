"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaCog } from "react-icons/fa";
import { FaHammer, FaMinus, FaPencil, FaPlus } from "react-icons/fa6";
import {
  IoIosStar,
  IoIosStarHalf,
  IoIosStarOutline,
  IoMdArrowRoundBack,
  IoMdShare,
} from "react-icons/io";
import { useBuildForm } from "~/app/_components/buildFormContext";
import { useItemData } from "~/utils";
import data from "public/data.json";
import Equipment from "~/app/_components/equipment";
import type { ActiveSlots } from "~/types";
import Drifter from "~/app/_components/drifter";
import Support from "~/app/_components/support";
import Description from "~/app/characters/[characterId]/description/page";
import CommentSection from "~/app/_components/CommentSection";

const SECONDARY = "bg-neutral-800";
const GAP_COLOR = "bg-neutral-950";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const pathSplit = pathname.split("/");
  const characterId = pathSplit[2];
  const activePage = pathSplit[3];
  const {
    character,
    isCreator,
    save,
    isSaving,
    clone,
    isCloning,
    hasChanges,
    setHasChanges,
    formData,
    setFormData,
    activeBuildIndex,
    setActiveBuildIndex,
    setActiveSlot,
    activeSlot,
    activeTab,
    setActiveTab,
  } = useBuildForm();

  if (!character) {
    return <div>Character not found.</div>;
  }

  const creator = character.createdBy;

  const totalRating = character.ratings.reduce(
    (prev, rate) => prev + rate.value,
    0,
  );

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

  const averageRating = totalRating / character._count.ratings;
  return (
    <main className={clsx("flex w-full grow overflow-hidden", GAP_COLOR)}>
      <div
        id="sidebar"
        className={clsx(
          "flex w-1/6 grow flex-col justify-between border-r border-neutral-700",
          SECONDARY,
        )}
      >
        <div className="flex flex-col divide-y divide-neutral-700">
          <button
            onClick={() => router.back()}
            type="button"
            aria-label="Return to previous page"
            className={clsx(
              "flex cursor-pointer items-center justify-between p-4 text-lg hover:brightness-125",
              SECONDARY,
            )}
          >
            <span>Return</span>
            <IoMdArrowRoundBack />
          </button>
          <Link
            className={clsx(
              "flex cursor-pointer items-center justify-center gap-4 p-4 text-lg not-2xl:flex-col hover:brightness-125",
              SECONDARY,
            )}
            href={isCreator ? "" : `/characters/${character.id}/rate`}
          >
            <div className="flex text-2xl">
              {averageRating > 0 && averageRating < 1 ? (
                <IoIosStarHalf className="stroke-yellow-300 stroke-20 text-yellow-300" />
              ) : (
                <IoIosStar
                  className={`${
                    averageRating >= 1 ? "text-yellow-300" : "text-transparent"
                  } stroke-yellow-300 stroke-20`}
                />
              )}
              {averageRating > 1 && averageRating < 2 ? (
                <IoIosStarHalf className="stroke-yellow-300 stroke-20 text-yellow-300" />
              ) : (
                <IoIosStar
                  className={`${
                    averageRating >= 2 ? "text-yellow-300" : "text-transparent"
                  } stroke-yellow-300 stroke-20`}
                />
              )}
              {averageRating > 2 && averageRating < 3 ? (
                <IoIosStarHalf className="stroke-yellow-300 stroke-20 text-yellow-300" />
              ) : (
                <IoIosStar
                  className={`${
                    averageRating >= 3 ? "text-yellow-300" : "text-transparent"
                  } stroke-yellow-300 stroke-20`}
                />
              )}

              {averageRating > 3 && averageRating < 4 ? (
                <IoIosStarHalf className="stroke-yellow-300 stroke-20 text-yellow-300" />
              ) : (
                <IoIosStar
                  className={`${
                    averageRating >= 4 ? "text-yellow-300" : "text-transparent"
                  } stroke-yellow-300 stroke-20`}
                />
              )}
              {averageRating > 4 && averageRating < 5 ? (
                <IoIosStarHalf className="stroke-yellow-300 stroke-20 text-yellow-300" />
              ) : (
                <IoIosStar
                  className={`${
                    averageRating >= 5 ? "text-yellow-300" : "text-transparent"
                  } stroke-yellow-300 stroke-20`}
                />
              )}
            </div>
            <p className="text-neutral-400">
              <span className="text-white">{averageRating || 0}</span> out of 5
              ({character._count.ratings})
            </p>
          </Link>
          <div className="flex flex-col gap-2 p-2">
            <Link
              href={`/characters/${characterId}`}
              className={`flex cursor-pointer items-center gap-2 rounded bg-neutral-800 p-2 hover:brightness-125 ${activePage === undefined ? "brightness-125" : ""}`}
            >
              <FaHammer />
              Builder
            </Link>
            <Link
              href={`/characters/${characterId}/description`}
              className={`flex cursor-pointer items-center gap-2 rounded bg-neutral-800 p-2 hover:brightness-125 ${activePage === "description" ? "brightness-125" : ""}`}
            >
              <FaPencil />
              Description
            </Link>
            <Link
              href={`/characters/${characterId}/settings`}
              className={`flex cursor-pointer items-center gap-2 rounded bg-neutral-800 p-2 hover:brightness-125 ${activePage === "settings" ? "brightness-125" : ""}`}
            >
              <FaCog />
              Settings
            </Link>
          </div>
          <div className="flex justify-center p-4">
            <button
              className={`w-11/12 cursor-pointer rounded border px-2 py-1 text-lg transition-all hover:brightness-125 not-disabled:hover:scale-105 not-disabled:active:scale-95 disabled:cursor-not-allowed disabled:border-neutral-600 disabled:bg-neutral-700 disabled:opacity-40 ${(hasChanges && isCreator && "border-green-600 bg-green-700") || ""} ${(!isCreator && "border-cyan-500 bg-cyan-600") || ""}`}
              onClick={
                isCreator
                  ? () => {
                      setHasChanges(!hasChanges);
                      save();
                    }
                  : clone
              }
              disabled={isSaving || isCloning || (!hasChanges && isCreator)}
            >
              {isCreator
                ? `${isSaving ? "Saving..." : "Save"}`
                : `${isCloning ? "Cloning..." : "Clone"}`}
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-2 border-t border-neutral-700 p-4">
          <Image
            src={
              character?.createdBy.image ??
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
            }
            width={100}
            height={100}
            alt="creator pfp"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            <Link
              href={`/users/${creator.id}`}
              className="text-sm hover:underline"
            >
              By {character?.createdBy.name}
            </Link>
            {character.clonedFrom ? (
              <Link
                href={`/characters/${character.clonedFrom}`}
                className="text-xs text-cyan-400 underline"
              >
                Cloned from
              </Link>
            ) : (
              <p className="text-xs text-neutral-700">{characterId}</p>
            )}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "scrollbar flex w-5/6 flex-col gap-2 overflow-x-hidden overflow-y-scroll",
          GAP_COLOR,
        )}
      >
        <div
          id="header"
          className="mx-12 mt-2 flex min-h-16 items-center justify-between"
        >
          <div className="flex h-full items-center gap-2">
            <h1 className="truncate text-2xl">{character.name}</h1>
            <select
              className="cursor-pointer rounded border border-neutral-700 bg-neutral-800 px-2 py-1"
              aria-label="Role"
              value={formData?.role ?? ""}
              onChange={(e) => {
                setFormData({ ...formData, role: e.target.value });
              }}
            >
              <option value="">Role</option>
              <option value="dps">DPS</option>
              <option value="healer">Healer</option>
              <option value="tank">Tank</option>
            </select>
          </div>
          <div className="flex h-full items-center gap-2">
            <button
              className={`cursor-pointer rounded border px-2 py-1 transition-all hover:brightness-125 not-disabled:hover:scale-105 not-disabled:active:scale-95 disabled:cursor-not-allowed disabled:border-neutral-600 disabled:bg-neutral-700 disabled:opacity-40 ${hasChanges && isCreator && "border-green-600 bg-green-700"} ${!isCreator && "border-cyan-500 bg-cyan-600"}`}
              onClick={
                isCreator
                  ? () => {
                      setHasChanges(!hasChanges);
                      save();
                    }
                  : clone
              }
              disabled={isSaving || isCloning || (!hasChanges && isCreator)}
            >
              {isCreator ? `Save` : `${isCloning ? "Cloning..." : "Clone"}`}
            </button>
            {isCreator ? (
              ""
            ) : (
              <Link
                className="flex cursor-pointer items-center justify-center gap-1 rounded border border-neutral-700 bg-neutral-800 px-2 py-1 transition-all hover:scale-105 hover:brightness-125 active:scale-95"
                href={`/characters/${character.id}/rate`}
              >
                <IoIosStarOutline />
                Rate
              </Link>
            )}
            <button
              className="flex cursor-pointer items-center justify-center rounded border border-neutral-700 bg-neutral-800 p-1 transition-all hover:brightness-125 active:scale-95"
              aria-label="Share"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            >
              <IoMdShare />
            </button>
          </div>
        </div>
        <div className={clsx("mx-12 mb-2 flex grow gap-12", GAP_COLOR)}>
          <div id="display" className="w-1/3">
            <div className="flex flex-col items-center gap-2 rounded border border-neutral-700 bg-neutral-800 p-2">
              <div className="relative flex gap-1 rounded-full border border-neutral-600 bg-neutral-700 p-2">
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
              <div className="flex gap-2">
                <div className={clsx("relative h-82 w-32")}>
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
                    className={`active:scale-[98%] ${weaponData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 shadow-yellow-600 hover:border-yellow-600" : `${weaponData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 shadow-blue-600 hover:border-blue-600" : `${weaponData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 shadow-green-600 hover:border-green-600" : `${weaponData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 shadow-purple-600 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-82 w-32 cursor-pointer items-center justify-center border transition-all ${activeSlot === "weapon" ? `border-2 ${weaponData?.rarity === "legendary" ? "border-yellow-600" : `${weaponData?.rarity === "epic" ? "border-purple-600" : `${weaponData?.rarity === "rare" ? "border-blue-600" : `${weaponData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
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
                            .replace(/(\s[a-z])/g, (match) =>
                              match.toUpperCase(),
                            )}
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                        <FaPlus />
                      </div>
                    )}
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <div className={clsx("relative h-26 w-26")}>
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
                      className={`active:scale-95 ${helmetData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 shadow-yellow-600 hover:border-yellow-600" : `${helmetData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 shadow-blue-600 hover:border-blue-600" : `${helmetData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 shadow-green-600 hover:border-green-600" : `${helmetData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 shadow-purple-600 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-26 w-26 cursor-pointer items-center justify-center border transition-all ${activeSlot === "helmet" ? `border-2 ${helmetData?.rarity === "legendary" ? "border-yellow-600" : `${helmetData?.rarity === "epic" ? "border-purple-600" : `${helmetData?.rarity === "rare" ? "border-blue-600" : `${helmetData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
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
                              .replace(/(\s[a-z])/g, (match) =>
                                match.toUpperCase(),
                              )}
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                          <FaPlus />
                        </div>
                      )}
                    </button>
                  </div>
                  <div className={clsx("relative h-26 w-26")}>
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
                      className={`active:scale-95 ${chestData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 shadow-yellow-600 hover:border-yellow-600" : `${chestData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 shadow-blue-600 hover:border-blue-600" : `${chestData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 shadow-green-600 hover:border-green-600" : `${chestData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 shadow-purple-600 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-26 w-26 cursor-pointer items-center justify-center border transition-all ${activeSlot === "chest" ? `border-2 ${chestData?.rarity === "legendary" ? "border-yellow-600" : `${chestData?.rarity === "epic" ? "border-purple-600" : `${chestData?.rarity === "rare" ? "border-blue-600" : `${chestData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
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
                              .replace(/(\s[a-z])/g, (match) =>
                                match.toUpperCase(),
                              )}
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                          <FaPlus />
                        </div>
                      )}
                    </button>
                  </div>
                  <div className={clsx("relative h-26 w-26")}>
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
                      className={`active:scale-95 ${bootsData?.rarity === "legendary" ? "bg-radial from-neutral-700 from-10% to-yellow-600/30 shadow-yellow-600 hover:border-yellow-600" : `${bootsData?.rarity === "rare" ? "bg-radial from-neutral-700 from-10% to-blue-600/30 shadow-blue-600 hover:border-blue-600" : `${bootsData?.rarity === "common" ? "bg-radial from-neutral-700 from-10% to-green-600/30 shadow-green-600 hover:border-green-600" : `${bootsData?.rarity === "epic" ? "bg-radial from-neutral-700 from-10% to-purple-600/30 shadow-purple-600 hover:border-purple-600" : "bg-neutral-700 hover:border-cyan-600"}`}`}`} relative flex h-26 w-26 cursor-pointer items-center justify-center border transition-all ${activeSlot === "boots" ? `border-2 ${bootsData?.rarity === "legendary" ? "border-yellow-600" : `${bootsData?.rarity === "epic" ? "border-purple-600" : `${bootsData?.rarity === "rare" ? "border-blue-600" : `${bootsData?.rarity === "common" ? "border-green-600" : "border-cyan-600"}`}`}`}` : "border-neutral-600"}`}
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
                              .replace(/(\s[a-z])/g, (match) =>
                                match.toUpperCase(),
                              )}
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                          <FaPlus />
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative h-24 w-60">
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
                  className={`relative flex h-24 w-60 cursor-pointer items-center justify-center border bg-neutral-700 transition-all hover:border-cyan-600 active:scale-95 ${activeSlot === "drifter" ? "border-2 border-cyan-600" : "border-neutral-600"}`}
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
                          .replace(/(\s[a-z])/g, (match) =>
                            match.toUpperCase(),
                          )}
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 text-neutral-500 shadow-md">
                      <FaPlus />
                    </div>
                  )}
                </button>
              </div>
              <div className="flex w-60 grow flex-col gap-2 border border-neutral-600 bg-neutral-700 p-2">
                <h2 className="w-full text-center">
                  Stats <span className="text-neutral-400">(0)</span>
                </h2>
                <div className="flex w-full grow flex-col gap-2">
                  <div className="mx-4 flex flex-col gap-1 rounded-lg bg-neutral-800 p-2 text-center">
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
                                            (formData?.builds[activeBuildIndex]
                                              ?.data.stats.strength ?? 0) - 1,
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
                            ?.strength
                        }
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
                                            (formData?.builds[activeBuildIndex]
                                              ?.data.stats.strength ?? 0) + 1,
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
                  <div className="mx-4 flex flex-col gap-1 rounded-lg bg-neutral-800 p-2 text-center">
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
                                            (formData?.builds[activeBuildIndex]
                                              ?.data.stats.agility ?? 0) - 1,
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
                            ?.agility
                        }
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
                                            (formData?.builds[activeBuildIndex]
                                              ?.data.stats.agility ?? 0) + 1,
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
                  <div className="mx-4 flex flex-col gap-1 rounded-lg bg-neutral-800 p-2 text-center">
                    <h3 className="text-sm">
                      Intelligence{" "}
                      <span>({drifterData?.intBonus ?? "0.0"})</span>
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
                                            (formData?.builds[activeBuildIndex]
                                              ?.data.stats.intelligence ?? 0) -
                                            1,
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
                                            (formData?.builds[activeBuildIndex]
                                              ?.data.stats.intelligence ?? 0) +
                                            1,
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
          </div>
          <div id="editor" className="w-2/3">
            <div className="flex flex-col items-center">
              <div className="grid h-10 w-11/12 grid-cols-5 gap-2">
                <div
                  className={`flex items-center justify-center rounded-t-lg ${activeTab === "equipment" ? "scale-105 border border-b-0 border-neutral-700 bg-neutral-800" : "bg-neutral-900"}`}
                >
                  <button
                    className="h-full w-full cursor-pointer rounded-t-lg bg-neutral-800 hover:brightness-125"
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
                      if (activeTab != "description")
                        setActiveTab("description");
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
              <div className="h-fit w-full rounded border border-neutral-700 bg-neutral-800 break-all">
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
                {activeTab === "comments" && <CommentSection />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
