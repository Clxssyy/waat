import { useBuildForm } from "./buildFormContext";
import type { CommentWithReplies } from "~/types";
import CommentCard from "./CommentCard";

const CommentDisplay = () => {
  const { character } = useBuildForm();
  const comments = character?.comments;
  const commentNodes: CommentWithReplies[] = (comments ?? []).map((c) => ({
    ...c,
    replies: [],
  }));

  const lookup: Record<string, CommentWithReplies> = {};
  commentNodes.forEach((node) => {
    lookup[node.id] = node;
  });

  const roots: CommentWithReplies[] = [];
  for (const node of commentNodes) {
    if (node.parentId) {
      const parent = lookup[node.parentId];
      if (parent) {
        parent.replies.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  return roots.map((root) => <CommentCard key={root.id} comment={root} />);
};

export default CommentDisplay;
