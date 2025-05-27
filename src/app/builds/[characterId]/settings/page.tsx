"use client";

import { useBuildForm } from "../_components/buildFormContext";

const SettingsPage = () => {
  const { formData, setFormData } = useBuildForm();
  return (
    <div className="grow p-2">
      <div className="flex flex-col gap-2 rounded bg-neutral-700 p-2">
        <h1 className="text-2xl font-bold">Settings</h1>
        <input
          type="text"
          placeholder="Name"
          value={formData?.name}
          onChange={(e) => {
            setFormData((prev) =>
              prev
                ? {
                    ...prev,
                    name: e.target.value,
                  }
                : prev,
            );
          }}
          className="w-full rounded border bg-neutral-800 p-2"
        />
        <select
          name=""
          id=""
          className="rounded bg-neutral-800 p-2"
          value={formData?.role ?? ""}
          onChange={(e) => {
            setFormData((prev) =>
              prev
                ? {
                    ...prev,
                    role: e.target.value,
                  }
                : prev,
            );
          }}
        >
          <option value="">Role</option>
          <option value="dps">DPS</option>
          <option value="healer">Healer</option>
          <option value="tank">Tank</option>
        </select>
        <select
          name=""
          id=""
          className="rounded bg-neutral-800 p-2"
          value={formData?.private.toString()}
          onChange={(e) => {
            setFormData((prev) =>
              prev
                ? {
                    ...prev,
                    private: !!JSON.parse(e.target.value),
                  }
                : prev,
            );
          }}
        >
          <option value="true">Private</option>
          <option value="false">Public</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPage;
