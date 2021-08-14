import React from "react";
import { Pagination } from "antd";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setTasksTotal, setTasks, setTasksPage } from "../store/features/tasks";
import TasksRepository from "../data/tasks.repository";
import Header from "../components/header/header";
import TaskCard from "../components/task-card/task-card";
import CreateTaskForm from "../components/create-task-form/create-task-form";
import styles from "./tasks.module.css";
import { useEffect } from "react";
import { Task } from "../entities/task";

function TasksView() {
  const tasks = useAppSelector((state) => state.tasks.data);
  const tasksTotal = useAppSelector((state) => state.tasks.total);
  const tasksPage = useAppSelector((state) => state.tasks.page);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchTasks(tasksPage);
  }, []);

  async function fetchTasks(page: number) {
    const data = await TasksRepository.findAll(page);
    updateTasksTotal(data.total);
    updateTasks(data.tasks);
  }

  function updateTasksTotal(total: number) {
    dispatch(setTasksTotal(total));
  }

  function updateTasks(tasks: Task[]) {
    dispatch(setTasks(tasks));
  }

  function changePage(selectedPage: number) {
    updateTasksPage(selectedPage);
    fetchTasks(selectedPage);
  }

  function updateTasksPage(page: number) {
    dispatch(setTasksPage(page));
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
          <div className={styles.paginationWrapper}>
            <Pagination
              current={tasksPage}
              pageSize={3}
              total={tasksTotal}
              onChange={changePage}
            />
          </div>
        </div>
        <div>
          <CreateTaskForm />
        </div>
      </div>
    </div>
  );
}

export default TasksView;
