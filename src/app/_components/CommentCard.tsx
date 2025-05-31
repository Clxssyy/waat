import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CommentWithReplies } from "~/types";
import CommentInput from "./CommentInput";
import { FaEllipsisVertical, FaReply } from "react-icons/fa6";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";

const CommentCard = ({ comment }: { comment: CommentWithReplies }) => {
  const session = useSession();
  const router = useRouter();

  const voteTotal = comment.votes.reduce((prev, vote) => prev + vote.value, 0);
  const isAuthor = comment.userId === session.data?.user.id;
  const hasVoted = comment.votes.filter(
    (vote) => vote.userId === session.data?.user.id,
  )[0];

  const ellipsisMenu = useRef<HTMLDivElement>(null);
  const [voteValue, setVoteValue] = useState<number>(hasVoted?.value ?? 0);
  const [voteTotalValue, setVoteTotalValue] = useState<number>(voteTotal);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const deleteComment = api.comment.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const createVote = api.comment.createVote.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const updateVote = api.comment.updateVote.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const deleteVote = api.comment.deleteVote.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  useEffect(() => {
    function handleDocumentClick(e: MouseEvent) {
      if (
        isMenuOpen &&
        ellipsisMenu.current &&
        !ellipsisMenu.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setVoteTotalValue(voteTotal + voteValue - (hasVoted?.value ?? 0));
  }, [voteValue, voteTotal, hasVoted]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Image
              src={
                comment?.user.image ??
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
              }
              alt="User profile picture"
              width={100}
              height={100}
              className="h-6 w-6 rounded-full outline-2 group-hover:outline-white"
            />
            <h2 className="text-sm">{comment?.user.name}</h2>
          </div>
          <div className="h-3/5 rounded border border-neutral-600" />
          <p className="text-sm">{comment?.createdAt.toLocaleDateString()}</p>
        </div>
        <div className="relative" ref={ellipsisMenu}>
          <button
            className="cursor-pointer rounded bg-neutral-800 p-1 hover:brightness-125"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaEllipsisVertical />
          </button>
          <div
            className={`absolute right-0 rounded ${isMenuOpen ? "block" : "hidden"} flex flex-col rounded border border-neutral-600`}
          >
            {isAuthor ? (
              <button
                className="cursor-pointer bg-neutral-700 px-2 py-0.5 text-sm transition-all hover:text-red-500 hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => deleteComment.mutate({ id: comment.id })}
                disabled={deleteComment.isPending || deleteComment.isSuccess}
              >
                Delete
              </button>
            ) : null}
            <button
              className="cursor-pointer bg-neutral-700 px-2 py-0.5 text-sm transition-all hover:text-red-500 hover:brightness-125 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => setIsMenuOpen(false)}
            >
              Report
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="ml-[11px] rounded-full border-1 border-neutral-700" />
        <div className="flex w-full flex-col gap-1 overflow-hidden text-wrap">
          <p className="overflow-hidden text-sm text-ellipsis">
            {comment?.content}
          </p>
          <div className="flex gap-1">
            <button
              className="cursor-pointer"
              disabled={
                deleteVote.isPending ||
                updateVote.isPending ||
                createVote.isPending
              }
              onClick={() => {
                if (hasVoted) {
                  if (voteValue === 1) {
                    setVoteValue(0);
                    return deleteVote.mutate({ id: hasVoted.id });
                  }

                  setVoteValue(1);
                  return updateVote.mutate({
                    id: hasVoted.id,
                    value: 1,
                  });
                }

                setVoteValue(1);
                return createVote.mutate({
                  commentId: comment.id,
                  value: 1,
                });
              }}
            >
              {voteValue === 1 ? <BiSolidUpvote /> : <BiUpvote />}
            </button>
            <p className="text-sm">{voteTotalValue}</p>
            <button
              className="cursor-pointer"
              disabled={
                deleteVote.isPending ||
                updateVote.isPending ||
                createVote.isPending
              }
              onClick={() => {
                if (hasVoted) {
                  if (voteValue === -1) {
                    setVoteValue(0);
                    return deleteVote.mutate({ id: hasVoted.id });
                  }

                  setVoteValue(-1);
                  return updateVote.mutate({
                    id: hasVoted.id,
                    value: -1,
                  });
                }

                setVoteValue(-1);
                return createVote.mutate({
                  commentId: comment.id,
                  value: -1,
                });
              }}
            >
              {voteValue === -1 ? <BiSolidDownvote /> : <BiDownvote />}
            </button>
            <button
              className="flex cursor-pointer items-center gap-1 text-sm"
              onClick={() => setIsReplying(!isReplying)}
            >
              <FaReply /> Reply
            </button>
          </div>
          {isReplying ? (
            <CommentInput
              parentId={comment.id}
              onSubmit={() => setIsReplying(false)}
            />
          ) : null}
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
