"use client";

import { IoIosStarOutline, IoMdShare } from "react-icons/io";
import Builder from "./_components/builder";
import { useBuildForm } from "./_components/buildFormContext";

const Builds = () => {
  const { character, isCreator, save, isSaving, clone, isCloning } =
    useBuildForm();

  if (!character) {
    return <div>Character not found.</div>;
  }

  return (
    <div className="flex grow flex-col bg-stone-950">
      <div className="flex justify-between p-2 text-lg">
        <div className="flex gap-4">
          <h2>{character.name}</h2>
          <h2>{character.role}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`cursor-pointer rounded px-2 py-1 ${isCreator ? "bg-green-600 hover:bg-green-700" : "bg-cyan-500 hover:bg-cyan-600"}`}
            onClick={isCreator ? save : clone}
            disabled={isSaving || isCloning}
          >
            {isCreator
              ? `${isSaving ? "Saving..." : "Save"}`
              : `${isCloning ? "Cloning..." : "Clone"}`}
          </button>
          {isCreator ? (
            ""
          ) : (
            <div className="flex items-center justify-center gap-1 rounded bg-stone-800 px-2 py-1">
              <IoIosStarOutline />
              Rate
            </div>
          )}
          <div className="flex aspect-square h-full items-center justify-center rounded bg-stone-800 p-1">
            <IoMdShare />
          </div>
        </div>
      </div>
      <Builder props={{ character, isCreator }} />
    </div>
  );
};

export default Builds;
