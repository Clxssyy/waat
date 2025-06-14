"use client";

import { IoIosStarOutline, IoMdShare } from "react-icons/io";
import { useBuildForm } from "./buildFormContext";
import { notFound } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const BuilderHeader = () => {
  const {
    character,
    formData,
    setFormData,
    setHasChanges,
    save,
    isSaving,
    isCloning,
    hasChanges,
    isCreator,
    clone,
  } = useBuildForm();

  if (!character) notFound();
  const GAP_COLOR = "bg-neutral-950";

  return (
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
  );
};

export default BuilderHeader;
