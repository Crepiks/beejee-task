import React, { useState, useEffect } from "react";
import { Pagination, Select, Spin, notification } from "antd";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  setTasksTotal,
  setTasks,
  setTasksPage,
  setSortField,
  setSortOrder,
} from "../store/features/tasks";
import { setToken } from "../store/features/user";
import { Task } from "../entities/task";
import TasksRepository from "../data/tasks.repository";
import Header from "../components/header/header";
import TaskCard from "../components/task-card/task-card";
import CreateTaskForm from "../components/create-task-form/create-task-form";
import { CreateTaskDto } from "../dto/create-task.dto";
import styles from "./tasks.module.css";

type SortOrder = "asc" | "desc";

function TasksView() {
  const tasks = useAppSelector((state) => state.tasks.data);
  const tasksTotal = useAppSelector((state) => state.tasks.total);
  const tasksPage = useAppSelector((state) => state.tasks.page);
  const sortField = useAppSelector((state) => state.tasks.sortField);
  const sortOrder = useAppSelector((state) => state.tasks.sortOrder);
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const [tasksLoading, setTasksLoading] = useState(false);
  const [createTaskFormLoading, setCreateTaskFormLoading] = useState(false);

  useEffect(() => {
    fetchTasks(tasksPage, sortField, sortOrder);
  }, []);

  async function fetchTasks(
    page: number,
    sortField: string,
    sortOrder: SortOrder,
    showLoadingIndicator: boolean = true
  ) {
    if (showLoadingIndicator) {
      setTasksLoading(true);
    }

    const data = await TasksRepository.findAll(
      page,
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
    fetchTasks(selectedPage, sortField, sortOrder);
  }

  function updateTasksPage(page: number) {
    dispatch(setTasksPage(page));
  }

  function createTask(payload: CreateTaskDto): Promise<Task> {
    setCreateTaskFormLoading(true);
    return TasksRepository.create(payload)
      .then((task) => {
        fetchTasks(tasksPage, sortField, sortOrder);
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
    fetchTasks(tasksPage, value, sortOrder);
  }

  function updateSortField(value: string) {
    dispatch(setSortField(value));
  }

  function handleSortOrderChange(value: SortOrder) {
    updateSortOrderChange(value);
    fetchTasks(tasksPage, sortField, value);
  }

  function updateSortOrderChange(value: SortOrder) {
    dispatch(setSortOrder(value));
  }

  function clearToken() {
    dispatch(setToken(""));
  }

  function getTaskCompleted(status: number): boolean {
    if (status === 10 || status === 11) {
      return true;
    }

    return false;
  }

  async function updateTaskStatus(
    taskId: number,
    completed: boolean
  ): Promise<void> {
    const completedStatus = 11;
    const notCompletedStatus = 1;
    const status = completed ? completedStatus : notCompletedStatus;

    await TasksRepository.updateStatus(taskId, { token, status });
    await fetchTasks(tasksPage, sortField, sortOrder, false);
  }

  return (
    <div className={styles.tasks}>
      <Header authenticated={Boolean(token)} onLogout={clearToken} />
      <div className={styles.tasksContent}>
        <div className={styles.tasksList}>
          <div className={styles.filters}>
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
              <div className={styles.taskCard}>
                <TaskCard
                  key={task.id}
                  email={task.email}
                  username={task.username}
                  text={task.text}
                  completed={getTaskCompleted(task.status)}
                  statusUpdateEnabled={Boolean(token)}
                  onStatusUpdate={(completed: boolean) =>
                    updateTaskStatus(task.id, completed)
                  }
                />
              </div>
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
