import Link from "next/link";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="flex w-4/5 grow flex-col divide-y divide-white/10">
        <div className="flex h-96 flex-col items-center justify-center gap-8 bg-gray-700/10">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-5xl font-bold text-shadow-black text-shadow-sm">
              {session
                ? `Welcome ${session.user.name}!`
                : "Login to get started"}
            </h1>
            <p className="w-1/2 text-sm text-stone-300">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Recusandae iusto assumenda harum? Hic, quis. Itaque officiis, unde
              quibusdam earum, corrupti, voluptatum accusantium excepturi
              consectetur minus ducimus consequuntur! Perspiciatis, quia
              eveniet!
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={session ? "/builds" : "/api/auth/signin"}
              className="rounded bg-green-600 px-4 py-2 font-bold transition-all text-shadow-black text-shadow-xs hover:scale-105 hover:bg-green-700 active:scale-95"
            >
              Get Started
            </Link>
            <Link
              href={"/guides"}
              className="rounded bg-stone-600 px-4 py-2 font-bold transition-all text-shadow-2xs text-shadow-black hover:scale-105 hover:bg-stone-700 active:scale-95"
            >
              Explore
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">News</h2>
              <p className="text-sm text-stone-300">
                Check out the latest updates!
              </p>
            </div>
            <div className="flex items-center">
              <Link
                href={"/news"}
                className="rounded bg-stone-600 px-2 py-1 font-bold transition-all hover:scale-105 hover:bg-stone-700 active:scale-95"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="grid w-full grid-cols-5 gap-2 rounded">
            <div className="aspect-square rounded bg-stone-900 p-2">a</div>
            <div className="aspect-square rounded bg-stone-900 p-2">a</div>
            <div className="aspect-square rounded bg-stone-900 p-2">a</div>
            <div className="aspect-square rounded bg-stone-900 p-2">a</div>
            <div className="aspect-square rounded bg-stone-900 p-2">a</div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold">Guides</h2>
              <p className="text-sm text-stone-300">
                Check out the latest guides from players!
              </p>
            </div>
            <div className="flex items-center">
              <Link
                href={"/guides"}
                className="rounded bg-stone-600 px-2 py-1 font-bold transition-all hover:scale-105 hover:bg-stone-700 active:scale-95"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="grid w-full grid-cols-5 gap-2 rounded">
            <div className="aspect-square rounded bg-stone-900 p-2">a</div>
            <div className="aspect-square rounded bg-stone-900 p-2">a</div>
            <div className="aspect-square rounded bg-stone-900 p-2">a</div>
            <div className="aspect-square rounded bg-stone-900 p-2">a</div>
            <div className="aspect-square rounded bg-stone-900 p-2">a</div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
