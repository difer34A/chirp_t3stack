import type { PropsWithChildren } from "react";
export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center">
      <div className="flex h-full w-full flex-col border-x border-slate-500 md:max-w-4xl overflow-y-scroll">
        {props.children}
      </div>
    </main>
  );
};