import Image from "next/image";
import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa6";
import data from "public/data.json";
import type { Character } from "~/types";

const CharacterCard = ({ character }: { character: Character }) => {
  if (!character) return null;

  const drifterData = character.builds.map((build) => ({
    drifter: build.data.drifter,
    data: Object.entries(data.drifter).find(
      ([key]) => key === build.data.drifter,
    ),
  }));

  return (
    <Link
      key={character.id}
      href={`/characters/${character.id}`}
      className="flex h-48 flex-col justify-between gap-2 rounded border border-neutral-800 bg-neutral-900 p-2 transition-all hover:scale-105 hover:brightness-125 active:scale-95"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="truncate">{character.name}</h3>
          {character.private ? <FaEyeSlash className="h-5 w-5" /> : null}
        </div>
        <p className="rounded border border-neutral-700 bg-neutral-800 p-1">
          {character.builds.length} / 3 Drifters
        </p>
        <div className="flex gap-1 text-sm">
          {Object.entries(drifterData).map(([key, entry]) =>
            entry.drifter !== "" ? (
              <div
                key={key + entry.drifter}
                className={`rounded border p-1 ${entry.data?.[1].type === "strength" ? "border-red-400 bg-red-400/20" : `${entry.data?.[1].type === "agility" ? "border-green-300 bg-green-300/20" : `${entry.data?.[1].type === "intelligence" ? "border-blue-300 bg-blue-300/20" : `${entry.data?.[1].type === "logistics" ? "border-yellow-200 bg-yellow-200/20" : "border-neutral-700 bg-neutral-800"}`}`}`}`}
              >
                {entry.drifter.charAt(0).toUpperCase() +
                  entry.drifter
                    .slice(1)
                    .replace(/_/g, " ")
                    .replace(/(\s[a-z])/g, (match) => match.toUpperCase())}
              </div>
            ) : null,
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          {character.role ? (
            <span className="rounded border border-neutral-700 bg-neutral-800 p-1">
              {character.role === "dps"
                ? character.role.toUpperCase()
                : character.role.charAt(0).toUpperCase() +
                  character.role.slice(1)}
            </span>
          ) : null}
          <span className="text-xs">
            {character.createdAt.toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Image
              src={
                character.createdBy.image ??
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
              }
              width={100}
              height={100}
              alt="creator pfp"
              className="h-6 w-6 rounded-full"
            />
            <h4 className="text-sm">{character.createdBy.name}</h4>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span>(0 Votes)</span>
            <div className="flex">
              <IoIosStarOutline className="h-4 w-4" />
              <IoIosStarOutline className="h-4 w-4" />
              <IoIosStarOutline className="h-4 w-4" />
              <IoIosStarOutline className="h-4 w-4" />
              <IoIosStarOutline className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
