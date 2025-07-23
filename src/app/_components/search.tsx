"use client";

import { IoClose } from "react-icons/io5";
import data from "public/data.json";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

const Search = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const [q, setQ] = useState(params.get("q") ?? "");
  const [role, setRole] = useState(params.get("role") ?? "");
  const [drifter, setDrifter] = useState(params.get("drifter") ?? "");
  const [page, setPage] = useState(params.get("page") ?? "");

  useEffect(() => {
    setQ(params.get("q") ?? "");
    setRole(params.get("role") ?? "");
    setDrifter(params.get("drifter") ?? "");
    setPage(params.get("page") ?? "");
  }, [params]);

  useEffect(() => {
    const id = setTimeout(() => {
      const next = new URLSearchParams();
      if (q) next.set("q", q);
      if (role) next.set("role", role);
      if (drifter) next.set("drifter", drifter);
      if (page) next.set("page", page);
      if ((q || role || drifter) && !page) next.set("page", "1");
      startTransition(() => {
        if (params.toString() === next.toString()) return;
        router.replace(`/characters?${next.toString()}`);
      });
    }, 300);
    return () => clearTimeout(id);
  }, [q, role, drifter, router, startTransition, page, currentPath, params]);

  const clearAll = () => {
    setQ("");
    setRole("");
    setDrifter("");
    setPage("");
  };

  return (
    <div className="flex justify-center">
      <form className="flex w-3/5 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-2">
          <select
            className="w-fit cursor-pointer rounded border border-neutral-600 bg-neutral-700 px-4 py-1 text-lg"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setPage("");
            }}
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
            onChange={(e) => {
              setDrifter(e.target.value);
              setPage("");
            }}
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
          onChange={(e) => {
            setQ(e.target.value);
            setPage("");
          }}
        />
      </form>
    </div>
  );
};

export default Search;
