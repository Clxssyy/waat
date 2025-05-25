"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "~/trpc/react";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type Character = inferRouterOutputs<AppRouter>["character"]["getById"];

type BuildFormContextType = {
  formData: Character;
  setFormData: React.Dispatch<React.SetStateAction<Character>>;
  save: () => void;
  isSaving: boolean;
  character: Character;
  isCreator: boolean;
  clone: () => void;
  isCloning: boolean;
  hasChanges: boolean;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
};

const BuildFormContext = createContext<BuildFormContextType | null>(null);

export const BuildFormProvider = ({
  children,
  character,
  isCreator,
}: {
  children: ReactNode;
  character: Character;
  isCreator: boolean;
}) => {
  if (!character) {
    throw new Error("BuildFormProvider requires a character prop");
  }

  const [formData, setFormData] = useState<Character>(character);

  const router = useRouter();
  const { data: session } = useSession();

  const [hasChanges, setHasChanges] = useState<boolean>(
    JSON.stringify(formData) !== JSON.stringify(character),
  );

  useEffect(() => {
    setHasChanges(JSON.stringify(formData) !== JSON.stringify(character));
  }, [formData]);

  const { mutate: saveMutation, status: saveStatus } =
    api.character.update.useMutation({
      onSuccess: () => {
        router.refresh();
      },
      onError: (err) => {
        console.error("Save failed: " + err.message);
      },
    });

  const save = () => {
    if (!formData) return;
    if (!session?.user.id) return;
    saveMutation({ ...formData, createdBy: character.createdBy });
  };

  const { mutate: cloneMutation, status: cloneStatus } =
    api.character.clone.useMutation({
      onSuccess: (data) => {
        router.push(`/builds/${data.id}`);
      },
      onError: (err) => {
        console.error("Clone failed: " + err.message);
      },
    });

  const clone = () => {
    if (!formData) return;
    if (!session?.user.id) {
      router.push("/api/auth/signin");
      return;
    }
    cloneMutation({ ...formData, createdBy: character.createdBy });
  };

  const isSaving = saveStatus === "pending";
  const isCloning = cloneStatus === "pending";

  return (
    <BuildFormContext.Provider
      value={{
        formData,
        setFormData,
        save,
        isSaving,
        character,
        isCreator,
        clone,
        isCloning,
        hasChanges,
        setHasChanges,
      }}
    >
      {children}
    </BuildFormContext.Provider>
  );
};

export const useBuildForm = () => {
  const ctx = useContext(BuildFormContext);
  if (!ctx)
    throw new Error("useBuildForm must be used within a BuildFormProvider");
  return ctx;
};
