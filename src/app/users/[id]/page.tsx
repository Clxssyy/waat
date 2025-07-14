import Image from "next/image";
import CharacterCard from "~/app/_components/CharacterCard";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import Footer from "~/app/_components/Footer";
import type { SearchParams } from "~/types";
import Link from "next/link";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const User = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) => {
  const { id } = await params;
  const { page, sort } = await searchParams;
  const session = await auth();

  const isCurrentUser = session?.user.id === id;

  const [user, cardInfo] = await Promise.all([
    api.user.getById({
      userId: id,
    }),
    api.character.getCharacterCardInfo({
      userId: id,
      includePrivate: isCurrentUser,
      page: page,
      sort: sort,
    }),
  ]);

  const characters = cardInfo.characters;
  const totalPages = cardInfo.totalPages;
  const currentPage = parseInt(page ?? "1", 10);

  return (
    <>
      <main className="flex w-full flex-1 flex-col gap-2 bg-gray-700/10 p-2 sm:w-4/5 sm:flex-row">
        <div className="flex min-w-1/5 flex-col items-center gap-2 sm:mr-2">
          <Image
            src={user?.image ?? "/default-avatar.jpg"}
            alt="User profile picture"
            width={100}
            height={100}
            quality={100}
            className="aspect-square w-48 rounded-full border-2 border-cyan-400"
          />
          <h1 className="text-4xl font-bold">{user?.name}</h1>
          <div className="w-full rounded bg-neutral-900 p-2">
            <h3 className="text-center">About</h3>
            <p className="rounded bg-neutral-800 p-1 text-sm">
              Joined: {user?.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex grow flex-col gap-4 divide-y divide-neutral-700">
          <h2 className="text-2xl font-bold">
            Characters{" "}
            <span className="text-neutral-400">
              (<span className="text-cyan-400">{user?.characters.length}</span>)
            </span>
          </h2>
          {characters.length >= 1 ? (
            <div className="flex grow flex-col justify-between">
              <div className="grid gap-2 pb-2 not-sm:grid-cols-1 sm:grid-cols-3">
                {characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>
              <div className="flex h-16 items-center justify-center gap-1">
                {currentPage > 1 ? (
                  <Link
                    href={`/users/${id}?${new URLSearchParams({
                      page: (currentPage - 1).toString(),
                    }).toString()}`}
                    className="rounded border border-neutral-700 bg-neutral-800 p-1 transition-all hover:scale-105 hover:brightness-110 active:scale-95"
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
                    href={`/users/${id}?${new URLSearchParams({
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
                    href={`/users/${id}?${new URLSearchParams({
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
};
export default User;
