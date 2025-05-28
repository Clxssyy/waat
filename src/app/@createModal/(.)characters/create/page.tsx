"use client";

import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { api } from "~/trpc/react";

const Create = () => {
  const router = useRouter();

  const characterCreate = api.character.create.useMutation({
    onSuccess: (data) => {
      router.push(`/characters/${data.characterId}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="absolute flex h-full w-full items-center justify-center bg-black/30">
      <div className="relative rounded border border-neutral-700 bg-neutral-800 p-4">
        <button
          onClick={() => {
            router.back();
          }}
          className="absolute -top-8 -right-8 cursor-pointer p-2 text-2xl hover:text-red-500"
        >
          <IoClose />
        </button>
        <div className="flex flex-col gap-2">
          <h2>Character Creation</h2>
          <input
            type="text"
            placeholder="Name"
            id="character_name_input"
            defaultValue=""
            maxLength={20}
            className="rounded border border-neutral-600 bg-neutral-700 px-2 py-1"
          />
          <select
            name=""
            id="character_role_input"
            defaultValue=""
            className="rounded border border-neutral-600 bg-neutral-700 px-2 py-1"
          >
            <option value="" hidden>
              Role
            </option>
            <option value="dps">DPS</option>
            <option value="healer">Healer</option>
            <option value="tank">Tank</option>
          </select>
          <button
            className="cursor-pointer rounded border border-green-600 bg-green-700 px-2 py-1 transition-all hover:scale-105 hover:brightness-125 active:scale-95 disabled:cursor-not-allowed disabled:border-neutral-600 disabled:bg-neutral-700 disabled:opacity-40"
            onClick={() => {
              characterCreate.mutate({
                name: (
                  document.getElementById(
                    "character_name_input",
                  ) as HTMLInputElement
                ).value,
                role: (
                  document.getElementById(
                    "character_role_input",
                  ) as HTMLSelectElement
                ).value,
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
