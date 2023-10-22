import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ApiOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined
} from "@ant-design/icons";
const { Header, Sider, Content } = Layout;
import { useRouter } from "next/router";
import { Button, Layout, Menu, theme, Badge, Avatar } from "antd";
import { useSession } from "next-auth/react";
import { useCart } from "../../../store/cart";

export default function LayoutComponent({ children }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const { count } = useCart();
  const [keyMenu, setKeyMenu] = useState();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[keyMenu]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              disabled: true,
              label: session?.user?.email,
            },
            {
              key: "2",
              icon: <HomeOutlined />,
              label: "Home",
              "data-testid":"btn-home",
              onClick: () => {
                setKeyMenu("2");
                router.push("/");
              },
            },
            {
              key: "3",
              icon: <ShoppingCartOutlined />,
              "data-testid":"btn-car",
              label: (
                <>
                  Carrito
                  <Badge count={count} offset={[10, 10]}>
                    <Avatar shape="square" size="" />
                  </Badge>
                </>
              ),
              onClick: () => {
                setKeyMenu("3");
                router.push("/cart");
              },
            },
            {
              key: "4",
              icon: <ApiOutlined />,
              "data-testid":"btn-close-session",
              label: "Cerrar sesion",
              onClick: () => signOut(),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            data-testid="btn-collapsed"
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
