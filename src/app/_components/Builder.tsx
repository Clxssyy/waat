import BuilderHeader from "./BuilderHeader";
import BuildDisplay from "./BuildDisplay";
import BuildEditor from "./BuildEditor";

const Builder = () => {
  return (
    <div className="flex grow flex-col overflow-hidden bg-neutral-950">
      <BuilderHeader />
      <div className="mx-14 mb-4 flex grow gap-14">
        <BuildDisplay />
        <BuildEditor />
      </div>
    </div>
  );
};

export default Builder;
