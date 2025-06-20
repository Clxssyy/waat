"use client";

import { usePathname } from "next/navigation";
import { useBuildForm } from "~/app/_components/buildFormContext";

const Description = () => {
  const { formData, setFormData, character } = useBuildForm();
  const pathname = usePathname();
  console.log(formData.description);
  return (
    <div className="m-2 flex grow flex-col gap-2 rounded border border-neutral-600 bg-neutral-700 p-2">
      {pathname.includes("/description") ? (
        <>
          <h1 className="text-2xl font-bold">Description</h1>
          <textarea
            className="grow rounded bg-neutral-800 p-1 outline-none"
            value={formData.description}
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
        </>
      ) : (
        <p className="rounded whitespace-pre-wrap">
          {character?.description != ""
            ? character?.description
            : "No description."}
        </p>
      )}
    </div>
  );
};

export default Description;
