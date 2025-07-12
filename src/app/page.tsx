import Link from "next/link";
import { auth } from "~/server/auth";
import Footer from "./_components/Footer";
import PlaceholderCard from "./_components/PlaceholderCard";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <main className="flex w-full flex-1 flex-col divide-y divide-neutral-700 bg-gray-700/10 sm:w-4/5">
        <div className="flex h-96 flex-col items-center justify-center gap-2 truncate px-4 text-center">
          <h1 className="text-5xl font-bold text-wrap">
            {session ? (
              <>
                Welcome,{" "}
                <span className="bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                  {session.user.name}
                </span>
                !
              </>
            ) : (
              "Login to get started"
            )}
          </h1>
          <p className="text-sm text-pretty text-neutral-300">
            Create and share character builds, keep up to date with the latest
            news, or view guides from creators!
          </p>
          <div className="mt-2 flex gap-2">
            <Link
              href={"/characters"}
              className="rounded border border-green-500 bg-green-600 px-4 py-2 font-semibold transition-all text-shadow-black text-shadow-xs hover:scale-[102%] hover:brightness-110 active:scale-[98%]"
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
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">News</h2>
              <p className="text-sm text-neutral-300">
                Check out the latest updates!
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
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Guides</h2>
              <p className="text-sm text-neutral-300">
                Check out the latest guides from players!
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
