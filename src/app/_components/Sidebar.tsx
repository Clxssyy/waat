"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCog } from "react-icons/fa";
import { FaHammer, FaPencil } from "react-icons/fa6";
import { IoIosStar, IoIosStarHalf, IoMdArrowRoundBack } from "react-icons/io";
import { useBuildForm } from "./buildFormContext";

const Sidebar = () => {
  const pathname = usePathname();
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
  } = useBuildForm();

  if (!character) {
    return <div>Character not found.</div>;
  }

  const creator = character.createdBy;

  const totalRating = character.ratings.reduce(
    (prev, rate) => prev + rate.value,
    0,
  );

  const averageRating = totalRating / character._count.ratings;

  return (
    <div className="flex min-w-1/6 flex-col justify-between border-r border-neutral-700 bg-neutral-800">
      <div className="flex flex-col divide-y divide-neutral-700">
        <Link
          href="/characters"
          className="flex w-full items-center justify-between bg-neutral-800 p-4 text-lg hover:brightness-125"
        >
          <span>Return</span>
          <IoMdArrowRoundBack />
        </Link>
        <div className="flex flex-col divide-y divide-neutral-700">
          <Link
            className="texl-lg flex cursor-pointer items-center justify-center gap-4 bg-neutral-800 py-4 hover:brightness-125"
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
              className={`texl-lg flex cursor-pointer items-center gap-2 rounded ${activePage === undefined ? "bg-neutral-700" : "bg-neutral-800"} p-2 hover:brightness-125`}
            >
              <FaHammer />
              Builder
            </Link>
            <Link
              href={`/characters/${characterId}/description`}
              className={`texl-lg flex cursor-pointer items-center gap-2 rounded p-2 hover:brightness-125 ${activePage === "description" ? "bg-neutral-700" : "bg-neutral-800"}`}
            >
              <FaPencil />
              Description
            </Link>
            <Link
              href={`/characters/${characterId}/settings`}
              className={`texl-lg flex cursor-pointer items-center gap-2 rounded p-2 hover:brightness-125 ${activePage === "settings" ? "bg-neutral-700" : "bg-neutral-800"}`}
            >
              <FaCog />
              Settings
            </Link>
          </div>
        </div>
        <div className="texl-lg flex items-center justify-center p-4">
          <button
            className={`w-11/12 cursor-pointer rounded border px-2 py-1 transition-all hover:brightness-125 not-disabled:hover:scale-105 not-disabled:active:scale-95 disabled:cursor-not-allowed disabled:border-neutral-600 disabled:bg-neutral-700 disabled:opacity-40 ${(hasChanges && isCreator && "border-green-600 bg-green-700") || ""} ${(!isCreator && "border-cyan-500 bg-cyan-600") || ""}`}
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
      <div className="texl-lg flex flex-col items-center border-t-1 border-white/10 p-4">
        <div className="flex items-center gap-2">
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
              <p className="text-xs text-neutral-500">{characterId}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
