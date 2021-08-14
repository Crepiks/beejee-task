import React, { FunctionComponent } from "react";
import styles from "./task-card.module.css";

interface Props {
  email: string;
  username: string;
  text: string;
  status: number;
}

const TaskCard: FunctionComponent<Props> = ({ email, username, text }) => (
  <article className={styles.card}>
    <div>
      <span className={styles.email}>{email}</span>
    </div>
    <h3 className={styles.name}>{username}</h3>
    <p className={styles.text}>{text}</p>
  </article>
);

export default TaskCard;
