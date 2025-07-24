import BuilderHeader from "./BuilderHeader";
import BuildDisplay from "./BuildDisplay";
import BuildEditor from "./BuildEditor";

const Builder = () => {
  return (
    <div className="flex w-7/8 flex-col gap-2 overflow-x-hidden overflow-y-scroll bg-gradient-to-br from-neutral-950 to-neutral-900">
      <BuilderHeader />
      <div className="mx-10 mb-4 flex grow flex-col gap-12 lg:flex-row">
        <BuildDisplay />
        <BuildEditor />
      </div>
    </div>
  );
};

export default Builder;
