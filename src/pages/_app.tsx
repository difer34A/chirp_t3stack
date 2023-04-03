import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import {dark} from "@clerk/themes"
import { PageLayout } from "~/components/layout";
import Menu from "~/components/Menu";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <PageLayout>
        <ClerkProvider appearance={{baseTheme: dark}} {...pageProps}>
            <Head>
                <title>China Twitter</title>
                <meta name="description" content="Twitter clone" />
                <link rel="icon" href="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-twitter-social-media-round-icon-png-image_6315985.png" />
            </Head>
            
                <Menu/>
                <Toaster position="bottom-center"/>
                <Component {...pageProps} />
            
        </ClerkProvider>
    </PageLayout>
  );
};

export default api.withTRPC(MyApp);
