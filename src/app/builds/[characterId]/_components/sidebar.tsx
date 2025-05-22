"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCog } from "react-icons/fa";
import { FaHammer, FaPencil } from "react-icons/fa6";
import { IoIosStarOutline, IoMdArrowRoundBack } from "react-icons/io";
import { useBuildForm } from "./buildFormContext";

const Sidebar = () => {
  const pathname = usePathname();
  const pathSplit = pathname.split("/");
  const characterId = pathSplit[2];
  const activePage = pathSplit[3];
  const { character, isCreator, save, isSaving, clone, isCloning } =
    useBuildForm();

  if (!character) {
    return <div>Character not found.</div>;
  }

  const creator = character.createdBy;

  return (
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
              href={`/builds/${characterId}`}
              className={`texl-lg flex cursor-pointer items-center gap-2 rounded ${activePage === undefined ? "bg-white/10" : ""} p-2 hover:bg-white/15`}
            >
              <FaHammer />
              Builder
            </Link>
            <Link
              href={`/builds/${characterId}/description`}
              className={`texl-lg flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-white/5 ${activePage === "description" ? "bg-white/10" : ""}`}
            >
              <FaPencil />
              Description
            </Link>
            <Link
              href={`/builds/${characterId}/settings`}
              className={`texl-lg flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-white/5 ${activePage === "settings" ? "bg-white/10" : ""}`}
            >
              <FaCog />
              Settings
            </Link>
          </div>
        </div>
        <div className="texl-lg flex items-center justify-center p-4">
          <button
            className={`w-11/12 cursor-pointer rounded p-2 ${isCreator ? "bg-green-600 hover:bg-green-700" : "bg-cyan-500 hover:bg-cyan-600"}`}
            onClick={isCreator ? save : clone}
            disabled={isSaving || isCloning}
          >
            {isCreator
              ? `${isSaving ? "Saving..." : "Save"}`
              : `${isCloning ? "Cloning..." : "Clone"}`}
          </button>
        </div>
      </div>
      <div className="texl-lg flex flex-col items-center border-t-1 border-white/10 p-4">
        <div className="flex items-center gap-2">
          <Image
            src={
              character?.createdBy.image ??
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
            }
            width={100}
            height={100}
            alt="creator pfp"
            className="h-8 w-8 rounded-full"
          />
          <Link href={`/users/${creator.id}`}>
            By <span className="underline">{character?.createdBy.name}</span>
          </Link>
        </div>
        <p className="text-xs text-stone-600">{characterId}</p>
      </div>
    </div>
  );
};

export default Sidebar;
