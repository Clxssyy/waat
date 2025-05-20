import Link from "next/link";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { IoClose } from "react-icons/io5";
import data from "public/data.json";

export default async function Builds() {
  const session = await auth();
  const characters = await api.character.getAll();

  return (
    <HydrateClient>
      <main className="flex w-4/5 grow flex-col divide-y divide-white/10 bg-gray-700/10">
        <div className="flex h-96 flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-5xl font-bold text-shadow-black text-shadow-sm">
              Character Builds
            </h1>
            <p className="w-1/2 text-sm text-stone-400">
              Create and share your character builds with the community or
              browse through the builds of others to find inspiration for your
              own character!
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={session ? "/builds/create" : "/api/auth/signin"}
              className="rounded bg-green-600 px-4 py-2 font-bold transition-all text-shadow-black text-shadow-xs hover:scale-105 hover:bg-green-700 active:scale-95"
            >
              Create
            </Link>
            <Link
              href={session ? `/users/${session.user.id}` : "/api/auth/signin"}
              className="rounded bg-stone-600 px-4 py-2 font-bold transition-all text-shadow-black text-shadow-xs hover:scale-105 hover:bg-stone-700 active:scale-95"
            >
              Your Builds
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <form action="" className="flex w-2/5 flex-col gap-2 p-4">
            <div className="flex gap-2">
              <select className="w-1/5 rounded bg-white/5 px-4 py-1 text-lg text-stone-500">
                <option value="" hidden>
                  Role
                </option>
                <option value="dps">DPS</option>
                <option value="healer">Healer</option>
                <option value="tank">Tank</option>
              </select>
              <select className="grow rounded bg-white/5 px-4 py-1 text-lg text-stone-500">
                <option value="" hidden>
                  Drifter
                </option>
                {Object.entries(data.drifters).map(([drifterId, drifter]) => (
                  <option key={drifterId} value={drifterId}>
                    {drifterId.charAt(0).toUpperCase() +
                      drifterId.slice(1).replaceAll("_", " ")}
                  </option>
                ))}
              </select>
              <button
                type="reset"
                className="rounded bg-white/5 px-2 text-lg text-stone-500"
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
                className="w-full rounded bg-white/5 p-1 text-lg text-stone-500"
              />
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <h2 className="text-lg font-bold">Builds</h2>
          <div className="grid grid-cols-3 gap-2">
            {characters.map((build) => (
              <Link
                key={build.id}
                href={`/builds/${build.id}`}
                className="flex h-48 flex-col items-center justify-center rounded bg-stone-900 p-2 text-center text-sm font-bold transition-all hover:scale-105 hover:bg-stone-800 active:scale-95"
              >
                <div className="flex h-full w-full items-center justify-center">
                  {build.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
