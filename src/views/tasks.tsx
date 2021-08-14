import React, { useState } from "react";
import { Pagination, Spin } from "antd";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setTasksTotal, setTasks, setTasksPage } from "../store/features/tasks";
import TasksRepository from "../data/tasks.repository";
import Header from "../components/header/header";
import TaskCard from "../components/task-card/task-card";
import CreateTaskForm from "../components/create-task-form/create-task-form";
import styles from "./tasks.module.css";
import { useEffect } from "react";
import { Task } from "../entities/task";
import { CreateTaskDto } from "../dto/create-task";

function TasksView() {
  const tasks = useAppSelector((state) => state.tasks.data);
  const tasksTotal = useAppSelector((state) => state.tasks.total);
  const tasksPage = useAppSelector((state) => state.tasks.page);
  const dispatch = useAppDispatch();
  const [tasksLoading, setTasksLoading] = useState(false);
  const [createTaskFormLoading, setCreateTaskFormLoading] = useState(false);

  useEffect(() => {
    fetchTasks(tasksPage);
  }, []);

  async function fetchTasks(page: number) {
    setTasksLoading(true);
    const data = await TasksRepository.findAll(page).finally(() =>
      setTasksLoading(false)
    );
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

  function createTask(payload: CreateTaskDto): Promise<Task> {
    setCreateTaskFormLoading(true);
    return TasksRepository.create(payload)
      .then((task) => {
        fetchTasks(tasksPage);
        return task;
      })
      .finally(() => setCreateTaskFormLoading(false));
  }

  return (
    <div className={styles.tasks}>
      <Header />
      <div className={styles.tasksContent}>
        <div className={styles.tasksList}>
          {tasksLoading ? (
            <div className={styles.spinWrapper}>
              <Spin />
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                email={task.email}
                username={task.username}
                text={task.text}
                status={task.status}
              />
            ))
          )}
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
          <CreateTaskForm
            loading={createTaskFormLoading}
            onSubmit={createTask}
          />
        </div>
      </div>
    </div>
  );
}

export default TasksView;
