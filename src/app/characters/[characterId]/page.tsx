import BuildDisplay from "~/app/_components/BuildDisplay";
import BuildEditor from "~/app/_components/BuildEditor";
import BuilderHeader from "~/app/_components/BuilderHeader";
import BuildStats from "~/app/_components/BuilderStats";

const Builder = () => {
  return (
    <div className="flex w-7/8 flex-col gap-2 overflow-x-hidden overflow-y-scroll bg-gradient-to-br from-neutral-950 to-neutral-900">
      <BuilderHeader />
      <div className="mx-2 mb-2 flex grow flex-col gap-2 lg:flex-row">
        <BuildDisplay />
        <BuildEditor />
        <BuildStats />
      </div>
    </div>
  );
};

export default Builder;
