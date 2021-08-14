import React, { FunctionComponent } from "react";
import { Button, Tag } from "antd";
import styles from "./task-card.module.css";
import { useState } from "react";

interface Props {
  email: string;
  username: string;
  text: string;
  completed: boolean;
  statusUpdateEnabled: boolean;
  onStatusUpdate: (completed: boolean) => Promise<void>;
}

const TaskCard: FunctionComponent<Props> = ({
  email,
  username,
  text,
  completed,
  statusUpdateEnabled,
  onStatusUpdate,
}) => {
  const [loading, setLoading] = useState(false);

  function getStatusUpdateButton() {
    return completed ? (
      <Button
        loading={loading}
        type="primary"
        onClick={() => handleStatusUpdate(false)}
      >
        Completed
      </Button>
    ) : (
      <Button
        loading={loading}
        type="primary"
        danger
        onClick={() => handleStatusUpdate(true)}
      >
        Not Completed
      </Button>
    );
  }

  function handleStatusUpdate(completed: boolean) {
    setLoading(true);
    onStatusUpdate(completed).then(() => setLoading(false));
  }

  function getCompletedTag() {
    return completed ? (
      <Tag color="green">Completed</Tag>
    ) : (
      <Tag color="red">Not completed</Tag>
    );
  }

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.email}>{email}</span>
        {statusUpdateEnabled ? getStatusUpdateButton() : getCompletedTag()}
      </div>
      <h3 className={styles.name}>{username}</h3>
      <p className={styles.text}>{text}</p>
    </article>
  );
};

export default TaskCard;
