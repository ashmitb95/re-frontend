import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Users = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/users`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClick = (userID) => {
    setCurrentUser(userID);
    navigate(`/products/${userID}`);
  };
  return (
    <div style={{ height: "100vh" }}>
      {users.length ? (
        <Row justify={"center"} gutter={[16, 16]}>
          {users.map((user) => {
            return (
              <Col span={4}>
                <Card
                  style={{ cursor: "pointer" }}
                  title={user.name}
                  onClick={() => {
                    handleClick(user.user_id);
                  }}
                  extra={user.user_id}
                >
                  {user.occupation}
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default Users;
