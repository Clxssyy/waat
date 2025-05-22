"use client";

import { createContext, useContext, useState } from "react";
import { api } from "~/trpc/react";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
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

  const { mutate: saveMutation, status: saveStatus } =
    api.character.update.useMutation({
      onSuccess: () => {
        router.refresh();
      },
      onError: (err) => {
        alert("Save failed: " + err.message);
      },
    });

  const save = () => {
    if (!formData) return;
    saveMutation({
      ...formData,
      role: formData.role ?? null,
    });
  };

  const { mutate: cloneMutation, status: cloneStatus } =
    api.character.clone.useMutation({
      onSuccess: (data) => {
        router.push(`/builds/${data.id}`);
      },
      onError: (err) => {
        alert("Clone failed: " + err.message);
      },
    });

  const clone = () => {
    if (!formData) return;
    cloneMutation({
      ...formData,
      role: formData.role ?? null,
    });
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
