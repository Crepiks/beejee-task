import React, { FunctionComponent } from "react";
import { Form, Input, Button } from "antd";
import styles from "./login-form.module.css";
import { LoginDto } from "../../dto/login.dto";

interface Props {
  loading: boolean;
  onSubmit: (payload: LoginDto) => Promise<void>;
}

const LoginForm: FunctionComponent<Props> = ({ loading, onSubmit }) => {
  return (
    <Form layout="vertical" onFinish={onSubmit}>
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
        <Input type="password" />
      </Form.Item>
      <div className={styles.submitWrapper}>
        <Button loading={loading} type="primary" size="large" htmlType="submit">
          Log In
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
