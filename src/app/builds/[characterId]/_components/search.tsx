"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import data from "public/data.json";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { useEffect, useState } from "react";
import CharacterCard from "~/app/_components/characterCard";

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
            build.data?.drifter === filter.drifterFilter;
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
              className="cursor-pointer rounded border border-neutral-600 bg-neutral-700 px-2 text-lg hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={
                filter.drifterFilter === "" &&
                filter.nameFilter === "" &&
                filter.nameFilter === ""
              }
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
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
