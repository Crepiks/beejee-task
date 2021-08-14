import React, { FunctionComponent } from "react";
import { Form, Input, Button } from "antd";
import styles from "./create-task-form.module.css";
import { CreateTaskDto } from "../../dto/create-task.dto";
import { Task } from "../../entities/task";

interface Props {
  loading: boolean;
  onSubmit: (payload: CreateTaskDto) => Promise<Task>;
}

const CreateTaskForm: FunctionComponent<Props> = ({ loading, onSubmit }) => {
  const [form] = Form.useForm();

  function handleSubmit(payload: CreateTaskDto) {
    onSubmit(payload).then(() => form.resetFields());
  }

  return (
    <div className={styles.form}>
      <h3 className={styles.title}>Create Task</h3>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input valid email",
            },
          ]}
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
          <Button
            loading={loading}
            type="primary"
            size="large"
            htmlType="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateTaskForm;
