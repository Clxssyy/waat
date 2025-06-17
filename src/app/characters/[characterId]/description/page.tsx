"use client";

import { useBuildForm } from "~/app/_components/buildFormContext";

const Description = () => {
  const { formData, setFormData } = useBuildForm();
  return (
    <div className="flex h-full grow flex-col gap-2">
      <textarea
        className="m-2 h-full rounded border border-neutral-600 bg-neutral-700 p-1 outline-none"
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
    </div>
  );
};

export default Description;
