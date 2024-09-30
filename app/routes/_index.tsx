import type { MetaFunction } from "@remix-run/node";
// import { ResponsiveAppBar } from "./ResponsiveAppBar";
import { ResponsiveAppBar } from "~/components/ResponsiveAppBar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <ResponsiveAppBar />
      <div className="flex flex-col items-center gap-16">j;lj;jk;jl</div>
    </div>
  );
}
