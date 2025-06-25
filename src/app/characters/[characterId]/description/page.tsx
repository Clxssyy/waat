"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaQuestion } from "react-icons/fa6";
import { useBuildForm } from "~/app/_components/buildFormContext";
import DescriptionParser from "~/app/_components/DescriptionParser";

const Description = () => {
  const { formData, setFormData, character } = useBuildForm();
  const pathname = usePathname();
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  return (
    <div className="m-2 flex flex-1 flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
      {pathname.includes("/description") ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h1 className="text-2xl font-bold">Description</h1>
              <div className="group relative flex cursor-help items-center rounded-full border border-neutral-600 bg-neutral-800/40 p-2">
                <FaQuestion className="text-neutral-400" />
                <div className="absolute top-8 hidden rounded border border-neutral-700 bg-neutral-900 p-2 whitespace-nowrap group-hover:block">
                  <h1 className="border-b border-neutral-700 text-2xl">
                    Formatting Cheat Sheet
                  </h1>
                  <div className="flex">
                    <div className="grid grid-rows-12">
                      <span className="text-xl font-bold">Headings</span>
                      <span className="text-lg font-semibold">
                        Sub Headings
                      </span>
                      <span className="text-bold">Bold</span>
                      <span className="italic">Italics</span>
                      <span></span>
                      <span>Item Highlighting:</span>
                      <span className="text-blue-400">Moonveil </span>
                      <span className="text-yellow-500">Voideye </span>
                      <span className="text-purple-500">Mystic Surge</span>
                      <span className="text-green-500">Novice Robe</span>
                      <span className="text-blue-500">Energizer Boots </span>
                      <span className="text-neutral-300">Headshot </span>
                    </div>
                    <div className="mx-2 border-l border-neutral-700"></div>
                    <div className="grid grid-rows-12">
                      <span># Headings</span>
                      <span>## Sub Headings</span>
                      <span>**Bold**</span>
                      <span>_Italics_</span>
                      <span className="row-span-2"></span>
                      <span>drifter[Moonveil]</span>
                      <span>weapon[Voideye]</span>
                      <span>helmet[Mystic Surge]</span>
                      <span>chest[Novice Robe]</span>
                      <span>boots[Energizer Boots]</span>
                      <span>skill[Headshot]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <p>Preview:</p>
              <input
                type="checkbox"
                checked={previewMode}
                onChange={(e) => setPreviewMode(() => e.target.checked)}
              />
            </div>
          </div>
          {previewMode ? (
            <div className="grow overflow-auto rounded bg-neutral-800 p-2">
              <DescriptionParser
                description={
                  formData?.description != ""
                    ? formData.description
                    : "No description."
                }
              />
            </div>
          ) : (
            <textarea
              className="grow rounded bg-neutral-800 p-2 outline-none"
              value={formData.description}
              id="description_input"
              name="description input"
              placeholder="Add a description here."
              spellCheck={false}
              maxLength={3000}
              onChange={(e) => {
                setFormData((prev) => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    description: e.target.value,
                  };
                });
              }}
            />
          )}
        </>
      ) : (
        <DescriptionParser
          description={
            character?.description != ""
              ? character!.description
              : "No description."
          }
        />
      )}
    </div>
  );
};

export default Description;
