import React from "react";
import { Button } from "antd";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setTasks } from "../store/features/tasks";
import Header from "../components/header/header";
import TaskCard from "../components/task-card/task-card";
import CreateTaskForm from "../components/create-task-form/create-task-form";
import styles from "./tasks.module.css";
import { Task } from "../entities/task";

const mockTasks: Task[] = [
  {
    id: 1,
    email: "sayazhan.onlassyn@mail.ru",
    username: "Sayazhan Onlasyn",
    text: "The main aim of this task is to successfully pass the mock task by implementing TODO application with certain functionallity",
    status: 10,
  },
  {
    id: 2,
    email: "inkar@mail.ru",
    username: "Inkar Ibgraim",
    text: "The main aim of this task is to successfully pass the mock task by implementing TODO application with certain functionallity",
    status: 10,
  },
];

function TasksView() {
  const tasks = useAppSelector((state) => state.tasks.data);
  const dispatch = useAppDispatch();

  function fetchTasks() {
    dispatch(setTasks(mockTasks));
  }

  return (
    <div className={styles.tasks}>
      <Header />
      <div className={styles.tasksContent}>
        <div className={styles.tasksList}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              email={task.email}
              username={task.username}
              text={task.text}
              status={task.status}
            />
          ))}
        </div>
        <div>
          <CreateTaskForm />
          <Button onClick={fetchTasks}>Test store</Button>
        </div>
      </div>
    </div>
  );
}

export default TasksView;
