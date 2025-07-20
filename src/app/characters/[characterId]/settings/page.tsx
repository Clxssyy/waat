"use client";

import Link from "next/link";
import { FaTrash } from "react-icons/fa6";
import { useBuildForm } from "~/app/_components/buildFormContext";

const SettingsPage = () => {
  const { characterData, setCharacterData, isCreator } = useBuildForm();

  return (
    <div className="m-2 flex flex-1 flex-col gap-4 rounded border border-neutral-600 bg-neutral-700 p-2">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex flex-col gap-2">
        <div>
          <label htmlFor="name_input">Name</label>
          <input
            type="text"
            placeholder="Name"
            id="name_input"
            value={characterData?.name}
            maxLength={30}
            onChange={(e) => {
              setCharacterData((prev) =>
                prev
                  ? {
                      ...prev,
                      name: e.target.value,
                    }
                  : prev,
              );
            }}
            className="w-full rounded border bg-neutral-800 p-2"
          />
        </div>
        <div>
          <label htmlFor="role_select">
            Role <span className="text-neutral-400">(Optional)</span>
          </label>
          <select
            className="w-full rounded bg-neutral-800 p-2"
            id="role_select"
            value={characterData?.role ?? ""}
            onChange={(e) => {
              setCharacterData((prev) =>
                prev
                  ? {
                      ...prev,
                      role: e.target.value,
                    }
                  : prev,
              );
            }}
          >
            <option value="">Role</option>
            <option value="dps">DPS</option>
            <option value="healer">Healer</option>
            <option value="tank">Tank</option>
          </select>
        </div>
        {isCreator ? (
          <>
            <div>
              <label htmlFor="privacy_select">Privacy</label>
              <select
                className="w-full rounded bg-neutral-800 p-2"
                id="privacy_select"
                value={characterData?.private.toString()}
                onChange={(e) => {
                  setCharacterData((prev) =>
                    prev
                      ? {
                          ...prev,
                          private: !!JSON.parse(e.target.value),
                        }
                      : prev,
                  );
                }}
              >
                <option value="true">Private</option>
                <option value="false">Public</option>
              </select>
            </div>
            <div className="flex justify-center">
              <Link
                className="flex cursor-pointer items-center justify-center gap-1 rounded border border-red-400 bg-red-500 p-2 font-bold transition-all hover:scale-105 hover:brightness-110 active:scale-95"
                href={`/characters/${characterData.id}/delete`}
              >
                <FaTrash />
                Delete
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SettingsPage;
