import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { api } from "~/trpc/server";
import { auth } from "~/server/auth";
import { BuildFormProvider } from "~/app/_components/buildFormContext";
import Sidebar from "~/app/_components/sidebar";

export default async function BuildLayout({
  children,
  params,
  deleteModal,
}: {
  children: React.ReactNode;
  deleteModal: React.ReactNode;
  params: Promise<{ characterId: string }>;
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
    <>
      <SessionProvider>
        <BuildFormProvider character={character} isCreator={isCreator}>
          {deleteModal}
          <main className="flex w-full grow">
            <Sidebar />

            {children}
          </main>
        </BuildFormProvider>
      </SessionProvider>
    </>
  );
}
