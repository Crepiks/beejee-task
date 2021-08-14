import React, { useState } from "react";
import { Pagination, Select, Spin, notification } from "antd";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  setTasksTotal,
  setTasks,
  setTasksPage,
  setSortField,
  setSortOrder,
} from "../store/features/tasks";
import TasksRepository from "../data/tasks.repository";
import Header from "../components/header/header";
import TaskCard from "../components/task-card/task-card";
import CreateTaskForm from "../components/create-task-form/create-task-form";
import styles from "./tasks.module.css";
import { useEffect } from "react";
import { Task } from "../entities/task";
import { CreateTaskDto } from "../dto/create-task";

type SortOrder = "asc" | "desc";

function TasksView() {
  const tasks = useAppSelector((state) => state.tasks.data);
  const tasksTotal = useAppSelector((state) => state.tasks.total);
  const tasksPage = useAppSelector((state) => state.tasks.page);
  const sortField = useAppSelector((state) => state.tasks.sortField);
  const sortOrder = useAppSelector((state) => state.tasks.sortOrder);
  const dispatch = useAppDispatch();
  const [tasksLoading, setTasksLoading] = useState(false);
  const [createTaskFormLoading, setCreateTaskFormLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setTasksLoading(true);
    const data = await TasksRepository.findAll(
      tasksPage,
      sortField,
      sortOrder
    ).finally(() => setTasksLoading(false));
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
    fetchTasks();
  }

  function updateTasksPage(page: number) {
    dispatch(setTasksPage(page));
  }

  function createTask(payload: CreateTaskDto): Promise<Task> {
    setCreateTaskFormLoading(true);
    return TasksRepository.create(payload)
      .then((task) => {
        fetchTasks();
        showTaskCreatedNotification();
        return task;
      })
      .finally(() => setCreateTaskFormLoading(false));
  }

  function showTaskCreatedNotification() {
    notification.success({
      message: "Task created",
      description: "The task has been successfully created",
    });
  }

  function handleSortFieldChange(value: string) {
    updateSortField(value);
    fetchTasks();
  }

  function updateSortField(value: string) {
    dispatch(setSortField(value));
  }

  function handleSortOrderChange(value: SortOrder) {
    updateSortOrderChange(value);
    fetchTasks();
  }

  function updateSortOrderChange(value: SortOrder) {
    dispatch(setSortOrder(value));
  }

  return (
    <div className={styles.tasks}>
      <Header />
      <div className={styles.tasksContent}>
        <div className={styles.tasksList}>
          <div>
            <Select
              value={sortField}
              style={{ width: 140 }}
              onChange={handleSortFieldChange}
            >
              <Select.Option value="id">ID</Select.Option>
              <Select.Option value="email">Email</Select.Option>
              <Select.Option value="username">Username</Select.Option>
              <Select.Option value="status">Status</Select.Option>
            </Select>
            <Select
              value={sortOrder}
              style={{ width: 160, marginLeft: 20 }}
              onChange={handleSortOrderChange}
            >
              <Select.Option value="asc">Ascending</Select.Option>
              <Select.Option value="desc">Descending</Select.Option>
            </Select>
          </div>
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
