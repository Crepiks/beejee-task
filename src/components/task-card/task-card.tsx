import React, { FunctionComponent } from "react";
import { Tag } from "antd";
import styles from "./task-card.module.css";

interface Props {
  email: string;
  username: string;
  text: string;
  completed: boolean;
}

const TaskCard: FunctionComponent<Props> = ({
  email,
  username,
  text,
  completed,
}) => (
  <article className={styles.card}>
    <div className={styles.header}>
      <span className={styles.email}>{email}</span>
      {completed ? (
        <Tag color="green">Completed</Tag>
      ) : (
        <Tag color="red">Not completed</Tag>
      )}
    </div>
    <h3 className={styles.name}>{username}</h3>
    <p className={styles.text}>{text}</p>
  </article>
);

export default TaskCard;
