"use client";

import type { ActiveSlots } from "~/types";
import { useBuildForm } from "./buildFormContext";
import Equipment from "./equipment";
import Support from "./support";
import Drifter from "./drifter";
import Description from "../characters/[characterId]/description/page";
import CommentSection from "./CommentSection";

const BuildEditor = () => {
  const {
    activeTab,
    setActiveTab,
    activeSlot,
    setActiveSlot,
    activeBuildIndex,
  } = useBuildForm();

  return (
    <div id="editor" className="w-2/3">
      <div className="flex h-full flex-col items-center">
        <div className="grid h-10 w-11/12 grid-cols-5 gap-2">
          <div
            className={`flex items-center justify-center rounded-t-lg ${activeTab === "equipment" ? "scale-105 border border-b-0 border-neutral-700 bg-neutral-800" : "bg-neutral-900"}`}
          >
            <button
              className="h-full w-full cursor-pointer rounded-t-lg hover:brightness-125"
              aria-label="Equipment Tab"
              onClick={() => {
                if (activeTab != "equipment") setActiveTab("equipment");
                if (activeSlot === "drifter" || activeSlot === undefined)
                  setActiveSlot("weapon");
              }}
            >
              Equipment
            </button>
          </div>
          <div
            className={`flex items-center justify-center rounded-t-lg ${activeTab === "drifter" ? "scale-105 border border-b-0 border-neutral-700 bg-neutral-800" : "bg-neutral-900"}`}
          >
            <button
              className="h-full w-full cursor-pointer rounded-t-lg hover:brightness-125"
              aria-label="Drifter Tab"
              onClick={() => {
                if (activeTab != "drifter") setActiveTab("drifter");
                if (activeSlot != "drifter") setActiveSlot("drifter");
              }}
            >
              Drifter
            </button>
          </div>
          <div
            className={`flex items-center justify-center rounded-t-lg ${activeTab === "support" ? "scale-105 border border-b-0 border-neutral-700 bg-neutral-800" : "bg-neutral-900"}`}
          >
            <button
              className="h-full w-full cursor-pointer rounded-t-lg hover:brightness-125"
              aria-label="Support Tab"
              onClick={() => {
                if (activeTab != "support") setActiveTab("support");
              }}
            >
              Support
            </button>
          </div>
          <div
            className={`flex items-center justify-center rounded-t-lg ${activeTab === "description" ? "scale-105 border border-b-0 border-neutral-700 bg-neutral-800" : "bg-neutral-900"}`}
          >
            <button
              className="h-full w-full cursor-pointer rounded-t-lg hover:brightness-125"
              aria-label="Description Tab"
              onClick={() => {
                if (activeTab != "description") setActiveTab("description");
              }}
            >
              Description
            </button>
          </div>
          <div
            className={`flex items-center justify-center rounded-t-lg ${activeTab === "comments" ? "scale-105 border border-b-0 border-neutral-700 bg-neutral-800" : "bg-neutral-900"}`}
          >
            <button
              className="h-full w-full cursor-pointer rounded-t-lg hover:brightness-125"
              aria-label="Comments Tab"
              onClick={() => {
                if (activeTab != "comments") setActiveTab("comments");
              }}
            >
              Comments
            </button>
          </div>
        </div>
        <div
          className={`${activeTab === "description" ? "h-full" : ""} h-fit w-full rounded border border-neutral-700 bg-neutral-800 break-all`}
        >
          {activeTab === "equipment" && (
            <Equipment
              slot={activeSlot as Exclude<ActiveSlots, "drifter">}
              activeBuildIndex={activeBuildIndex}
            />
          )}
          {activeTab === "drifter" && (
            <Drifter activeBuildIndex={activeBuildIndex} />
          )}
          {activeTab === "support" && <Support />}
          {activeTab === "description" && <Description />}
          {activeTab === "comments" && <CommentSection />}
        </div>
      </div>
    </div>
  );
};

export default BuildEditor;
