import { SignIn, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api, RouterOutputs } from "~/utils/api";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Image from "next/image";

dayjs.extend(relativeTime)

const CreatePostWizard = () => {
    const {user} = useUser();
    if(!user) return null;

    return <div className="flex gap-4 w-full">
        <Image src={user.profileImageUrl} alt="profileImg" className="aspect-square rounded-full" width={56} height={56}/>
        <input type="text" placeholder="Chirp what is up" className="bg-transparent text-white grow outline-none" />
    </div>
}

type PostWithUser = RouterOutputs["posts"]["getAll"][number]
const PostView = (props: PostWithUser) => {
    const {post, author} = props;
    return (
        <div key={post.id} className="p-4 border-b border-slate-400 flex gap-3 items-center">
            <Image src={author.profileImageUrl} alt="author img" className="w-14 aspect-square rounded-full" width={56} height={56}/>
            <div className="flex flex-col">
                <div className="text-slate-300 flex gap-1 font-thin"><a className="font-normal cursor-pointer">@{author.username}</a><span>•</span><span>{`${dayjs(post.createdAt).fromNow()}`}</span></div>
                {post.content}
            </div>
        </div>
    )
}

const Home: NextPage = () => {
    const user = useUser();

    const { data, isLoading } = api.posts.getAll.useQuery();

    if(isLoading) return <div>Loading...</div>
    if(!data) return <div>No posts</div>

    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Twitter clone" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex justify-center h-screen">
                <div className="h-full w-full md:max-w-3xl border-x border-slate-400">
                    <div className="border-b border-slate-400 p-4 flex">
                        {!user.isSignedIn && <div className="flex justify-center"><SignInButton /></div>}
                        {user.isSignedIn && <CreatePostWizard />}
                    </div>
                    <div className="flex flex-col-reverse">
                        {/* @ts-ignore */}
                        {data?.map((fullPost) => (
                            <PostView {...fullPost} key={fullPost.post.id}/>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
