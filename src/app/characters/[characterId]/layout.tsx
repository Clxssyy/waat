import "~/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { api } from "~/trpc/server";
import { auth } from "~/server/auth";
import { BuildFormProvider } from "~/app/_components/buildFormContext";
import Sidebar from "~/app/_components/Sidebar";
import { notFound } from "next/navigation";
import clsx from "clsx";

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
  const GAP_COLOR = "bg-neutral-950";

  return (
    <>
      <SessionProvider>
        <BuildFormProvider character={character} isCreator={isCreator}>
          {deleteModal}
          {rateModal}
          <main className="flex w-full grow overflow-hidden">
            <div
              className={clsx("flex w-full grow overflow-hidden", GAP_COLOR)}
            >
              <Sidebar />
              {children}
            </div>
          </main>
        </BuildFormProvider>
      </SessionProvider>
    </>
  );
}
