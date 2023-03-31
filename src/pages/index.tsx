import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api, RouterOutputs } from "~/utils/api";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image";
import { LoadingPage, LoadingSpinner } from "@components/loading";
import { useState } from "react";
import toast from 'react-hot-toast';

dayjs.extend(relativeTime)
function isValidHttpUrl(string:string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

// creating the posts
const CreatePostWizard = () => {
    const [input, setInput] = useState("")
    const {user} = useUser();
    if(!user) return null;
    const ctx = api.useContext();

    const {mutate, isLoading: isPosting} = api.posts.create.useMutation({
        onSuccess: () => {
            setInput("");
            void ctx.posts.getAll.invalidate();  
            toast.success('Successfully Chirped!')
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if(errorMessage && errorMessage[0]) toast.error(errorMessage[0]);
            else{
                toast.error("Failed to post. Please try again");
            }
        }
    });

    return <div className="flex gap-4 w-full transition duration-500">
        <Image src={user.profileImageUrl} alt="profileImg" className="aspect-square rounded-full" width={56} height={56}/>
        <input type="text" placeholder="Chirp what is up" className="bg-transparent text-white grow outline-none" 
        value={input} onKeyDown={(e)=>{if(e.key === "Enter"){e.preventDefault(); if(input !== ""){mutate({content:input})}}}}
        onChange={(e) => setInput(e.target.value)} disabled={isPosting} autoComplete="off"/>

        {(input.length > 5 && !isPosting) && <button onClick={()=> mutate({content:input})}>Post</button>}
        {isPosting && <div className="h-full flex place-items-center justify-center"><LoadingSpinner spinnerSize={20}/></div>}
        
    </div>
}

// displaying each post
type PostWithUser = RouterOutputs["posts"]["getAll"][number]
const PostView = (props: PostWithUser) => {
    const {post, author} = props;
    return (
        <div key={post.id} className="p-4 border-b border-slate-400 flex gap-3 items-center">
            <Image src={author.profileImageUrl} alt="author img" className="w-14 aspect-square rounded-full" width={56} height={56}/>
            <div className="flex flex-col">
                <div className="text-slate-300 flex gap-1 font-thin"><a className="font-normal cursor-pointer">@{author.username}</a><span>•</span><span>{`${dayjs(post.createdAt).fromNow()}`}</span></div>
                {!isValidHttpUrl(post.content) ? <span className="text-xl text-slate-100">{post.content}</span> : <a className="text-xl text-slate-100 underline underline-offset-1" href={post.content} target="_blank" >{post.content}</a>}
            </div>
        </div>
    )
}

// displays the main feed
const Feed = () => {
    const { data, isLoading:postLoading } = api.posts.getAll.useQuery();
    if(postLoading) return <LoadingPage/>
    if(!data) return <div>Something went wrong</div>

    return(
        <div className="flex flex-col border-x border-slate-400">
            {data?.map((fullPost) => (
                <PostView {...fullPost} key={fullPost.post.id}/>
            ))}
        </div> 
    )
}

const Home: NextPage = () => {
    const {isLoaded: userLoaded, isSignedIn } = useUser();

    api.posts.getAll.useQuery();

    if(!userLoaded) return <div/>;

    return (
        <>
            <Head>
                <title>China Twitter</title>
                <meta name="description" content="Twitter clone" />
                <link rel="icon" href="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png" />
            </Head>
            <main className="flex justify-center h-screen">
                <div className={`h-full w-full md:max-w-3xl`}>
                    <div className="border-b border-slate-400 p-4 flex border-x">
                        {!isSignedIn && <div className="flex justify-center"><SignInButton /></div>}
                        {isSignedIn && <CreatePostWizard />}
                    </div>
                    <Feed/>
                </div>
            </main>
        </>
    );
};

export default Home;
