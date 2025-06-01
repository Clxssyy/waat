import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { api } from "~/trpc/server";
import { auth } from "~/server/auth";
import { BuildFormProvider } from "~/app/_components/buildFormContext";
import Sidebar from "~/app/_components/Sidebar";
import { notFound } from "next/navigation";

export default async function BuildLayout({
  children,
  params,
  deleteModal,
  rateModal,
}: {
  children: React.ReactNode;
  deleteModal: React.ReactNode;
  rateModal: React.ReactNode;
  params: Promise<{ characterId: string }>;
}) {
  const { characterId } = await params;
  const [character, session] = await Promise.all([
    api.character.getById({ id: characterId }),
    auth(),
  ]);

  if (!character) notFound();

  const isCreator = character.createdBy.id === session?.user.id;

  return (
    <>
      <SessionProvider>
        <BuildFormProvider character={character} isCreator={isCreator}>
          {deleteModal}
          {rateModal}
          <main className="flex w-full grow">
            <Sidebar />
            {children}
          </main>
        </BuildFormProvider>
      </SessionProvider>
    </>
  );
}
