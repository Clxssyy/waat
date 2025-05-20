import { api } from "~/trpc/server";
import { auth } from "~/server/auth";
import {
  IoMdArrowRoundBack,
  IoIosStarOutline,
  IoMdShare,
} from "react-icons/io";
import { FaHammer, FaPencil } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { FaCog } from "react-icons/fa";
import Builder from "./_components/builder";

const Builds = async ({ params }: { params: { characterId: string } }) => {
  const session = await auth();
  const { characterId } = await params;

  const character = await api.character.getById({
    characterId: characterId,
  });
  if (!character) {
    return <div>Character not found</div>;
  }

  const user = await api.user.getById({
    userId: character.userId,
  });

  const isCreator = user?.id === session?.user.id;

  return (
    <main className="flex w-full grow">
      <div className="flex w-1/8 flex-col justify-between bg-stone-800">
        <div className="flex flex-col divide-y divide-white/10">
          <Link
            href="/builds"
            className="flex w-full items-center justify-between p-4 text-lg hover:bg-white/5"
          >
            <span>Return</span>
            <IoMdArrowRoundBack />
          </Link>
          <div className="flex flex-col divide-y divide-white/10">
            <div className="texl-lg flex items-center justify-center gap-4 py-4">
              <div className="flex">
                <IoIosStarOutline className="h-5 w-5" />
                <IoIosStarOutline className="h-5 w-5" />
                <IoIosStarOutline className="h-5 w-5" />
                <IoIosStarOutline className="h-5 w-5" />
                <IoIosStarOutline className="h-5 w-5" />
              </div>
              <p className="text-white/50">
                <span className="text-white">0.0</span> out of 5 (0)
              </p>
            </div>
            <div className="flex flex-col gap-2 p-2">
              <Link
                href={`/builds/${character.id}`}
                className={`texl-lg flex cursor-pointer items-center gap-2 rounded bg-white/10 p-2 hover:bg-white/15`}
              >
                <FaHammer />
                Builder
              </Link>
              <Link
                href={`/builds/${character.id}/description`}
                className={`texl-lg flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-white/5`}
              >
                <FaPencil />
                Description
              </Link>
              <Link
                href={`/builds/${character.id}/settings`}
                className={`texl-lg flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-white/5`}
              >
                <FaCog />
                Settings
              </Link>
            </div>
          </div>
          <div className="texl-lg flex items-center justify-center p-4">
            <button
              className={`w-11/12 cursor-pointer rounded p-2 ${isCreator ? "bg-green-600 hover:bg-green-700" : "bg-cyan-500 hover:bg-cyan-600"}`}
            >
              {isCreator ? "Save" : "Clone"}
            </button>
          </div>
        </div>
        <div className="texl-lg flex flex-col items-center border-t-1 border-white/10 p-4">
          <div className="flex items-center gap-2">
            <Image
              src={user!.image || ""}
              width={100}
              height={100}
              alt="creator pfp"
              className="h-8 w-8 rounded-full"
            />
            <Link href={`/users/${user?.id}`}>
              By <span className="underline">{user!.name}</span>
            </Link>
          </div>
          <p className="text-xs text-stone-600">{character.id}</p>
        </div>
      </div>
      <div className="flex grow flex-col bg-stone-950">
        <div className="flex justify-between p-2 text-lg">
          <div className="flex gap-4">
            <h2>{character.name}</h2>
            <h2>{character.role}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`cursor-pointer rounded px-2 py-1 ${isCreator ? "bg-green-600 hover:bg-green-700" : "bg-cyan-500 hover:bg-cyan-600"}`}
            >
              {isCreator ? "Save" : "Clone"}
            </div>
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
    </main>
  );
};

export default Builds;
