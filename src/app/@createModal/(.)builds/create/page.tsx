"use client";

import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { api } from "~/trpc/react";

const Create = () => {
  const router = useRouter();

  const characterCreate = api.character.create.useMutation({
    onSuccess: async (data) => {
      await router.push(`/builds/${data.id}`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="absolute flex h-full w-full items-center justify-center bg-black/20">
      <div className="relative rounded bg-stone-800 p-4">
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
            className="rounded bg-white/5 px-2 py-1 text-stone-500"
          />
          <select
            name=""
            id=""
            className="rounded bg-white/5 px-2 py-1 text-stone-500"
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
                name: "",
                role: "",
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
