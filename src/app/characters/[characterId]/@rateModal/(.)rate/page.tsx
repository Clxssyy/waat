"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useBuildForm } from "~/app/_components/buildFormContext";
import { api } from "~/trpc/react";

const RateModal = () => {
  const { character } = useBuildForm();
  const { data: session } = useSession();
  const router = useRouter();
  const [rating, setRating] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const addRating = api.character.addRating.useMutation({
    onSuccess: () => {
      router.replace(`/characters/${character!.id}`);
      router.refresh();
    },
    onError: (err) => {
      console.error("Rating failed: ", err.message);
      router.back();
    },
  });

  return (
    <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center bg-black/70">
      <div className="relative min-w-fit rounded border border-neutral-700 bg-neutral-800 p-4 sm:w-1/4">
        <button
          onClick={() => {
            router.back();
          }}
          className="absolute -top-7 -right-7 cursor-pointer p-1"
        >
          <IoClose className="text-2xl hover:text-red-400" />
        </button>
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-center text-lg font-bold">Rate this build</h2>
          <p className="w-72 text-center text-sm text-wrap text-neutral-400">
            Help the community see builds by boosting it in the search results
            and providing feedback to the creator!
          </p>
          <div className="flex flex-row-reverse rounded border border-neutral-600 bg-neutral-700 p-2">
            {Array.from({ length: 5 }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setRating((5 - i) as 0 | 1 | 2 | 3 | 4 | 5);
                }}
                className={`${rating >= 5 - i ? "text-yellow-300" : ""} peer cursor-pointer text-3xl text-transparent transition peer-hover:text-yellow-300 hover:text-yellow-300`}
              >
                <IoIosStar className="stroke-yellow-300 stroke-35" />
              </button>
            ))}
          </div>
          <button
            className={`cursor-pointer rounded border border-green-600 bg-green-700 px-2 py-1 transition-all hover:brightness-110 not-disabled:hover:scale-105 not-disabled:active:scale-95 disabled:cursor-not-allowed disabled:border-neutral-600 disabled:bg-neutral-700 disabled:opacity-40`}
            disabled={addRating.isPending || addRating.isSuccess}
            onClick={() => {
              if (rating === 0 || !session?.user.id) return;
              addRating.mutate({
                characterId: character!.id,
                value: rating,
              });
            }}
          >
            Submit
          </button>
          <button
            className={`cursor-pointer px-2 py-1 text-sm`}
            onClick={() => router.back()}
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateModal;
