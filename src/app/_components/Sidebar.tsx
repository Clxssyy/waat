"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaCog, FaSave } from "react-icons/fa";
import { FaClone, FaHammer, FaPencil } from "react-icons/fa6";
import { IoIosStar, IoIosStarHalf, IoMdArrowRoundBack } from "react-icons/io";
import { useBuildForm } from "./buildFormContext";

const Sidebar = () => {
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
    <aside className="flex w-1/8 shrink-0 flex-col justify-between border-r border-neutral-700 bg-neutral-800">
      <div className="hidden-scrollbar flex flex-col divide-y divide-neutral-700 overflow-y-scroll">
        <button
          onClick={() => router.push("/characters")}
          type="button"
          aria-label="Return to previous page"
          className="flex cursor-pointer items-center justify-center bg-neutral-800 p-4 text-lg hover:brightness-125 lg:justify-between"
        >
          <p className="hidden lg:block">Return</p>
          <IoMdArrowRoundBack />
        </button>
        <Link
          className="flex cursor-pointer items-center justify-center gap-4 bg-neutral-800 p-4 not-2xl:flex-col hover:brightness-125"
          href={isCreator ? "" : `/characters/${character.id}/rate`}
        >
          <div className="hidden text-xl lg:flex">
            {Array.from({ length: 5 }).map((_, index) => {
              if (averageRating > index && averageRating < index + 1) {
                return (
                  <IoIosStarHalf
                    key={index}
                    className="stroke-yellow-300 stroke-20 text-yellow-300"
                  />
                );
              }
              return (
                <IoIosStar
                  key={index}
                  className={`${
                    averageRating >= index + 1
                      ? "text-yellow-300"
                      : "text-transparent"
                  } stroke-yellow-300 stroke-20`}
                />
              );
            })}
          </div>
          <p className="hidden text-center text-sm text-neutral-400 lg:block">
            <span className="text-white">{averageRating || 0}</span> out of 5 (
            {character._count.ratings})
          </p>
          <IoIosStar className="lg:hidden" />
        </Link>
        <div className="flex flex-col gap-2 p-2">
          <Link
            href={`/characters/${characterId}`}
            className={`flex cursor-pointer items-center gap-2 rounded bg-neutral-800 p-2 not-lg:justify-center hover:brightness-125 ${activePage === undefined ? "brightness-125" : ""}`}
            replace
          >
            <FaHammer />
            <p className="hidden lg:block">Builder</p>
          </Link>
          <Link
            href={`/characters/${characterId}/description`}
            className={`flex cursor-pointer items-center gap-2 rounded bg-neutral-800 p-2 not-lg:justify-center hover:brightness-125 ${activePage === "description" ? "brightness-125" : ""}`}
            replace
          >
            <FaPencil />
            <p className="hidden lg:block">Description</p>
          </Link>
          <Link
            href={`/characters/${characterId}/settings`}
            className={`flex cursor-pointer items-center gap-2 rounded bg-neutral-800 p-2 not-lg:justify-center hover:brightness-125 ${activePage === "settings" ? "brightness-125" : ""}`}
            replace
          >
            <FaCog />
            <p className="hidden lg:block">Settings</p>
          </Link>
        </div>
        <div className="flex justify-center p-2">
          <button
            className={`flex w-full cursor-pointer items-center justify-center gap-1 rounded border p-2 transition-all hover:brightness-125 not-disabled:hover:scale-[102%] not-disabled:active:scale-[98%] disabled:cursor-not-allowed disabled:border-neutral-600 disabled:bg-neutral-700 disabled:opacity-40 lg:w-full ${(hasChanges && isCreator && "border-green-500 bg-green-600") || ""} ${(!isCreator && "border-cyan-300 bg-cyan-400") || ""}`}
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
            {isCreator ? <FaSave /> : <FaClone />}
            <p className="hidden lg:block">
              {isCreator
                ? `${isSaving ? "Saving..." : "Save"}`
                : `${isCloning ? "Cloning..." : "Clone"}`}
            </p>
          </button>
        </div>
      </div>
      <div className="flex h-16 items-center justify-center gap-2 border-t border-neutral-700 p-2">
        <Link
          href={`/users/${creator.id}`}
          className="flex cursor-pointer items-center"
        >
          <Image
            src={character?.createdBy.image ?? "/default-avatar.jpg"}
            width={100}
            height={100}
            alt="creator pfp"
            className="h-10 w-10 rounded-full"
          />
        </Link>
        <div className="hidden flex-col justify-center lg:flex">
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
            <p className="text-xs break-all text-neutral-600">{characterId}</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
