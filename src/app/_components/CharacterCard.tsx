import Image from "next/image";
import Link from "next/link";
import { FaEyeSlash } from "react-icons/fa6";
import data from "public/data.json";
import type { BuildData, CharacterCardInfo } from "~/types";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";

const CharacterCard = ({ character }: { character: CharacterCardInfo }) => {
  if (!character) return null;

  const drifterData = character.builds.map((build) => {
    const buildData = build.data as BuildData;

    return data.drifters.find(
      (drifter) => drifter.name === buildData?.drifter.name,
    );
  });

  const totalRating = character.ratings.reduce(
    (prev, rate) => prev + rate.value,
    0,
  );

  const averageRating = totalRating / character._count.ratings;

  return (
    <Link
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
          {drifterData.map((drifter, i) =>
            drifter?.name ? (
              <div
                key={character.id + "_" + drifter?.name + "_" + i}
                className={`rounded border p-1 ${drifter?.type === "strength" ? "border-red-400 bg-red-400/20" : `${drifter?.type === "agility" ? "border-green-400 bg-green-400/20" : `${drifter?.type === "intelligence" ? "border-blue-400 bg-blue-400/20" : `${drifter?.type === "logistics" ? "border-yellow-400 bg-yellow-400/20" : "border-neutral-700 bg-neutral-800"}`}`}`}`}
              >
                {drifter?.name}
              </div>
            ) : null,
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="flex items-end gap-2">
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
              src={character.createdBy.image ?? "/default-avatar.jpg"}
              width={100}
              height={100}
              alt="creator pfp"
              className="h-6 w-6 rounded-full"
            />
            <h4 className="text-sm">{character.createdBy.name}</h4>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-neutral-400">
              ({character._count.ratings})
            </span>
            <div className="flex text-lg">
              {Array.from({ length: 5 }).map((_, index) => {
                if (averageRating > index && averageRating < index + 1) {
                  return (
                    <IoIosStarHalf
                      key={index}
                      className="stroke-yellow-300 stroke-20 text-yellow-300"
                    />
                  );
                }
                return (
                  <IoIosStar
                    key={index}
                    className={`${
                      averageRating >= index + 1
                        ? "text-yellow-300"
                        : "text-transparent"
                    } stroke-yellow-300 stroke-20`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
