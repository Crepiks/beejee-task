import { CreateTaskDto } from "../dto/create-task";
import { Task } from "../entities/task";
import request from "./request";

class TasksRepository {
  static async findAll(page: number) {
    const res = await request.get(`?developer=sayazhan&page=${page}`);
    const total = +res.data.message.total_task_count;
    const tasks = res.data.message.tasks as Task[];

    return { total, tasks };
  }

  static async create(payload: CreateTaskDto) {
    var form = new FormData();
    form.append("username", payload.username);
    form.append("email", payload.email);
    form.append("text", payload.text);

    const res = await request({
      url: "/create?developer=sayazhan",
      method: "POST",
      data: form,
    });
    const task = res.data.message as Task;

    return task;
  }
}

export default TasksRepository;
