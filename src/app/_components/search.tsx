"use client";

import { IoClose } from "react-icons/io5";
import data from "public/data.json";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

const Search = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const [q, setQ] = useState(params.get("q") ?? "");
  const [role, setRole] = useState(params.get("role") ?? "");
  const [drifter, setDrifter] = useState(params.get("drifter") ?? "");
  const [page, setPage] = useState(params.get("page") ?? "1");

  useEffect(() => {
    const id = setTimeout(() => {
      const next = new URLSearchParams();
      if (q) next.set("q", q);
      if (role) next.set("role", role);
      if (drifter) next.set("drifter", drifter);
      if (q || role || drifter) next.set("page", page);

      startTransition(() => {
        router.replace(`/characters?${next.toString()}`);
      });
    }, 300);
    return () => clearTimeout(id);
  }, [q, role, drifter, router, startTransition, page]);

  const clearAll = () => {
    setQ("");
    setRole("");
    setDrifter("");
    setPage("1");
  };

  return (
    <div className="flex justify-center">
      <form className="flex w-3/5 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-2">
          <select
            className="w-fit cursor-pointer rounded border border-neutral-600 bg-neutral-700 px-4 py-1 text-lg"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            aria-label="Role Filter"
          >
            <option value="">Role</option>
            <option value="dps">DPS</option>
            <option value="healer">Healer</option>
            <option value="tank">Tank</option>
          </select>
          <select
            className="grow cursor-pointer rounded border border-neutral-600 bg-neutral-700 px-4 py-1 text-lg"
            value={drifter}
            onChange={(e) => setDrifter(e.target.value)}
            aria-label="Drifter Filter"
          >
            <option value="">Drifter</option>
            {data.drifters.map((drifter) => (
              <option key={drifter.name} value={drifter.name}>
                {drifter.name}
              </option>
            ))}
          </select>
          <button
            type="reset"
            aria-label="Clear Filters"
            className="aspect-square cursor-pointer rounded border border-neutral-600 bg-neutral-700 px-2 not-sm:hidden hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!drifter && !q && !role}
            onClick={clearAll}
          >
            <IoClose className="text-lg" />
          </button>
        </div>
        <input
          type="search"
          aria-label="Search Input"
          placeholder="Search..."
          className="w-full rounded border border-neutral-600 bg-neutral-700 p-1 text-lg"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
