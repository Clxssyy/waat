const PlaceholderCard = () => {
  return (
    <div className="flex gap-2 rounded bg-neutral-900 p-2">
      <div className="aspect-square h-26 bg-neutral-800 p-2">
        <div className="aspect-square h-full animate-pulse rounded bg-neutral-700" />
      </div>
      <div className="flex grow flex-col gap-2 rounded bg-neutral-800 p-2">
        <div className="h-4 animate-pulse rounded-full bg-neutral-700" />
        <div className="flex grow flex-col justify-center gap-1">
          <div className="flex w-full gap-1">
            <div className="h-2 w-1/4 animate-pulse rounded-full bg-neutral-700" />
            <div className="h-2 grow animate-pulse rounded-full bg-neutral-700" />
          </div>
          <div className="flex w-full gap-1">
            <div className="h-2 w-1/5 animate-pulse rounded-full bg-neutral-700" />
            <div className="h-2 grow animate-pulse rounded-full bg-neutral-700" />
            <div className="h-2 w-1/5 animate-pulse rounded-full bg-neutral-700" />
          </div>
          <div className="flex w-full gap-1">
            <div className="h-2 w-1/3 animate-pulse rounded-full bg-neutral-700" />
            <div className="h-2 grow animate-pulse rounded-full bg-neutral-700" />
            <div className="h-2 w-1/4 animate-pulse rounded-full bg-neutral-700" />
          </div>
          <div className="flex w-full gap-1">
            <div className="h-2 w-1/2 animate-pulse rounded-full bg-neutral-700" />
            <div className="h-2 grow animate-pulse rounded-full bg-neutral-700" />
            <div className="h-2 w-1/6 animate-pulse rounded-full bg-neutral-700" />
          </div>
          <div className="flex w-full gap-1">
            <div className="h-2 w-1/5 animate-pulse rounded-full bg-neutral-700" />
            <div className="h-2 grow animate-pulse rounded-full bg-neutral-700" />
            <div className="h-2 w-1/5 animate-pulse rounded-full bg-neutral-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderCard;
