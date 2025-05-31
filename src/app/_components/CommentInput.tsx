"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useBuildForm } from "./buildFormContext";
import { useRouter } from "next/navigation";

const CommentInput = ({
  parentId,
  onSubmit,
}: {
  parentId: string | null;
  onSubmit?: () => void;
}) => {
  const session = useSession();
  const router = useRouter();
  const [newComment, setNewComment] = useState<string>();
  const { formData } = useBuildForm();

  const addComment = api.character.addComment.useMutation({
    onSuccess: () => {
      router.refresh();
      if (onSubmit) onSubmit();
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <Image
          src={
            session.data?.user?.image ??
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
          }
          alt="User profile picture"
          width={100}
          height={100}
          className="h-6 w-6 rounded-full outline-2 group-hover:outline-white"
        />
        <p className="text-sm">Add a comment</p>
      </div>
      <div className="mx-1 flex flex-col gap-1">
        <textarea
          placeholder="Have any feedback?"
          value={newComment}
          className="h-25 resize-none rounded border border-neutral-700 p-2 text-sm text-white"
          maxLength={360}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();

              if (!session.data?.user.id)
                return router.push("/api/auth/signin");
              if (!newComment) return;

              addComment.mutate({
                userId: session.data?.user.id,
                content: newComment,
                characterId: formData.id,
                parentId: parentId,
              });
              setNewComment("");
            }
          }}
          autoFocus
        />
        <button
          className="cursor-pointer place-self-end rounded border border-neutral-600 bg-neutral-700 px-3 py-1 text-sm hover:brightness-125 disabled:opacity-40"
          disabled={addComment.isPending}
          onClick={() => {
            if (!session.data?.user.id) return router.push("/api/auth/signin");
            if (!newComment) return;

            addComment.mutate({
              userId: session.data?.user.id,
              content: newComment,
              characterId: formData.id,
              parentId: parentId,
            });
            setNewComment("");
          }}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
