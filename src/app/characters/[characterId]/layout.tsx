import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { BuildFormProvider } from "./_components/buildFormContext";
import Sidebar from "./_components/sidebar";
import { api } from "~/trpc/server";
import { auth } from "~/server/auth";

export default async function BuildLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { characterId: string };
}) {
  const { characterId } = await params;
  const [character, session] = await Promise.all([
    api.character.getById({ id: characterId }),
    auth(),
  ]);

  if (!character) {
    return <div>Character not found.</div>;
  }

  const isCreator = character.createdBy.id === session?.user.id;

  return (
    <main className="flex w-full grow">
      <SessionProvider>
        <BuildFormProvider character={character} isCreator={isCreator}>
          <Sidebar />
          {children}
        </BuildFormProvider>
      </SessionProvider>
    </main>
  );
}
