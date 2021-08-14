import { Task } from "../entities/task";
import request from "./request";

class TasksRepository {
  static async findAll() {
    const res = await request.get("");
    const total = +res.data.message.total_task_count;
    const tasks = res.data.message.tasks as Task[];

    return { total, tasks };
  }
}

export default TasksRepository;
