"use client";

import { useBuildForm } from "../_components/buildFormContext";

const SettingsPage = () => {
  const { formData, setFormData } = useBuildForm();
  return (
    <div className="flex grow flex-col gap-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={""}
          onChange={(e) => {
            setFormData({
              ...formData,
              name: e.target.value,
            });
          }}
          className="w-full border p-2"
        />
      </div>
    </div>
  );
};

export default SettingsPage;
