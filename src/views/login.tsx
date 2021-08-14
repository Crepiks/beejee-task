import React from "react";
import { Form, Input, Button } from "antd";
import styles from "./login.module.css";
import { useState } from "react";

function LoginView() {
  const [loading, setLoading] = useState();

  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <h3 className={styles.title}>Login</h3>
        <Form layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input username",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password" }]}
          >
            <Input />
          </Form.Item>
          <div className={styles.submitWrapper}>
            <Button
              loading={loading}
              type="primary"
              size="large"
              htmlType="submit"
            >
              Log In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginView;
