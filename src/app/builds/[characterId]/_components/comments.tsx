const Comments = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <h1 className="text-2xl font-bold">Comments</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col rounded border border-neutral-600 bg-neutral-700 p-2">
          <div className="flex justify-between">
            <h2>Name</h2>
            <span>Date</span>
          </div>
          <p className="text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
            consectetur harum numquam nobis, obcaecati, illo rerum vitae labore
            facere aspernatur fugit adipisci aperiam fugiat est, debitis
            expedita tempore deleniti. Adipisci?
          </p>
        </div>
        <div className="flex flex-col rounded border border-neutral-600 bg-neutral-700 p-2">
          <div className="flex justify-between">
            <h2>Name</h2>
            <span>Date</span>
          </div>
          <p className="text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
            consectetur harum numquam nobis, obcaecati, illo rerum vitae labore
            facere aspernatur fugit adipisci aperiam fugiat est, debitis
            expedita tempore deleniti. Adipisci?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
