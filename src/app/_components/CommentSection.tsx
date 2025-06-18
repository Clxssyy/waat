import CommentDisplay from "./CommentDisplay";
import CommentInput from "./CommentInput";

const CommentSection = () => {
  return (
    <div className="flex flex-col gap-2 p-2 break-all">
      <CommentInput parentId={null} />
      <CommentDisplay />
    </div>
  );
};

export default CommentSection;
