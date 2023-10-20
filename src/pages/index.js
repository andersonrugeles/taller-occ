import React from "react";

import { useSession, signIn, signOut } from "next-auth/react";
import fetch from "isomorphic-fetch";
import { UserSwitchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ProductList from "@/components/ProductList/ProductList";
import LayoutComponent from "@/components/Layout/Layout";

export const getStaticProps = async () => {
  const response = await fetch("https://taller-occ.vercel.app/api/products");
  const { data: productList } = await response.json();

  return {
    props: {
      productList,
    },
  };
};

export default function Home({ productList }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <LayoutComponent>
        <ProductList products={productList} />
      </LayoutComponent>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Button
        type="primary"
        shape="round"
        icon={<UserSwitchOutlined />}
        size="large"
        onClick={() => signIn()}
      >
        Iniciar sesion
      </Button>
    </div>
  );
}
