"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import data from "public/data.json";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { useEffect, useState } from "react";

type Characters = inferRouterOutputs<AppRouter>["character"]["getAll"];

type Filter = {
  roleFilter: string;
  drifterFilter: string;
  nameFilter: string;
};

const Search = ({ characters }: { characters: Characters }) => {
  const [filter, setFilter] = useState<Filter>({
    roleFilter: "",
    drifterFilter: "",
    nameFilter: "",
  });
  const [filteredCharacters, setFilteredCharacters] =
    useState<Characters>(characters);

  useEffect(() => {
    setFilteredCharacters(
      characters.filter((character) => {
        const roleCondition =
          character.role === filter.roleFilter || filter.roleFilter === "";
        const drifterCondition =
          character.builds.filter((build) => {
            build.data.drifter === filter.drifterFilter;
          }).length >= 1 || filter.drifterFilter === "";
        const nameCondition =
          character.name.toLowerCase().includes(filter.nameFilter) ||
          character.createdBy.name?.toLowerCase().includes(filter.nameFilter);

        return roleCondition && drifterCondition && nameCondition;
      }),
    );
  }, [filter]);
  return (
    <>
      <div className="flex justify-center">
        <form action="" className="flex w-2/5 flex-col gap-2 p-4">
          <div className="flex gap-2">
            <select
              className="w-1/5 rounded border border-neutral-600 bg-neutral-700 px-4 py-1 text-lg"
              value={filter.roleFilter}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  roleFilter: e.currentTarget.value,
                });
              }}
            >
              <option value="" hidden>
                Role
              </option>
              <option value="dps">DPS</option>
              <option value="healer">Healer</option>
              <option value="tank">Tank</option>
            </select>
            <select
              className="grow rounded border border-neutral-600 bg-neutral-700 px-4 py-1 text-lg"
              value={filter.drifterFilter}
              onChange={(e) => {
                setFilter({ ...filter, drifterFilter: e.currentTarget.value });
              }}
            >
              <option value="" hidden>
                Drifter
              </option>
              {Object.entries(data.drifter).map(([drifterId, drifter]) => (
                <option key={drifterId} value={drifterId}>
                  {drifterId.charAt(0).toUpperCase() +
                    drifterId.slice(1).replaceAll("_", " ")}
                </option>
              ))}
            </select>
            <button
              type="reset"
              className="rounded border border-neutral-600 bg-neutral-700 px-2 text-lg"
              onClick={() => {
                setFilter({
                  roleFilter: "",
                  nameFilter: "",
                  drifterFilter: "",
                });
              }}
            >
              <IoClose />
            </button>
          </div>
          <div>
            <input
              type="search"
              name=""
              id="build_search_box"
              placeholder="Search..."
              className="w-full rounded border border-neutral-600 bg-neutral-700 p-1 text-lg"
              value={filter.nameFilter}
              onChange={(e) => {
                setFilter({ ...filter, nameFilter: e.currentTarget.value });
              }}
            />
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-lg font-bold">Builds</h2>
        <div className="grid grid-cols-3 gap-2">
          {filteredCharacters.map((build) => (
            <Link
              key={build.id}
              href={`/builds/${build.id}`}
              className="flex h-48 flex-col justify-between gap-2 rounded border border-neutral-800 bg-neutral-900 p-2 transition-all hover:scale-105 hover:brightness-125 active:scale-95"
            >
              <div className="flex flex-col gap-2">
                <h3>{build.name}</h3>
                <span className="rounded border border-neutral-700 bg-neutral-800 p-1">
                  {build.builds.length} / 3 Drifters
                </span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  {build.role ? (
                    <span className="rounded border border-neutral-700 bg-neutral-800 p-1">
                      {build.role.charAt(0).toUpperCase() + build.role.slice(1)}
                    </span>
                  ) : null}
                  <span className="text-xs">
                    {build.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Image
                      src={
                        build.createdBy.image ??
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
                      }
                      width={100}
                      height={100}
                      alt="creator pfp"
                      className="h-6 w-6 rounded-full"
                    />
                    <h4 className="text-sm">{build.createdBy.name}</h4>
                  </div>
                  <div className="flex items-center text-sm">
                    <span>(0 Votes)</span>
                    <IoIosStarOutline className="h-4 w-4" />
                    <IoIosStarOutline className="h-4 w-4" />
                    <IoIosStarOutline className="h-4 w-4" />
                    <IoIosStarOutline className="h-4 w-4" />
                    <IoIosStarOutline className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
