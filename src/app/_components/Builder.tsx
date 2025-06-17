import BuilderHeader from "./BuilderHeader";
import BuildDisplay from "./BuildDisplay";
import BuildEditor from "./BuildEditor";
import clsx from "clsx";

const GAP_COLOR = "bg-neutral-950";

const Builder = () => {
  return (
    <div
      className={clsx(
        "scrollbar flex w-5/6 flex-col gap-2 overflow-x-hidden overflow-y-scroll",
        GAP_COLOR,
      )}
    >
      <BuilderHeader />
      <div
        className={clsx(
          "mb-2 flex grow gap-12 not-lg:flex-col not-lg:place-items-center lg:mx-12",
          GAP_COLOR,
        )}
      >
        <BuildDisplay />
        <BuildEditor />
      </div>
    </div>
  );
};

export default Builder;
