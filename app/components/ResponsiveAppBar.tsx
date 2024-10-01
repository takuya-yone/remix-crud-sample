import {
  CameraOutlined,
  DatabaseOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  MailOutlined,
  PushpinOutlined,
  QuestionCircleOutlined,
  SolutionOutlined,
  StarOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

export const ResponsiveAppBar = () => {
  const items: MenuItem[] = [
    {
      label: "Home",
      key: "home",
      icon: <HomeOutlined />,
    },
    {
      label: "About",
      key: "about",
      icon: <InfoCircleOutlined />,

      children: [
        { label: "Event", key: "setting:1" },
        { label: "Welcome", key: "setting:2" },
        { label: "Stamp Rally", key: "setting:2" },
        { label: "Scholorship", key: "setting:2" },
      ],
    },
    {
      label: "Session",
      key: "session",
      icon: <DatabaseOutlined />,

      children: [
        { label: "Timetable", key: "setting:1" },
        { label: "List", key: "setting:2" },
        { label: "Call for X", key: "setting:2" },
        { label: "Ticket", key: "setting:2" },
      ],
    },
    {
      label: "Floor Map",
      key: "floormap",
      icon: <PushpinOutlined />,
    },
    {
      label: "Supporter",
      key: "Supporter",
      icon: <TeamOutlined />,

      children: [
        { label: "個人サポーター紹介", key: "setting:1" },
        { label: "企業サポーター募集", key: "setting:2" },
        { label: "個人サポーター紹介", key: "setting:2" },
        { label: "個人サポーター募集", key: "setting:2" },
      ],
    },
    {
      label: "Staff",
      key: "staff",
      icon: <UserOutlined />,

      children: [
        { label: "実行委員", key: "setting:1" },
        { label: "ボランティアスタッフ募集", key: "setting:2" },
      ],
    },
    {
      label: "Privacy Policy",
      key: "policy",
      icon: <MailOutlined />,
    },
    {
      label: "Promotion",
      key: "Promotion",
      icon: <StarOutlined />,
    },
    {
      label: "Follow Up",
      key: "followup",
      icon: <SolutionOutlined />,
    },
    {
      label: "Photos",
      key: "photos",
      icon: <CameraOutlined />,
    },
    {
      label: "FAQ",
      key: "faq",
      icon: <QuestionCircleOutlined />,
    },
  ];
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div className="bg-slate-200">
      <Menu
        style={{ minWidth: 0, flex: "auto" }}
        // className="w-full"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};
