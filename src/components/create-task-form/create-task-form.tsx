import React, { FunctionComponent } from "react";
import { Form, Input, Button } from "antd";
import styles from "./create-task-form.module.css";

const CreateTaskForm: FunctionComponent = () => (
  <div className={styles.form}>
    <h3 className={styles.title}>Create Task</h3>
    <Form layout="vertical">
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input email" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input username" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Text"
        name="text"
        rules={[{ required: true, message: "Please input text" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <div className={styles.submitWrapper}>
        <Button type="primary" size="large" htmlType="submit">
          Submit
        </Button>
      </div>
    </Form>
  </div>
);

export default CreateTaskForm;
