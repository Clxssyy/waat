"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { api } from "~/trpc/react";
import type { characterRoles } from "~/types";

const Create = () => {
  const router = useRouter();
  const [nameInput, setNameInput] = useState<string>("Default Character");
  const [roleInput, setRoleInput] = useState<characterRoles>("");

  const characterCreate = api.character.create.useMutation({
    onSuccess: (data) => {
      router.push(`/characters/${data.characterId}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="absolute z-20 flex h-full w-full items-center justify-center bg-black/70">
      <div className="relative w-1/4 rounded border border-neutral-700 bg-neutral-800 p-4">
        <button
          onClick={() => {
            router.back();
          }}
          className="absolute -top-6 -right-6 cursor-pointer p-1"
        >
          <IoClose className="text-xl hover:text-red-400" />
        </button>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-lg font-bold">Create Character</h2>
          <div className="flex w-full flex-col">
            <label htmlFor="name_input" className="text-sm text-neutral-200">
              Character Name
            </label>
            <input
              type="text"
              placeholder="Character Name"
              id="name_input"
              value={nameInput}
              maxLength={30}
              className="w-full rounded border border-neutral-600 bg-neutral-700 px-2 py-1"
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
          <div className="flex w-full flex-col">
            <label htmlFor="role_input" className="text-sm text-neutral-200">
              Role <span className="text-neutral-400">(Optional)</span>
            </label>
            <select
              className="grow rounded border border-neutral-600 bg-neutral-700 px-2 py-1"
              id="role_input"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value as characterRoles)}
            >
              <option value="">Role</option>
              <option value="dps">DPS</option>
              <option value="healer">Healer</option>
              <option value="tank">Tank</option>
            </select>
          </div>
          <button
            className="w-full cursor-pointer rounded border border-green-600 bg-green-700 px-2 py-1 transition-all hover:scale-105 hover:brightness-125 active:scale-95 disabled:cursor-not-allowed disabled:border-neutral-600 disabled:bg-neutral-700 disabled:opacity-40"
            onClick={() => {
              characterCreate.mutate({
                name: nameInput,
                role: roleInput,
              });
            }}
            disabled={characterCreate.isPending || characterCreate.isSuccess}
          >
            {characterCreate.isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
