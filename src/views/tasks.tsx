import React, { useState, useEffect } from "react";
import { Pagination, Select, Spin, notification, Empty } from "antd";
import { useHistory } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  setTasksTotal,
  setTasks,
  setTasksPage,
  setSortField,
  setSortOrder,
} from "../store/features/tasks";
import { Task } from "../entities/task";
import TasksRepository from "../data/tasks.repository";
import UserRepository from "../data/user.repository";
import { CreateTaskDto } from "../dto/create-task.dto";
import Header from "../components/header/header";
import TaskCard from "../components/task-card/task-card";
import CreateTaskForm from "../components/create-task-form/create-task-form";
import styles from "./tasks.module.css";

type SortOrder = "asc" | "desc";

const statuses = {
  notCompleted: 0,
  notCompletedAndEditedByAdmin: 1,
  completed: 10,
  completedAndEditedByAdmin: 11,
};

function TasksView() {
  const tasks = useAppSelector((state) => state.tasks.data);
  const tasksTotal = useAppSelector((state) => state.tasks.total);
  const tasksPage = useAppSelector((state) => state.tasks.page);
  const sortField = useAppSelector((state) => state.tasks.sortField);
  const sortOrder = useAppSelector((state) => state.tasks.sortOrder);
  const dispatch = useAppDispatch();
  const [tasksLoading, setTasksLoading] = useState(false);
  const [createTaskFormLoading, setCreateTaskFormLoading] = useState(false);
  const history = useHistory();
  const [token, setToken] = useState(UserRepository.getToken());

  useEffect(() => {
    fetchTasks(tasksPage, sortField, sortOrder);
  }, [tasksPage, sortField, sortOrder]);

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
  }

  function updateSortField(value: string) {
    dispatch(setSortField(value));
  }

  function handleSortOrderChange(value: SortOrder) {
    updateSortOrderChange(value);
  }

  function updateSortOrderChange(value: SortOrder) {
    dispatch(setSortOrder(value));
  }

  function getTaskCompleted(status: number): boolean {
    return (
      status === statuses.completed ||
      status === statuses.completedAndEditedByAdmin
    );
  }

  function getEditByAdmin(status: number): boolean {
    return (
      status === statuses.notCompletedAndEditedByAdmin ||
      status === statuses.completedAndEditedByAdmin
    );
  }

  async function updateTaskStatus(
    taskId: number,
    status: number
  ): Promise<void> {
    let updatedStatus = status;
    if (status === statuses.completed) {
      updatedStatus = statuses.notCompleted;
    } else if (status === statuses.notCompleted) {
      updatedStatus = statuses.completed;
    } else if (status === statuses.notCompletedAndEditedByAdmin) {
      updatedStatus = statuses.completedAndEditedByAdmin;
    } else {
      updatedStatus = statuses.notCompletedAndEditedByAdmin;
    }

    const token = UserRepository.getToken();
    if (!token) {
      navigateToLoginPage();
    }

    await TasksRepository.updateStatus(taskId, {
      token,
      status: updatedStatus,
    });
    await fetchTasks(tasksPage, sortField, sortOrder, false);
  }

  async function updateTaskText(
    taskId: number,
    status: number,
    text: string
  ): Promise<void> {
    let updatedStatus = status;
    if (status === statuses.completed) {
      updatedStatus = statuses.completedAndEditedByAdmin;
    } else if (status === statuses.notCompleted) {
      updatedStatus = statuses.notCompletedAndEditedByAdmin;
    }

    const token = UserRepository.getToken();
    if (!token) {
      navigateToLoginPage();
    }

    await TasksRepository.updateText(taskId, {
      token,
      status: updatedStatus,
      text,
    });
    await fetchTasks(tasksPage, sortField, sortOrder, false);
  }

  function navigateToLoginPage() {
    history.push("/login");
  }

  function logout() {
    UserRepository.clearToken();
    setToken("");
  }

  function getTaskListContent() {
    if (tasksLoading) {
      return getLoadingIndicator();
    } else if (!tasks.length) {
      return getEmpty();
    }

    return getTasks();
  }

  function getLoadingIndicator() {
    return (
      <div className={styles.spinWrapper}>
        <Spin />
      </div>
    );
  }

  function getEmpty() {
    return (
      <div className={styles.emptyWrapper}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );
  }

  function getTasks() {
    return tasks.map((task) => (
      <div key={task.id} className={styles.taskCard}>
        <TaskCard
          email={task.email}
          username={task.username}
          text={task.text}
          completed={getTaskCompleted(task.status)}
          editedByAdmin={getEditByAdmin(task.status)}
          updateEnabled={Boolean(token)}
          onStatusUpdate={() => updateTaskStatus(task.id, task.status)}
          onTextUpdate={(text: string) =>
            updateTaskText(task.id, task.status, text)
          }
        />
      </div>
    ));
  }

  return (
    <div className={styles.tasks}>
      <Header authenticated={Boolean(token)} onLogout={logout} />
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
          {getTaskListContent()}
          {tasks.length !== 0 && (
            <div className={styles.paginationWrapper}>
              <Pagination
                current={tasksPage}
                pageSize={3}
                total={tasksTotal}
                onChange={changePage}
              />
            </div>
          )}
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
