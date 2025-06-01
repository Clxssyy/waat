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
    return {
      drifter: buildData?.drifter,
      data: Object.entries(data.drifter).find(
        ([key]) => key === buildData?.drifter,
      ),
    };
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
          <div className="flex items-center gap-1">
            <span className="text-sm text-neutral-400">
              ({character._count.ratings})
            </span>
            <div className="flex text-lg">
              {averageRating > 0 && averageRating < 1 ? (
                <IoIosStarHalf className="stroke-yellow-300 stroke-20 text-yellow-300" />
              ) : (
                <IoIosStar
                  className={`${
                    averageRating >= 1 ? "text-yellow-300" : "text-transparent"
                  } stroke-yellow-300 stroke-20`}
                />
              )}
              {averageRating > 1 && averageRating < 2 ? (
                <IoIosStarHalf className="stroke-yellow-300 stroke-20 text-yellow-300" />
              ) : (
                <IoIosStar
                  className={`${
                    averageRating >= 2 ? "text-yellow-300" : "text-transparent"
                  } stroke-yellow-300 stroke-20`}
                />
              )}
              {averageRating > 2 && averageRating < 3 ? (
                <IoIosStarHalf className="stroke-yellow-300 stroke-20 text-yellow-300" />
              ) : (
                <IoIosStar
                  className={`${
                    averageRating >= 3 ? "text-yellow-300" : "text-transparent"
                  } stroke-yellow-300 stroke-20`}
                />
              )}

              {averageRating > 3 && averageRating < 4 ? (
                <IoIosStarHalf className="stroke-yellow-300 stroke-20 text-yellow-300" />
              ) : (
                <IoIosStar
                  className={`${
                    averageRating >= 4 ? "text-yellow-300" : "text-transparent"
                  } stroke-yellow-300 stroke-20`}
                />
              )}
              {averageRating > 4 && averageRating < 5 ? (
                <IoIosStarHalf className="stroke-yellow-300 stroke-20 text-yellow-300" />
              ) : (
                <IoIosStar
                  className={`${
                    averageRating >= 5 ? "text-yellow-300" : "text-transparent"
                  } stroke-yellow-300 stroke-20`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
