import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import toast from 'react-hot-toast';
import { api } from "~/utils/api";
dayjs.extend(relativeTime);

function isValidHttpUrl(string:string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
    const {user} = useUser();
    const { post, author } = props;
    const ctx = api.useContext();
    const { mutate, isLoading: isPosting } = api.posts.deletePost.useMutation({
        onSuccess: () => {
            void ctx.posts.getPostsByUserId.invalidate();  
            toast.success('Successfully Deleted Post')
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
            toast.error(errorMessage[0]);
            } else {
            toast.error("Failed to Delete. Please try again");
            }
        }
    });

    return (
    <div key={post.id} className="group flex items-center border-b border-slate-600 p-4 justify-between w-full relative">
        <div className="flex gap-3 items-center">
            <Image
                src={author.profileImageUrl}
                className="h-14 w-14 rounded-full"
                alt={`@${author.username}'s profile picture`}
                width={56}
                height={56}
            />
            <div className="flex flex-col w-fit break-all">
                <div className="flex gap-1 text-slate-300">
                    <Link href={`/@${author.username}`}>
                        <span>{`@${author.username} `}</span>
                    </Link>
                    <Link href={`/post/${post.id}`}>
                        <span className="font-thin">{` · ${dayjs(
                        post.createdAt
                        ).fromNow()}`}</span>
                    </Link>
                </div>
                {isValidHttpUrl(post.content) ? <a href={post.content} target="_blank" className="text-xl underline underline-offset-1">{post.content}</a>:<span className="text-xl break-words">{post.content}</span>}
            </div>
        </div>
        {author.username === user?.username &&
        <button onClick={() => mutate({postId: post.id})} className="opacity-0 absolute right-6 group-hover:opacity-100 transition-opacity duration-100 ease-in-out z-10">
            <img
                src={"https://cdn-icons-png.flaticon.com/512/5028/5028066.png"}
                className={`h-6 aspect-square rounded-full`}
                alt={`@${author.username}'s profile picture`}
            />
        </button>
        }
    </div>
  );
};