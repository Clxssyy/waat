"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
  activeBuildIndex: ActiveBuildIndex;
  setActiveBuildIndex: React.Dispatch<React.SetStateAction<ActiveBuildIndex>>;
  activeSlot: ActiveSlots;
  setActiveSlot: React.Dispatch<React.SetStateAction<ActiveSlots>>;
  activeTab: ActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
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

  const [formData, setFormData] = useState<FormDataCharacter>(
    formDataSchema.parse(character),
  );

  const _ = formData.builds.findIndex((build) => {
    return build.id === searchParams.get("build");
  });

  const buildIndex = _ === -1 ? 0 : _;

  const [activeBuildIndex, setActiveBuildIndex] = useState<ActiveBuildIndex>(
    buildIndex as ActiveBuildIndex,
  );

  const updateParams = useCallback(() => {
    const p = new URLSearchParams(searchParams.toString());
    if (formData?.builds[activeBuildIndex]?.id)
      p.set("build", formData?.builds[activeBuildIndex]?.id);
    else p.delete("build");

    router.replace(`${pathname}?${p.toString()}`);
  }, [router, activeBuildIndex, formData, searchParams, pathname]);

  useEffect(updateParams, [updateParams]);

  const [activeTab, setActiveTab] = useState<ActiveTab>("equipment");
  const [activeSlot, setActiveSlot] = useState<ActiveSlots>("weapon");

  const { data: session } = useSession();

  const [hasChanges, setHasChanges] = useState<boolean>(
    JSON.stringify(formData) !==
      JSON.stringify(formDataSchema.parse(character)),
  );

  useEffect(() => {
    setFormData(formDataSchema.parse(character));
  }, []);

  useEffect(() => {
    setHasChanges(
      JSON.stringify(formData) !==
        JSON.stringify(formDataSchema.parse(character)),
    );
  }, [formData]);

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
    if (!formData) return;
    if (!session?.user.id) return;
    saveMutation(formDataSchema.parse(formData));
  };

  const { mutate: cloneMutation, status: cloneStatus } =
    api.character.clone.useMutation({
      onSuccess: (data) => {
        router.push(`/characters/${data.id}`);
      },
      onError: (err) => {
        console.error("Clone failed: " + err.message);
        router.refresh();
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
        activeBuildIndex,
        setActiveBuildIndex,
        activeSlot,
        setActiveSlot,
        activeTab,
        setActiveTab,
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
