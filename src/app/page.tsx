import Link from "next/link";
import { auth } from "~/server/auth";
import Footer from "./_components/Footer";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <main className="flex w-4/5 grow flex-col divide-y divide-neutral-700 bg-gray-700/10">
        <div className="flex h-96 flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-center text-5xl font-bold text-shadow-black text-shadow-sm">
              {session
                ? `Welcome ${session.user.name}!`
                : "Login to get started"}
            </h1>
            <p className="w-1/2 text-center text-sm text-pretty text-neutral-300">
              Create and share character builds, keep up to date with the latest
              news, or view guides from creators!
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={"/characters"}
              className="rounded border border-green-600 bg-green-700 px-4 py-2 font-bold transition-all text-shadow-black text-shadow-xs hover:scale-105 hover:brightness-125 active:scale-95"
            >
              Get Started
            </Link>
            <Link
              href={"/guides"}
              className="rounded border border-neutral-600 bg-neutral-700 px-4 py-2 font-bold transition-all text-shadow-2xs text-shadow-black hover:scale-105 hover:brightness-125 active:scale-95"
            >
              Explore
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">News</h2>
              <p className="text-sm text-neutral-300">
                Check out the latest updates!
              </p>
            </div>
            <div className="flex items-center">
              <Link
                href={"/news"}
                className="rounded border border-neutral-600 bg-neutral-700 px-2 py-1 font-bold transition-all hover:scale-105 hover:brightness-125 active:scale-95"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded bg-neutral-900"
              >
                <h3 className="font-bold text-neutral-600 2xl:text-3xl">
                  Placeholder
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">Guides</h2>
              <p className="text-sm text-neutral-300">
                Check out the latest guides from players!
              </p>
            </div>
            <div className="flex items-center">
              <Link
                href={"/guides"}
                className="rounded border border-neutral-600 bg-neutral-700 px-2 py-1 font-bold transition-all hover:scale-105 hover:brightness-125 active:scale-95"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded bg-neutral-900"
              >
                <h3 className="font-bold text-neutral-600 2xl:text-3xl">
                  Placeholder
                </h3>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
