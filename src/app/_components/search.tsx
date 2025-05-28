"use client";

import { IoClose } from "react-icons/io5";
import data from "public/data.json";
import { useCallback, useEffect, useState } from "react";
import CharacterCard from "~/app/_components/characterCard";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import type { Character } from "~/types";

type Filter = {
  roleFilter: string;
  drifterFilter: string;
  nameFilter: string;
};

const Search = ({ characters }: { characters: Character[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [filter, setFilter] = useState<Filter>({
    roleFilter: searchParams.get("role") ?? "",
    drifterFilter: searchParams.get("drifter") ?? "",
    nameFilter: searchParams.get("q") ?? "",
  });
  const [filteredCharacters, setFilteredCharacters] =
    useState<Character[]>(characters);

  const updateParams = useCallback(() => {
    const p = new URLSearchParams(searchParams.toString());
    if (filter.drifterFilter) p.set("drifter", filter.drifterFilter);
    else p.delete("drifter");
    if (filter.roleFilter) p.set("role", filter.roleFilter);
    else p.delete("role");
    if (filter.nameFilter) p.set("q", filter.nameFilter);
    else p.delete("q");

    router.replace(`${pathname}?${p.toString()}`);
  }, [router, filter, searchParams, pathname]);

  useEffect(() => {
    const filterCharacters = characters.filter((character) => {
      const roleCondition =
        character.role === filter.roleFilter || filter.roleFilter === "";
      const drifterCondition =
        character.builds.filter((build) => {
          return build.data?.drifter === filter.drifterFilter;
        }).length >= 1 || filter.drifterFilter === "";
      const nameCondition =
        character.name.toLowerCase().includes(filter.nameFilter) ||
        character.createdBy.name?.toLowerCase().includes(filter.nameFilter);

      return roleCondition && drifterCondition && nameCondition;
    });

    setFilteredCharacters(filterCharacters);
  }, [characters, filter]);

  useEffect(updateParams, [updateParams]);

  return (
    <>
      <div className="flex justify-center">
        <form className="flex w-3/5 flex-col gap-2 p-4">
          <div className="flex gap-2">
            <select
              className="w-1/5 cursor-pointer rounded border border-neutral-600 bg-neutral-700 px-4 py-1 text-lg"
              value={filter.roleFilter}
              aria-label="Role Filter"
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
              className="grow cursor-pointer rounded border border-neutral-600 bg-neutral-700 px-4 py-1 text-lg"
              value={filter.drifterFilter}
              onChange={(e) => {
                setFilter({ ...filter, drifterFilter: e.currentTarget.value });
              }}
            >
              <option value="" hidden>
                Drifter
              </option>
              {Object.entries(data.drifter).map(([drifterId]) => (
                <option key={drifterId} value={drifterId}>
                  {drifterId.charAt(0).toUpperCase() +
                    drifterId.slice(1).replaceAll("_", " ")}
                </option>
              ))}
            </select>
            <button
              type="reset"
              aria-label="Clear Filters"
              className="cursor-pointer rounded border border-neutral-600 bg-neutral-700 px-2 hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={
                filter.drifterFilter === "" &&
                filter.roleFilter === "" &&
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
              <IoClose className="text-lg" />
            </button>
          </div>
          <input
            type="search"
            aria-label="Search Input"
            placeholder="Search..."
            className="w-full rounded border border-neutral-600 bg-neutral-700 p-1 text-lg"
            value={filter.nameFilter}
            onChange={(e) => {
              setFilter({ ...filter, nameFilter: e.currentTarget.value });
            }}
          />
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
