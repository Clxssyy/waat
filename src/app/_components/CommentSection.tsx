import Comment from "./Comment";

const CommentSection = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <h1 className="text-2xl font-bold">Comments</h1>
      <div className="flex flex-col gap-2">{<Comment />}</div>
    </div>
  );
};

export default CommentSection;
