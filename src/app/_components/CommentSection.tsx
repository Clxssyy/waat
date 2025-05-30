"use client";

import Image from "next/image";
import Comment from "./Comment";
import { useSession } from "next-auth/react";
import { useState } from "react";

const CommentSection = () => {
  const session = useSession();
  const [newComment, setNewComment] = useState<string>();
  return (
    <div className="flex flex-col gap-4 p-2">
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
            className="h-8 w-8 rounded-full outline-2 group-hover:outline-white"
          />
          <p className="text-sm">Add a comment</p>
        </div>
        <div className="flex flex-col gap-1">
          <textarea
            placeholder="Have any feedback?"
            value={newComment}
            className="h-24 resize-none rounded border border-neutral-700 p-2 text-white"
            maxLength={360}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="cursor-pointer place-self-end rounded border border-neutral-600 bg-neutral-700 px-3 py-1 hover:brightness-125 disabled:opacity-40">
            Add Comment
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {false ? (
          <Comment />
        ) : (
          <p className="w-full text-center text-lg font-bold text-neutral-500">
            Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
