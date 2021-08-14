import React, { FunctionComponent } from "react";
import { Button, Form, Tag, Input } from "antd";
import styles from "./task-card.module.css";
import { useState } from "react";

interface Props {
  email: string;
  username: string;
  text: string;
  completed: boolean;
  editedByAdmin: boolean;
  updateEnabled: boolean;
  onStatusUpdate: () => Promise<void>;
  onTextUpdate: (text: string) => Promise<void>;
}

const TaskCard: FunctionComponent<Props> = ({
  email,
  username,
  text,
  completed,
  editedByAdmin,
  updateEnabled,
  onStatusUpdate,
  onTextUpdate,
}) => {
  const [statusLoading, setStatusLoading] = useState(false);
  const [textLoading, setTextLoading] = useState(false);

  function getStatusUpdateButton() {
    return completed ? (
      <Button
        loading={statusLoading}
        type="primary"
        onClick={handleStatusUpdate}
      >
        Completed
      </Button>
    ) : (
      <Button
        loading={statusLoading}
        type="primary"
        danger
        onClick={handleStatusUpdate}
      >
        Not Completed
      </Button>
    );
  }

  function handleStatusUpdate() {
    setStatusLoading(true);
    onStatusUpdate().then(() => setStatusLoading(false));
  }

  function getCompletedTag() {
    return completed ? (
      <Tag color="green">Completed</Tag>
    ) : (
      <Tag color="red">Not completed</Tag>
    );
  }

  function getTaskText() {
    return <p className={styles.text}>{text}</p>;
  }

  function getTextEditForm() {
    return (
      <Form layout="vertical" onFinish={handleTextUpdate}>
        <Form.Item
          name="text"
          rules={[{ required: true, message: "Please input text" }]}
        >
          <Input.TextArea defaultValue={text} rows={4} />
        </Form.Item>
        <div className={styles.submitWrapper}>
          <Button loading={textLoading} type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    );
  }

  function handleTextUpdate({ text }: { text: string }) {
    setTextLoading(true);
    onTextUpdate(text).finally(() => setTextLoading(false));
  }

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.email}>{email}</span>
        <div>
          {updateEnabled ? getStatusUpdateButton() : getCompletedTag()}
          {!updateEnabled && editedByAdmin && (
            <Tag color="yellow">Edited by Admin</Tag>
          )}
        </div>
      </div>
      <h3 className={styles.name}>{username}</h3>
      {updateEnabled ? getTextEditForm() : getTaskText()}
    </article>
  );
};

export default TaskCard;
