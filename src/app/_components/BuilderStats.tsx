const BuildStats = () => {
  return (
    <div className="flex w-1/6 flex-col gap-2 border border-neutral-700 bg-neutral-800 p-2">
      <h2 className="text-center">Stats</h2>
      <div className="flex flex-col text-sm">
        <p className="flex h-12 items-center justify-between px-2 py-1 odd:bg-neutral-700">
          <span>Power</span>
          <span>#</span>
        </p>
        <p className="flex justify-between px-2 py-1 odd:bg-neutral-700">
          <span>HP</span>
          <span>#</span>
        </p>
        <p className="flex justify-between px-2 py-1 odd:bg-neutral-700">
          <span>MP</span>
          <span>#</span>
        </p>
        <p className="flex justify-between px-2 py-1 odd:bg-neutral-700">
          <span>Attack Power</span>
          <span>#</span>
        </p>
        <p className="flex justify-between px-2 py-1 odd:bg-neutral-700">
          <span>Armor</span>
          <span>#</span>
        </p>
        <p className="flex justify-between px-2 py-1 odd:bg-neutral-700">
          <span>Magic Resistance</span>
          <span>#</span>
        </p>
      </div>
    </div>
  );
};

export default BuildStats;
