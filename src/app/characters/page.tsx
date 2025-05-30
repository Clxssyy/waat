import Link from "next/link";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import Search from "../_components/search";
import Footer from "../_components/Footer";
import CharacterCard from "../_components/CharacterCard";
import type { SearchParams } from "~/types";

export default async function Characters({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q, role, drifter } = searchParams;
  const [session, characters] = await Promise.all([
    auth(),
    api.character.getCharacterCardInfo({
      role: role,
      drifter: drifter,
      q: q,
    }),
  ]);

  return (
    <>
      <main className="flex w-4/5 grow flex-col divide-y divide-neutral-700 bg-gray-700/10">
        <div className="flex h-96 flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-5xl font-bold text-shadow-black text-shadow-sm">
              Character Builds
            </h1>
            <p className="w-1/2 text-sm text-neutral-400">
              Create and share your character builds with the community or
              browse through the builds of others to find inspiration for your
              own character!
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={session ? "/characters/create" : "/api/auth/signin"}
              className="rounded border border-green-600 bg-green-700 px-4 py-2 font-bold transition-all text-shadow-black text-shadow-xs hover:scale-105 hover:brightness-125 active:scale-95"
            >
              Create
            </Link>
            <Link
              href={session ? `/users/${session.user.id}` : "/api/auth/signin"}
              className="rounded border border-neutral-600 bg-neutral-700 px-4 py-2 font-bold transition-all text-shadow-black text-shadow-xs hover:scale-105 hover:brightness-125 active:scale-95"
            >
              Your Builds
            </Link>
          </div>
        </div>
        <Search />
        <div className="flex grow flex-col gap-2 p-4">
          <h2 className="text-lg font-bold">Builds</h2>
          {characters ? (
            <div className="grid grid-cols-3 gap-2">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          ) : (
            <div className="flex grow items-center justify-center">
              <p className="text-6xl font-bold text-neutral-700">
                No Characters!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
