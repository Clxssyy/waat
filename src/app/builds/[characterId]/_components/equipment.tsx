import { useEffect, useRef, useState } from "react";
import { useBuildForm } from "./buildFormContext";
import data from "public/data.json";
import { IoClose } from "react-icons/io5";
import type {
  ActiveEquipmentFilter,
  BuildNumber,
  ActiveSlots,
} from "~/app/_utils/types";

const Equipment = ({
  props,
}: {
  props: { slot: ActiveSlots; buildNumber: BuildNumber };
}) => {
  const { slot, buildNumber } = props;
  const { formData, setFormData } = useBuildForm();
  const [activeFilter, setActiveFilter] =
    useState<ActiveEquipmentFilter>("all");
  const selectInput = useRef<HTMLSelectElement>(null);
  const [dataPool, setDataPool] = useState(data[slot]);
  const filteredData = Object.entries(dataPool).filter(([key, weapon]) => {
    if (activeFilter === "all") return true;
    if (activeFilter === key) return true;
    return false;
  });

  if (slot === "drifter") {
    return <></>;
  }

  useEffect(() => {
    setDataPool(data[slot]);
    setActiveFilter("all");
  }, [slot]);

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
      </div>
      <div className="flex gap-2">
        <div className="h-12 w-12 rounded bg-stone-700"></div>
        <div className="h-12 grow rounded bg-stone-700">
          <select
            className="h-full w-full rounded bg-stone-700 px-2 text-lg"
            id={slot}
            name={slot}
            ref={selectInput}
            value={formData?.builds?.[buildNumber]?.data?.equipment[slot]}
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
                            equipment: {
                              ...b.data.equipment,
                              [slot]: e.target.value,
                            },
                          },
                        }
                      : b,
                  ),
                };
              });
            }}
          >
            <option value="" hidden>
              {slot.charAt(0).toUpperCase() + slot.slice(1)}
            </option>
            {filteredData.map(([typeKey, type]) =>
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
                            equipment: {
                              ...b.data.equipment,
                              [slot]: "",
                            },
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

export default Equipment;
