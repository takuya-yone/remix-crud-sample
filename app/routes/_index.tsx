import type { MetaFunction } from "@remix-run/node";
// import { ResponsiveAppBar } from "./ResponsiveAppBar";
import { ResponsiveAppBar } from "~/components/ResponsiveAppBar";
import { Typography } from "antd";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="flex  justify-center pt-3">
        <Typography.Title level={2}>JAWS DAYS 2025</Typography.Title>
      </div>
      <div className="flex  justify-center">
        <ResponsiveAppBar />
      </div>

      <div className="flex h-screen items-center justify-center">
        <Typography.Text>j;lj;jk;jl</Typography.Text>
      </div>
    </>
  );
}
