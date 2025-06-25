import BuilderHeader from "./BuilderHeader";
import BuildDisplay from "./BuildDisplay";
import BuildEditor from "./BuildEditor";

const Builder = () => {
  return (
    <div className="scrollbar flex flex-1 flex-col gap-2 overflow-x-hidden overflow-y-scroll bg-neutral-950">
      <BuilderHeader />
      <div className="mx-12 mb-2 flex grow flex-col gap-12 bg-neutral-950 lg:flex-row">
        <BuildDisplay />
        <BuildEditor />
      </div>
    </div>
  );
};

export default Builder;
