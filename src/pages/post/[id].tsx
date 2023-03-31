import { type NextPage } from "next";
import Head from "next/head";

import { api, RouterOutputs } from "~/utils/api";

const PostPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>China Twitter</title>
                <meta name="description" content="Twitter clone" />
                <link rel="icon" href="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png" />
            </Head>
            <main className="flex justify-center h-screen">
                <div>PostView</div>
            </main>
        </>
    );
};

export default PostPage;
