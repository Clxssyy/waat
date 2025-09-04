"use client";

import { IoIosStarOutline, IoMdShare } from "react-icons/io";
import { useBuildForm } from "./buildFormContext";
import { notFound } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const BuilderHeader = () => {
  const {
    character,
    characterData,
    setCharacterData,
    setHasChanges,
    save,
    isSaving,
    isCloning,
    hasChanges,
    isCreator,
    clone,
  } = useBuildForm();

  if (!character) notFound();

  return (
    <header className="mx-2 flex h-16 shrink-0 items-center gap-2">
      <h1 className="max-w-1/4 truncate text-2xl">{character.name}</h1>
      <div className="flex grow justify-between">
        <select
          className="hidden cursor-pointer rounded border border-neutral-700 bg-neutral-800 px-2 py-1 outline-none sm:block"
          aria-label="Role"
          value={characterData?.role ?? ""}
          onChange={(e) => {
            setCharacterData({ ...characterData, role: e.target.value });
          }}
        >
          <option value="">Role</option>
          <option value="dps">DPS</option>
          <option value="healer">Healer</option>
          <option value="tank">Tank</option>
        </select>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            className={clsx(
              "cursor-pointer rounded border px-2 py-1 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:border-neutral-600 disabled:bg-neutral-700 disabled:opacity-40",
              hasChanges && isCreator && "border-green-500 bg-green-600",
              !isCreator && "border-cyan-300 bg-cyan-400",
            )}
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
              className="flex cursor-pointer items-center justify-center gap-1 rounded border border-neutral-700 bg-neutral-800 px-2 py-1 transition-all hover:brightness-125"
              href={`/characters/${character.id}/rate`}
            >
              <IoIosStarOutline />
              Rate
            </Link>
          )}
          <button
            className="flex aspect-square h-[34px] cursor-pointer items-center justify-center rounded border border-neutral-700 bg-neutral-800 transition-all hover:brightness-125"
            aria-label="Share"
            onClick={async () => {
              await navigator.clipboard.writeText(window.location.href);
            }}
          >
            <IoMdShare />
          </button>
        </div>
      </div>
    </header>
  );
};

export default BuilderHeader;
