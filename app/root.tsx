import type { LinksFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { Layout as AntdLayout, ConfigProvider, Typography, theme } from "antd";
import { ResponsiveAppBar } from "~/components/ResponsiveAppBar";

const { Header, Content, Footer } = AntdLayout;

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            /* here is your component tokens */
            headerBg: "blue",
          },
        },
      }}
    >
      <html lang="ja">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <div
            // style={{ display: "flex", alignItems: "center" }}
            className="pt-3 justify-center flex bg-slate-300"
          >
            <Typography.Title level={2}>JAWS DAYS 2025</Typography.Title>
          </div>
          <div className="justify-center flex bg-blue-300">
            <ResponsiveAppBar />
          </div>
          <div className="bg-red-300">{children}</div>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ConfigProvider>
  );
}

export default function App() {
  return <Outlet />;
}
