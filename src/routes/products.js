import React, { useEffect, useState } from "react";
import { Card, Row, Col, Popover } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Products = () => {
  const { userID } = useParams();
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [currentHoveringProduct, setCurrentHoveringProduct] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/products`)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const recommendedContent = (
    <Row>
      {recommendations?.map((item) => {
        return (
          <Col
            onMouseEnter={() => {
              setCurrentHoveringProduct(item.product_id);
            }}
          >
            <Card
              style={{ cursor: "pointer" }}
              title={item.title}
              extra={item.product_id}
            >
              {item.description}
            </Card>
          </Col>
        );
      })}
    </Row>
  );

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND}/recommendations`, {
        userId: userID,
        productId: currentHoveringProduct,
      })
      .then((res) => {
        setRecommendations(res.data.recommendations);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentHoveringProduct]);
  return (
    <div style={{ height: "100vh" }}>
      {products.length ? (
        <Row justify={"center"} gutter={[16, 16]}>
          {products.map((product) => {
            return (
              <Col
                span={4}
                onMouseEnter={() => {
                  setCurrentHoveringProduct(product.product_id);
                }}
              >
                <Popover
                  content={recommendedContent}
                  title="Recommendations based on reviews"
                  trigger="hover"
                >
                  <Card
                    style={{ cursor: "pointer" }}
                    title={product.title}
                    extra={product.product_id}
                  >
                    {product.description}
                  </Card>
                </Popover>
              </Col>
            );
          })}
        </Row>
      ) : (
        <>Loading products...</>
      )}
    </div>
  );
};

export default Products;
