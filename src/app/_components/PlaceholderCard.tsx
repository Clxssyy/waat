const PlaceholderCard = () => {
  return (
    <div className="flex h-full min-h-45 gap-2 rounded bg-gradient-to-br from-neutral-900 to-neutral-950 p-2">
      <div className="aspect-square h-full rounded bg-neutral-900 p-2">
        <div className="aspect-square h-full rounded bg-gradient-to-br from-neutral-700 to-neutral-800" />
      </div>
      <div className="flex grow flex-col justify-center rounded bg-neutral-900 p-2">
        <div className="flex flex-col gap-4">
          <div className="h-4 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
          <div className="flex grow flex-col gap-2">
            <div className="flex w-full gap-1">
              <div className="h-2 w-1/4 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
              <div className="h-2 grow rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
            </div>
            <div className="flex w-full gap-1">
              <div className="h-2 w-1/5 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
              <div className="h-2 grow rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
              <div className="h-2 w-1/5 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
            </div>
            <div className="flex w-full gap-1">
              <div className="h-2 w-1/3 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
              <div className="h-2 grow rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
              <div className="h-2 w-1/4 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
            </div>
            <div className="flex w-full gap-1">
              <div className="h-2 w-1/2 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
              <div className="h-2 grow rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
              <div className="h-2 w-1/6 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
            </div>
            <div className="flex w-full gap-1">
              <div className="h-2 w-1/5 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
              <div className="h-2 grow rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
              <div className="h-2 w-1/5 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
            </div>
            <div className="flex w-full gap-1">
              <div className="h-2 w-1/3 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
              <div className="h-2 grow rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
              <div className="h-2 w-1/6 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800" />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="h-2 w-1/8 rounded-full bg-gradient-to-br from-neutral-400 to-neutral-500"></div>
            <div className="h-2 w-1/5 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderCard;
