import React from "react";
import { Card, Col, Row, Badge, InputNumber, Form, notification } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useCartMutations } from "../../../store/cart";

export default function ProductList({ products }) {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const { addToCart } = useCartMutations();

  const openNotification = (product) => {
    api.success({
      message: `Bien hecho!`,
      description: "Producto agregado exitosamente",
    });
    addCart(product);
  };

  const addCart = (product) => {
    addToCart(product, form.getFieldValue(product.id));
  };

  const onChange = (value) => {
    console.log("changed", value);
  };

  return (
    <>
      {contextHolder}
      <Row gutter={16} style={{ padding: 60 }}>
        {products.map((product) => (
          <Col span={8}>
            <Badge.Ribbon
              text={`$${product.cost}`}
              color="cyan"
              style={{ fontSize: 20 }}
            >
              <Card
                actions={[
                  <Form form={form} name="carrito">
                    <Form.Item initialValue={1} name={product.id}>
                      <InputNumber
                        min={1}
                        max={10}
                        defaultValue={1}
                        onChange={onChange}
                      />
                    </Form.Item>
                  </Form>,
                  <PlusCircleOutlined
                    key="cart"
                    style={{ fontSize: 25 }}
                    onClick={() => openNotification(product)}
                  />,
                ]}
                title={product.name}
                bordered={true}
              >
                {product.description}
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </>
  );
}
