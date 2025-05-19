import Link from "next/link";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="flex w-4/5 grow flex-col items-center divide-y divide-white/10">
        <div className="flex w-full flex-col gap-2 p-4">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold">
              {session
                ? `Welcome ${session.user.name}!`
                : "Login to get started"}
            </h1>
            <p className="w-1/2 text-sm">
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
              className="rounded bg-green-600 px-4 py-2 font-bold text-shadow-black text-shadow-xs"
            >
              Get Started
            </Link>
            <Link
              href={"/guides"}
              className="rounded bg-white/10 px-4 py-2 font-bold text-shadow-2xs text-shadow-black"
            >
              Explore
            </Link>
          </div>
        </div>
        <div className="w-full p-4">
          <h2>News</h2>
        </div>
      </main>
    </HydrateClient>
  );
}
