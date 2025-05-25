"use client";

import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { api } from "~/trpc/react";

const Create = () => {
  const router = useRouter();

  const characterCreate = api.character.create.useMutation({
    onSuccess: async (data) => {
      await router.push(`/builds/${data.characterId}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="absolute flex h-full w-full items-center justify-center bg-black/20">
      <div className="relative rounded bg-neutral-800 p-4">
        <button
          onClick={() => {
            router.back();
          }}
          className="absolute -top-8 -right-8 p-2 text-2xl"
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
            className="rounded bg-white/5 px-2 py-1 text-neutral-500"
          />
          <select
            name=""
            id="character_role_input"
            defaultValue=""
            className="rounded bg-white/5 px-2 py-1 text-neutral-500"
          >
            <option value="" hidden>
              Role
            </option>
            <option value="dps">DPS</option>
            <option value="healer">Healer</option>
            <option value="tank">Tank</option>
          </select>
          {/* Add input fields */}
          <button
            className="rounded bg-green-600 px-2 py-1"
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
            disabled={characterCreate.isPending}
          >
            {characterCreate.isPending ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
