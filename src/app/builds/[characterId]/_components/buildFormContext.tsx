"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "~/trpc/react";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import { formDataSchema } from "~/app/_utils/types";
import type { z } from "zod";

type Character = inferRouterOutputs<AppRouter>["character"]["getById"];
type FormDataCharacter = z.infer<typeof formDataSchema>;

type BuildFormContextType = {
  formData: FormDataCharacter;
  setFormData: React.Dispatch<React.SetStateAction<FormDataCharacter>>;
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

  const [formData, setFormData] = useState<FormDataCharacter>(
    formDataSchema.parse(character),
  );

  const router = useRouter();
  const { data: session } = useSession();

  const [hasChanges, setHasChanges] = useState<boolean>(
    JSON.stringify(formData) !==
      JSON.stringify(formDataSchema.parse(character)),
  );

  useEffect(() => {
    setFormData(formDataSchema.parse(character));
  }, [character]);

  useEffect(() => {
    setHasChanges(
      JSON.stringify(formData) !==
        JSON.stringify(formDataSchema.parse(character)),
    );
  }, [formData, character]);

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
    saveMutation(formDataSchema.parse(formData));
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
    cloneMutation(formDataSchema.parse(formData));
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
