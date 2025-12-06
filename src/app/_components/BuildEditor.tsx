"use client";

import { useBuildForm } from "./buildFormContext";
import Equipment from "./equipment";
import Support from "./support";
import Drifter from "./drifter";
import Description from "../characters/[characterId]/description/page";
import CommentSection from "./CommentSection";
import { LuSwords, LuUser } from "react-icons/lu";
import { MdOutlineDescription, MdOutlineHealthAndSafety } from "react-icons/md";
import { FaRegComments } from "react-icons/fa6";
import clsx from "clsx";

const BuildEditor = () => {
  const {
    activeTab,
    setActiveTab,
    activeSlot,
    setActiveSlot,
    character,
    setActiveSupport,
  } = useBuildForm();

  const editorTabStyles =
    "flex h-full w-full cursor-pointer items-center justify-center gap-1 rounded-t-lg border border-b-0 border-neutral-700 transition-all hover:brightness-110";

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="grid h-10 w-11/12 grid-cols-5 gap-2">
        <button
          className={clsx(
            editorTabStyles,
            activeTab === "equipment"
              ? "scale-105 border-neutral-700 bg-neutral-800"
              : "border-neutral-800 bg-neutral-900",
          )}
          aria-label="Equipment Tab"
          onClick={() => {
            if (activeTab !== "equipment") setActiveTab("equipment");
            if (activeSlot === "drifters" || activeSlot === undefined)
              setActiveSlot("weapon");
          }}
        >
          <LuSwords />
          <span className="hidden xl:block">Equipment</span>
        </button>
        <button
          className={clsx(
            editorTabStyles,
            activeTab === "drifters"
              ? "scale-105 border-neutral-700 bg-neutral-800"
              : "border-neutral-800 bg-neutral-900",
          )}
          aria-label="Drifter Tab"
          onClick={() => {
            if (activeTab !== "drifters") setActiveTab("drifters");
            if (activeSlot !== "drifters") setActiveSlot("drifters");
          }}
        >
          <LuUser />
          <p className="hidden xl:block">Drifter</p>
        </button>
        <button
          className={clsx(
            editorTabStyles,
            activeTab === "support"
              ? "scale-105 border-neutral-700 bg-neutral-800"
              : "border-neutral-800 bg-neutral-900",
          )}
          aria-label="Support Tab"
          onClick={() => {
            if (activeTab !== "support") {
              setActiveTab("support");
              setActiveSupport(undefined);
            }
          }}
        >
          <MdOutlineHealthAndSafety />
          <p className="hidden xl:block">Support</p>
        </button>
        <button
          className={clsx(
            editorTabStyles,
            activeTab === "description"
              ? "scale-105 border-neutral-700 bg-neutral-800"
              : "border-neutral-800 bg-neutral-900",
          )}
          aria-label="Description Tab"
          onClick={() => {
            if (activeTab !== "description") setActiveTab("description");
          }}
        >
          <MdOutlineDescription />
          <p className="hidden xl:block">Description</p>
        </button>
        <button
          className={clsx(
            editorTabStyles,
            activeTab === "comments"
              ? "scale-105 border-neutral-700 bg-neutral-800"
              : "border-neutral-800 bg-neutral-900",
          )}
          aria-label="Comments Tab"
          onClick={() => {
            if (activeTab !== "comments") setActiveTab("comments");
          }}
        >
          <FaRegComments />
          <p className="hidden xl:block">
            Comments{" "}
            <span className="not-2xl:hidden">
              ({character?._count.comments})
            </span>
          </p>
        </button>
      </div>
      <div className="w-full rounded border border-neutral-700 bg-neutral-800">
        {activeTab === "equipment" && <Equipment />}
        {activeTab === "drifters" && <Drifter />}
        {activeTab === "support" && <Support />}
        {activeTab === "description" && <Description />}
        {activeTab === "comments" && <CommentSection />}
      </div>
    </div>
  );
};

export default BuildEditor;
