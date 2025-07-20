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
      (drifter) => drifter.name === buildData.drifter.name,
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
      className="flex h-full min-h-40 flex-col justify-between gap-2 rounded bg-gradient-to-br from-neutral-900 to-neutral-950 p-2 transition-all hover:scale-[102%] hover:brightness-110 active:scale-[98%]"
    >
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-1">
          <div className="flex items-center gap-1 overflow-hidden">
            <h3 className="grow truncate text-lg font-bold">
              {character.name}
            </h3>
            {character.private ? (
              <FaEyeSlash className="text-lg text-neutral-400" />
            ) : null}
          </div>
          {character.role ? (
            <span className="w-fit rounded border border-neutral-700 bg-neutral-800 p-1">
              {character.role === "dps"
                ? character.role.toUpperCase()
                : character.role.charAt(0).toUpperCase() +
                  character.role.slice(1)}
            </span>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-1">
          {drifterData.map((drifter, i) =>
            drifter?.name ? (
              <span
                key={character.id + "_" + drifter?.name + "_" + i}
                className={`rounded border px-2 py-1 text-sm ${drifter?.type === "strength" ? "border-red-400 bg-red-400/20" : `${drifter?.type === "agility" ? "border-green-400 bg-green-400/20" : `${drifter?.type === "intelligence" ? "border-blue-400 bg-blue-400/20" : `${drifter?.type === "logistics" ? "border-yellow-400 bg-yellow-400/20" : "border-neutral-700 bg-neutral-800"}`}`}`}`}
              >
                {drifter?.name}
              </span>
            ) : null,
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-between">
        <span className="text-xs">
          {character.createdAt.toLocaleDateString()}
        </span>
        <div className="flex flex-col">
          <div className="flex items-center justify-end gap-2">
            <h4 className="text-sm">{character.createdBy.name}</h4>
            <Image
              src={character.createdBy.image ?? "/default-avatar.jpg"}
              width={100}
              height={100}
              alt="creator pfp"
              className="h-6 w-6 rounded-full"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-neutral-400">
              ({character._count.ratings})
            </span>
            <div className="flex">
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
