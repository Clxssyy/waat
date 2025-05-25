"use client";

import { IoIosStarOutline, IoMdShare } from "react-icons/io";
import Builder from "./_components/builder";
import { useBuildForm } from "./_components/buildFormContext";

const Builds = () => {
  const {
    character,
    isCreator,
    save,
    isSaving,
    clone,
    isCloning,
    formData,
    setFormData,
    hasChanges,
  } = useBuildForm();

  if (!character) {
    return <div>Character not found.</div>;
  }

  return (
    <div className="flex grow flex-col bg-neutral-950">
      <div className="mx-14 my-4 flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl">{character.name}</h2>
          <select
            name=""
            id=""
            className="rounded bg-neutral-800 px-2 py-1"
            defaultValue={formData.role ?? ""}
            onChange={(e) => {
              setFormData({ ...formData, role: e.target.value });
            }}
          >
            <option value="" hidden>
              Role
            </option>
            <option value="dps">DPS</option>
            <option value="healer">Healer</option>
            <option value="tank">Tank</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`cursor-pointer rounded px-2 py-1 hover:brightness-125 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:opacity-40 ${hasChanges && isCreator && "bg-green-600 hover:bg-green-700"} ${!isCreator && "bg-cyan-500 hover:bg-cyan-600"}`}
            onClick={isCreator ? save : clone}
            disabled={isSaving || isCloning || (!hasChanges && isCreator)}
          >
            {isCreator
              ? `${isSaving ? "Saving..." : "Save"}`
              : `${isCloning ? "Cloning..." : "Clone"}`}
          </button>
          {isCreator ? (
            ""
          ) : (
            <div className="flex items-center justify-center gap-1 rounded bg-neutral-800 px-2 py-1">
              <IoIosStarOutline />
              Rate
            </div>
          )}
          <div className="flex aspect-square h-full items-center justify-center rounded bg-neutral-800 p-1">
            <IoMdShare />
          </div>
        </div>
      </div>
      <Builder props={{ character, isCreator }} />
    </div>
  );
};

export default Builds;
