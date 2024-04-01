import { MenuProps, Dropdown, Space, Avatar } from "antd";
import { HeaderBar, MentLink, Title } from "./style";
import { useAppSelector } from "@/hooks/useAppStore";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "@/.umi/exports";
import env from "@/config/env";
import { useLocation } from "umi";

import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";

const { Header } = Layout;

function NavigationBar() {
  const { userInfo } = useAppSelector((state) => state.user);

  const location = useLocation();
  const [pathKey, setPathKey] = useState("");

  const items: MenuProps["items"] = [
    {
      key: "/user-info",
      label: <Link to="/user-info">个人信息</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "/edit-password-a",
      label: <Link to="/edit-password-a">修改密码</Link>,
      icon: <LogoutOutlined />,
    },
    {
      key: "/login",
      label: <Link to="/login">退出登录</Link>,
      icon: <LogoutOutlined />,
    },
  ];

  useEffect(() => {
    if (!location.pathname.includes("booking-details")) {
      console.log("location.pathname", location.pathname);

      setPathKey(location.pathname);
    }
  }, [location.pathname]);

  const permissions = userInfo.permissions
    ? userInfo.permissions.map((item) => item.code)
    : [];

  const mentItem: MenuProps["items"] = [
    {
      key: "/user-manage",
      label: <Link to="/user-manage">用户管理</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "/meeting-manage",
      label: <Link to="/meeting-manage">会议室管理</Link>,
      icon: <LogoutOutlined />,
    },
  ];

  const showItem = [
    {
      key: "/",
      label: <Link to="/">统计</Link>,
      icon: <LogoutOutlined />,
    },
    ...mentItem.map((item) => {
      if (permissions.includes(item!.key as string)) {
        return item;
      }
    }),
    {
      key: "/meeting-list",
      label: <Link to="/meeting-list">会议室</Link>,
      icon: <LogoutOutlined />,
    },
  ] as MenuProps["items"];

  return (
    <HeaderBar>
      <Header
        style={{ display: "flex", alignItems: "center", background: "#3c8dbc" }}
      >
        <Title>会议室预定系统</Title>
        <Menu
          className="menu-class"
          mode="horizontal"
          selectedKeys={[pathKey]}
          items={showItem}
          style={{ flex: 1, minWidth: 0 }}
        />
        {userInfo ? (
          <div style={{ cursor: "pointer" }}>
            <Dropdown
              menu={{ items }}
              placement="topRight"
              arrow={{ pointAtCenter: true }}
            >
              <a onClick={(e) => e.preventDefault()} style={{ color: "#fff" }}>
                <Space>
                  <Avatar src={env.server_host + userInfo.headPic} />
                  {userInfo?.nickName || userInfo?.username}
                </Space>
              </a>
            </Dropdown>
          </div>
        ) : (
          ""
        )}
      </Header>
    </HeaderBar>
  );
}

export default NavigationBar;
