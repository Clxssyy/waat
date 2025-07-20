"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "~/trpc/react";

import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import type { z } from "zod";
import { formDataSchema } from "~/schemas";
import type { ActiveBuildIndex, ActiveSlots, ActiveTab } from "~/types";

type Character = inferRouterOutputs<AppRouter>["character"]["getById"];
type FormDataCharacter = z.infer<typeof formDataSchema>;

type BuildFormContextType = {
  characterData: FormDataCharacter;
  setCharacterData: React.Dispatch<React.SetStateAction<FormDataCharacter>>;
  save: () => void;
  isSaving: boolean;
  character: Character;
  isCreator: boolean;
  clone: () => void;
  isCloning: boolean;
  hasChanges: boolean;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  activeBuildIndex: ActiveBuildIndex;
  setActiveBuildIndex: React.Dispatch<React.SetStateAction<ActiveBuildIndex>>;
  activeSlot: ActiveSlots;
  setActiveSlot: React.Dispatch<React.SetStateAction<ActiveSlots>>;
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
  activeSupport: number | undefined;
  setActiveSupport: React.Dispatch<React.SetStateAction<number | undefined>>;
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

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [characterData, setCharacterData] = useState<FormDataCharacter>(
    formDataSchema.parse(character),
  );
  const [activeSupport, setActiveSupport] = useState<number | undefined>();

  const raw = searchParams.get("build");
  const initialBuildIndex = parseInt(raw ?? "0", 10);

  const validIndex =
    initialBuildIndex >= 0 && initialBuildIndex < characterData.builds.length
      ? (initialBuildIndex as ActiveBuildIndex)
      : 0;

  const [activeBuildIndex, setActiveBuildIndex] =
    useState<ActiveBuildIndex>(validIndex);

  useEffect(() => {
    const hasBuildParam = searchParams.has("build");
    if (!hasBuildParam && activeBuildIndex === 0) {
      return;
    }
    const parsed = parseInt(raw ?? "0", 10);
    if (hasBuildParam && parsed === activeBuildIndex) {
      return;
    }

    const next = new URLSearchParams({ build: activeBuildIndex.toString() });
    router.replace(`${pathname}?${next.toString()}`);
  }, [activeBuildIndex, raw, searchParams, pathname, router]);

  const initialTab = isCreator ? "equipment" : "description";
  const [activeTab, setActiveTab] = useState<ActiveTab>(initialTab);
  const [activeSlot, setActiveSlot] = useState<ActiveSlots>("weapon");

  const { data: session } = useSession();

  const [hasChanges, setHasChanges] = useState<boolean>(
    JSON.stringify(characterData) !==
      JSON.stringify(formDataSchema.parse(character)),
  );

  useEffect(() => {
    if (hasChanges) return;
    setCharacterData(formDataSchema.parse(character));
  }, [character]);

  useEffect(() => {
    setActiveSupport(undefined);
  }, [activeTab]);

  useEffect(() => {
    console.log("1", JSON.stringify(characterData));
    console.log("2", JSON.stringify(formDataSchema.parse(character)));
    setHasChanges(
      JSON.stringify(characterData) !==
        JSON.stringify(formDataSchema.parse(character)),
    );
  }, [characterData]);

  const { mutate: saveMutation, status: saveStatus } =
    api.character.update.useMutation({
      onSuccess: () => {
        router.refresh();
      },
      onError: (err) => {
        console.error("Save failed: " + err.message);
        router.refresh();
      },
    });

  const save = () => {
    if (!characterData) return;
    if (!session?.user.id) return;
    saveMutation(formDataSchema.parse(characterData));
  };

  const { mutate: cloneMutation, status: cloneStatus } =
    api.character.clone.useMutation({
      onSuccess: (data) => {
        router.replace(`/characters/${data.id}`);
      },
      onError: (err) => {
        console.error("Clone failed: " + err.message);
        router.refresh();
      },
    });

  const clone = () => {
    if (!characterData) return;
    if (!session?.user.id) {
      router.push("/api/auth/signin");
      return;
    }
    cloneMutation(formDataSchema.parse(characterData));
  };

  const isSaving = saveStatus === "pending";
  const isCloning = cloneStatus === "pending";

  return (
    <BuildFormContext.Provider
      value={{
        characterData,
        setCharacterData,
        save,
        isSaving,
        character,
        isCreator,
        clone,
        isCloning,
        hasChanges,
        setHasChanges,
        activeBuildIndex,
        setActiveBuildIndex,
        activeSlot,
        setActiveSlot,
        activeTab,
        setActiveTab,
        activeSupport,
        setActiveSupport,
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
