import Image from "next/image";
import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";
import type { characterSchema } from "../_utils/types";
import type { z } from "zod";

type Character = z.infer<typeof characterSchema>;

const CharacterCard = ({ character }: { character: Character }) => {
  if (!character) return null;
  return (
    <Link
      key={character.id}
      href={`/characters/${character.id}`}
      className="flex h-48 flex-col justify-between gap-2 rounded border border-neutral-800 bg-neutral-900 p-2 transition-all hover:scale-105 hover:brightness-125 active:scale-95"
    >
      <div className="flex flex-col gap-2">
        <h3>{character.name}</h3>
        <span className="rounded border border-neutral-700 bg-neutral-800 p-1">
          {character.builds.length} / 3 Drifters
        </span>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          {character.role ? (
            <span className="rounded border border-neutral-700 bg-neutral-800 p-1">
              {character.role.charAt(0).toUpperCase() + character.role.slice(1)}
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
