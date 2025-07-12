import BuilderHeader from "./BuilderHeader";
import BuildDisplay from "./BuildDisplay";
import BuildEditor from "./BuildEditor";

const Builder = () => {
  return (
    <div className="scrollbar flex w-7/8 flex-col gap-2 overflow-x-hidden overflow-y-scroll bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800">
      <BuilderHeader />
      <div className="mx-12 mb-2 flex grow flex-col gap-12 lg:flex-row">
        <BuildDisplay />
        <BuildEditor />
      </div>
    </div>
  );
};

export default Builder;
