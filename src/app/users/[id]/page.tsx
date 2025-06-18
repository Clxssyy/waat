import Image from "next/image";
import CharacterCard from "~/app/_components/CharacterCard";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import Footer from "~/app/_components/Footer";
import type { SearchParams } from "~/types";

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

  return (
    <>
      <main className="flex w-4/5 grow gap-2 bg-gray-700/10 p-2">
        <aside className="mr-2 flex min-w-1/5 flex-col items-center gap-2 p-2">
          <Image
            src={user?.image ?? "/default-avatar.jpg"}
            alt="User profile picture"
            width={100}
            height={100}
            quality={100}
            className="h-60 w-60 rounded-full border-2 border-white"
          />
          <h1 className="text-4xl font-bold">{user?.name}</h1>
          <div className="rounded bg-neutral-900 p-2">
            <h3 className="text-center font-bold text-neutral-300">About</h3>
            <p className="rounded bg-white/5 p-1">
              Details about the user will be displayed here.
            </p>
          </div>
        </aside>
        <div className="flex grow flex-col gap-2 divide-y divide-neutral-700">
          <h2 className="text-3xl font-bold">
            Characters{" "}
            <span className="text-neutral-400">({characters.length})</span>
          </h2>
          <ul className="grid grid-cols-2 gap-2">
            {characters.map((character) => (
              <li key={character.id}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default User;
