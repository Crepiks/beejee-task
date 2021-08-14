import request from "./request";
import config from "../config";
import { Task } from "../entities/task";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskStatusDto } from "../dto/update-task-status.dto";
import { UpdateTaskTextDto } from "../dto/update-task-text.dto";

class TasksRepository {
  static async findAll(
    page: number,
    sortField: string,
    sortOrder: "asc" | "desc"
  ) {
    const res = await request.get(
      `?developer=${config.apiDeveloper}&page=${page}&sort_field=${sortField}&sort_direction=${sortOrder}`
    );
    const total = +res.data.message.total_task_count;
    const tasks = res.data.message.tasks as Task[];

    return { total, tasks };
  }

  static async create(payload: CreateTaskDto) {
    const form = new FormData();
    form.append("username", payload.username);
    form.append("email", payload.email);
    form.append("text", payload.text);

    const res = await request({
      url: `/create?developer=${config.apiDeveloper}`,
      method: "POST",
      data: form,
    });
    const task = res.data.message as Task;

    return task;
  }

  static async updateStatus(taskId: number, payload: UpdateTaskStatusDto) {
    const form = new FormData();
    form.append("token", payload.token);
    form.append("status", String(payload.status));

    await request({
      url: `/edit/${taskId}?developer=${config.apiDeveloper}`,
      method: "POST",
      data: form,
    });
  }

  static async updateText(taskId: number, payload: UpdateTaskTextDto) {
    const form = new FormData();
    form.append("token", payload.token);
    form.append("text", payload.text);
    form.append("status", String(payload.status));

    await request({
      url: `/edit/${taskId}?developer=${config.apiDeveloper}`,
      method: "POST",
      data: form,
    });
  }
}

export default TasksRepository;
