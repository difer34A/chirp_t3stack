import type { PropsWithChildren } from "react";
export const FeedLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex justify-center w-full">
      <div className="flex h-full w-full flex-col sm:border-x max-w-[1000px] overflow-y-scroll border-slate-500">
        {props.children}
        <div className="block h-12 sm:hidden w-full"><div/></div>
      </div>
    </main>
  );
};

export const PageLayout = (props: PropsWithChildren) => {
    return (
      <main className="flex flex-col sm:flex-row w-screen h-screen">
          {props.children}
      </main>
    );
};