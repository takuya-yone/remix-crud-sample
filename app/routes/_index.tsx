import type { MetaFunction } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Typography } from "antd";
import { microCmsClient, type newsListApiResponse } from "app/routes/microcmsClient";
import { typedjson, useTypedLoaderData } from "remix-typedjson";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const data: newsListApiResponse = await microCmsClient
    .get({
      customRequestInit: {
        cache: "no-store",
      },
      endpoint: "news",
      queries: { limit: 1 },
    })
    .catch((e) => {
      console.error(e);
    });
  return typedjson(data);
};

export default function Index() {
  const newsItems = useTypedLoaderData<typeof loader>();
  return (
    <>
      <div className="flex h-[25rem] items-center justify-center bg-yellow-300">
        <Typography.Text code>{JSON.stringify(newsItems)}</Typography.Text>

        <Typography.Text>imgimg</Typography.Text>
      </div>
      <div className="flex h-screen items-center justify-center">
        <Typography.Text>j;lj;jk;jl</Typography.Text>
      </div>
    </>
  );
}
