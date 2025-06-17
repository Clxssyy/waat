import BuilderHeader from "./BuilderHeader";
import BuildDisplay from "./BuildDisplay";
import BuildEditor from "./BuildEditor";

const Builder = () => {
  return (
    <div className="scrollbar flex w-5/6 flex-col gap-2 overflow-x-hidden overflow-y-scroll bg-neutral-950">
      <BuilderHeader />
      <div className="mb-2 flex grow gap-12 bg-neutral-950 not-lg:flex-col not-lg:place-items-center lg:mx-12">
        <BuildDisplay />
        <BuildEditor />
      </div>
    </div>
  );
};

export default Builder;
