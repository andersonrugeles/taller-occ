import React, { useEffect, useState } from "react";
import { Avatar, Button, List, Skeleton } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LayoutComponent from "@/components/Layout/Layout";
import { DeleteOutlined } from "@ant-design/icons";
import { useCart, useCartMutations } from "../../store/cart";

const Cart = () => {
  const [initLoading, setInitLoading] = useState(false);
  const { items, count, subTotal } = useCart();
  const { removeFromCart } = useCartMutations();
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);

  return (
    <LayoutComponent>
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a style={{ color: "red" }}>
                <DeleteOutlined onClick={() => removeFromCart(item)} />
              </a>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={`${item.description} - $${item.cost}`}
            />
            <div>{item.quantity}</div>
          </List.Item>
        )}
      />
      <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={[{ name: "Total", quantity: count, subtotal: subTotal }]}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={item.name} />
            <div>$ {item.subtotal}</div>
          </List.Item>
        )}
      />
    </LayoutComponent>
  );
};
export default Cart;
