import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setTasks } from "../store/features/tasks";
import TasksRepository from "../data/tasks.repository";
import Header from "../components/header/header";
import TaskCard from "../components/task-card/task-card";
import CreateTaskForm from "../components/create-task-form/create-task-form";
import styles from "./tasks.module.css";
import { useEffect } from "react";
import { Task } from "../entities/task";

function TasksView() {
  const tasks = useAppSelector((state) => state.tasks.data);
  const dispatch = useAppDispatch();

  async function fetchTasks() {
    const data = await TasksRepository.findAll();
    updateTasks(data.tasks);
  }

  function updateTasks(tasks: Task[]) {
    dispatch(setTasks(tasks));
  }

  useEffect(() => {
    fetchTasks();
  }, []);

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
        </div>
      </div>
    </div>
  );
}

export default TasksView;
