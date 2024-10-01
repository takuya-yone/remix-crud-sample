import type { MetaFunction } from "@remix-run/node";
import { Typography } from "antd";
import { ResponsiveAppBar } from "~/components/ResponsiveAppBar";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <>
      <div className="flex  justify-center pt-3 bg-slate-400">
        <Typography.Title level={2}>JAWS DAYS 2025</Typography.Title>
      </div>
      <div className="flex  justify-center bg-amber-300">
        <ResponsiveAppBar />
      </div>

      <div className="flex h-screen items-center justify-center bg-blue-300">
        <Typography.Text>j;lj;jk;jl</Typography.Text>
      </div>
    </>
  );
}
