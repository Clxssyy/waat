import { useRef, useState } from "react";
import { useBuildForm } from "./buildFormContext";
import data from "public/data.json";
import { IoClose } from "react-icons/io5";
import type { ActiveDrifterFilter } from "~/app/_utils/types";

const Drifter = ({ props }: { props: { buildNumber: number } }) => {
  const { buildNumber } = props;
  const { formData, setFormData } = useBuildForm();
  const [activeFilter, setActiveFilter] = useState<ActiveDrifterFilter>("all");
  const selectInput = useRef<HTMLSelectElement>(null);

  const drifters = data.drifter;
  const filteredWeapons = Object.entries(drifters).filter(([key, drifter]) => {
    if (activeFilter === "all") return true;
    if (activeFilter === key) return true;
    return false;
  });

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <button
          className={`cursor-pointer rounded bg-stone-600 px-3 py-1 ${activeFilter === "all" ? "bg-stone-700" : ""}`}
          onClick={() => {
            setActiveFilter("all");
          }}
        >
          All
        </button>
        <button
          className={`cursor-pointer rounded bg-stone-600 px-3 py-1 ${activeFilter === "strength" ? "bg-stone-700" : ""}`}
          onClick={() => {
            setActiveFilter("strength");
          }}
        >
          Strength
        </button>
        <button
          className={`cursor-pointer rounded bg-stone-600 px-3 py-1 ${activeFilter === "agility" ? "bg-stone-700" : ""}`}
          onClick={() => {
            setActiveFilter("agility");
          }}
        >
          Agility
        </button>
        <button
          className={`cursor-pointer rounded bg-stone-600 px-3 py-1 ${activeFilter === "intelligence" ? "bg-stone-700" : ""}`}
          onClick={() => {
            setActiveFilter("intelligence");
          }}
        >
          Intelligence
        </button>
        <button
          className={`cursor-pointer rounded bg-stone-600 px-3 py-1 ${activeFilter === "logistics" ? "bg-stone-700" : ""}`}
          onClick={() => {
            setActiveFilter("logistics");
          }}
        >
          Logistics
        </button>
      </div>
      <div className="flex gap-2">
        <div className="h-12 w-12 rounded bg-stone-700"></div>
        <div className="h-12 grow rounded bg-stone-700">
          <select
            className="h-full w-full rounded bg-stone-700 px-2 text-lg"
            id={"drifter"}
            name={"drifter"}
            ref={selectInput}
            value={formData?.builds?.[buildNumber]?.data?.drifter}
            onChange={(e) => {
              setFormData((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  builds: prev.builds.map((b, idx) =>
                    idx === buildNumber
                      ? {
                          ...b,
                          data: {
                            ...b.data,
                            drifter: e.target.value,
                          },
                        }
                      : b,
                  ),
                };
              });
            }}
          >
            <option value="" hidden id={"No " + "drifter"}>
              {"Drifter"}
            </option>
            {filteredWeapons.map(([typeKey, type]) =>
              Object.entries(type).map(([weaponKey, weapon]) => (
                <option key={weaponKey} value={weaponKey}>
                  {weaponKey.charAt(0).toUpperCase() +
                    weaponKey
                      .slice(1)
                      .replace(/_/g, " ")
                      .replace(/(\s[a-z])/g, (match) => match.toUpperCase())}
                </option>
              )),
            )}
          </select>
        </div>
        <button
          className={`flex h-12 w-12 items-center justify-center rounded bg-stone-700 hover:text-red-600`}
          onClick={() => {
            if (selectInput.current!.value !== "")
              setFormData((prev) => {
                if (!prev) return prev;
                return {
                  ...prev,
                  builds: prev.builds.map((b, idx) =>
                    idx === buildNumber
                      ? {
                          ...b,
                          data: {
                            ...b.data,
                            drifter: "",
                          },
                        }
                      : b,
                  ),
                };
              });
          }}
        >
          <IoClose className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Drifter;
