import type { MetaFunction } from "@remix-run/node";
import { Typography } from "antd";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <>
      <div className="flex h-[25rem] items-center justify-center bg-yellow-300">
        <Typography.Text>imgimg</Typography.Text>
      </div>
      <div className="flex h-screen items-center justify-center">
        <Typography.Text>j;lj;jk;jl</Typography.Text>
      </div>
    </>
  );
}
