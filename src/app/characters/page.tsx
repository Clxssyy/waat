import Link from "next/link";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import Search from "../_components/search";
import Footer from "../_components/Footer";
import CharacterCard from "../_components/CharacterCard";
import type { SearchParams } from "~/types";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default async function Characters({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q, role, drifter, page, sort } = await searchParams;
  const [session, cardInfo] = await Promise.all([
    auth(),
    api.character.getCharacterCardInfo({
      role: role,
      drifter: drifter,
      q: q,
      page: page,
      sort: !["updated", "popular"].includes(sort ?? "popular")
        ? "popular"
        : sort,
    }),
  ]);

  const characters = cardInfo.characters;
  const totalPages = cardInfo.totalPages;
  const currentPage = parseInt(page ?? "1", 10);

  return (
    <>
      <main className="flex w-4/5 grow flex-col divide-y divide-neutral-700 bg-gray-700/10">
        <div className="flex h-96 flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-center text-5xl font-bold text-shadow-black text-shadow-sm">
              Character Builds
            </h1>
            <p className="w-1/2 text-center text-sm text-pretty text-neutral-300">
              Create and share your character builds with the community or
              browse through existing builds to find some inspiration!
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
          {characters.length >= 1 ? (
            <>
              <div className="grid gap-2 not-sm:grid-cols-1 sm:grid-cols-3">
                {characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
              <div className="flex h-16 items-center justify-center gap-1">
                {currentPage > 1 ? (
                  <Link
                    href={`/characters?${new URLSearchParams({
                      ...(q ? { q } : {}),
                      ...(role ? { role } : {}),
                      ...(drifter ? { drifter } : {}),
                      page: (currentPage - 1).toString(),
                    }).toString()}`}
                    className="rounded border border-neutral-700 bg-neutral-800 p-1 transition-all hover:scale-105 hover:brightness-125 active:scale-95"
                  >
                    <IoChevronBack />
                  </Link>
                ) : (
                  <span className="rounded border border-neutral-700 bg-neutral-800 p-1">
                    <IoChevronBack />
                  </span>
                )}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <Link
                    key={index}
                    href={`/characters?${new URLSearchParams({
                      ...(q ? { q } : {}),
                      ...(role ? { role } : {}),
                      ...(drifter ? { drifter } : {}),
                      page: (index + 1).toString(),
                    }).toString()}`}
                    className={`${parseInt(page ?? "1") === index + 1 ? "brightness-125" : ""} rounded border border-neutral-700 bg-neutral-800 px-2 py-1 transition-all hover:scale-105 hover:brightness-125 active:scale-95 ${
                      page === (index + 1).toString()
                        ? "bg-neutral-700 text-white"
                        : "text-neutral-300"
                    }`}
                  >
                    {index + 1}
                  </Link>
                ))}
                {currentPage < totalPages ? (
                  <Link
                    href={`/characters?${new URLSearchParams({
                      ...(q ? { q } : {}),
                      ...(role ? { role } : {}),
                      ...(drifter ? { drifter } : {}),
                      page: (currentPage + 1).toString(),
                    }).toString()}`}
                    className="rounded border border-neutral-700 bg-neutral-800 p-1 transition-all hover:scale-105 hover:brightness-125 active:scale-95"
                  >
                    <IoChevronForward />
                  </Link>
                ) : (
                  <span className="rounded border border-neutral-700 bg-neutral-800 p-1">
                    <IoChevronForward />
                  </span>
                )}
              </div>
            </>
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
