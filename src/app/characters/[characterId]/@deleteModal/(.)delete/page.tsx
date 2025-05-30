"use client";

import { useRouter } from "next/navigation";
import { ImWarning } from "react-icons/im";
import { IoClose } from "react-icons/io5";
import { useBuildForm } from "~/app/_components/buildFormContext";
import { api } from "~/trpc/react";

const Delete = () => {
  const { formData } = useBuildForm();
  const router = useRouter();
  const deleteCharacter = api.character.delete.useMutation({
    onSuccess: () => {
      router.replace("/characters");
    },
    onError: (err) => {
      console.error("Delete failed: ", err.message);
      router.refresh();
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
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/30">
            <ImWarning className="text-5xl text-red-400" />
          </div>
          <h2 className="text-lg font-bold">
            Are you sure you want to delete this character?
          </h2>
          <div className="flex gap-2">
            <button
              className="cursor-pointer rounded border border-red-400 bg-red-500 px-2 py-1 transition-all hover:scale-105 hover:brightness-125 active:scale-95 disabled:cursor-not-allowed disabled:border-neutral-600 disabled:bg-neutral-700 disabled:opacity-40"
              onClick={() => {
                deleteCharacter.mutate({
                  id: formData.id,
                });
              }}
              disabled={deleteCharacter.isPending || deleteCharacter.isSuccess}
            >
              {deleteCharacter.isPending ? "Deleting..." : "Delete"}
            </button>
            <button
              className="cursor-pointer rounded border border-neutral-600 bg-neutral-700 px-2 py-1 transition-all hover:scale-105 hover:brightness-125 active:scale-95 disabled:cursor-not-allowed disabled:border-neutral-600 disabled:bg-neutral-700 disabled:opacity-40"
              onClick={() => router.back()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
