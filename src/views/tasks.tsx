import React from "react";
import Header from "../components/header/header";
import TaskCard from "../components/task-card/task-card";
import CreateTaskForm from "../components/create-task-form/create-task-form";
import styles from "./tasks.module.css";

function TasksView() {
  return (
    <div className={styles.tasks}>
      <Header />
      <div className={styles.tasksContent}>
        <div className={styles.tasksList}>
          <TaskCard
            email="sayazhan.onlassyn@mail.ru"
            username="Sayazhan Onlasyn"
            text="The main aim of this task is to successfully pass the mock task by
        implementing TODO application with certain functionallity"
            status={10}
          />
          <TaskCard
            email="sayazhan.onlassyn@mail.ru"
            username="Sayazhan Onlasyn"
            text="The main aim of this task is to successfully pass the mock task by
        implementing TODO application with certain functionallity"
            status={10}
          />
          <TaskCard
            email="sayazhan.onlassyn@mail.ru"
            username="Sayazhan Onlasyn"
            text="The main aim of this task is to successfully pass the mock task by
        implementing TODO application with certain functionallity"
            status={10}
          />
        </div>
        <div>
          <CreateTaskForm />
        </div>
      </div>
    </div>
  );
}

export default TasksView;
