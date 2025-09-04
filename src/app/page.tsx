import Link from "next/link";
import { auth } from "~/server/auth";
import Footer from "./_components/Footer";
import PlaceholderCard from "./_components/PlaceholderCard";
import { api } from "~/trpc/server";
import CharacterCard from "./_components/CharacterCard";

export default async function Home() {
  const session = await auth();
  const [characterCount, userCount, featuredBuilds] = await Promise.all([
    api.character.getCharacterCount(),
    api.character.getUserCount(),
    api.character.getFeaturedBuildCards(),
  ]);

  return (
    <>
      <main className="container flex flex-1 flex-col divide-y divide-neutral-700 bg-gray-700/10">
        <div className="flex h-96 flex-col items-center justify-center gap-2 truncate px-4 text-center">
          <h1 className="text-5xl font-bold text-wrap">
            {session ? (
              <>
                Welcome,{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-cyan-400 bg-clip-text text-transparent">
                  {session.user.name}
                </span>
                !
              </>
            ) : (
              "Warborne Above Ashes Tools"
            )}
          </h1>
          <p className="text-sm text-pretty text-neutral-300">
            Create and share character builds, keep up to date with the latest
            news, or view guides from experienced players!
          </p>
          <div className="mt-2 flex gap-2">
            <Link
              href={"/characters"}
              className="rounded border border-cyan-300 bg-cyan-400 px-4 py-2 font-semibold transition-all text-shadow-black text-shadow-xs hover:scale-[102%] hover:brightness-110 active:scale-[98%]"
            >
              Get Started
            </Link>
            <Link
              href={"/guides"}
              className="rounded border border-neutral-600 bg-neutral-700 px-4 py-2 font-semibold transition-all text-shadow-black text-shadow-xs hover:scale-[102%] hover:brightness-110 active:scale-[98%]"
            >
              Explore
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">
                Builds{" "}
                <span className="text-neutral-400">
                  (<span className="text-cyan-400">{characterCount}</span>)
                </span>
              </h2>
              <p className="text-sm text-neutral-300">
                Check out the latest builds from our growing community of{" "}
                <span className="text-cyan-400">{userCount}</span>{" "}
                {false ? "user" : "users"}!
              </p>
            </div>
            <Link
              href={"/characters"}
              className="h-fit rounded border border-neutral-600 bg-neutral-700 px-3 py-1 font-semibold shadow-2xs shadow-black transition-all text-shadow-black text-shadow-xs hover:scale-[102%] hover:brightness-110 active:scale-[98%]"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {featuredBuilds.map((build, i) => (
              <CharacterCard key={i} character={build} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">News</h2>
              <p className="text-sm text-neutral-300">
                Check out the latest updates from developers!
              </p>
            </div>
            <Link
              href={"/news"}
              className="h-fit rounded border border-neutral-600 bg-neutral-700 px-3 py-1 font-semibold shadow-2xs shadow-black transition-all text-shadow-black text-shadow-xs hover:scale-[102%] hover:brightness-110 active:scale-[98%]"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <PlaceholderCard key={i} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Guides</h2>
              <p className="text-sm text-neutral-300">
                Expand your skill set with guides from experienced players!
              </p>
            </div>
            <Link
              href={"/guides"}
              className="h-fit rounded border border-neutral-600 bg-neutral-700 px-3 py-1 font-semibold shadow-2xs shadow-black transition-all text-shadow-black text-shadow-xs hover:scale-[102%] hover:brightness-110 active:scale-[98%]"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <PlaceholderCard key={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
