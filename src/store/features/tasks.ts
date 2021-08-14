import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../entities/task";

interface TasksState {
  page: number;
  total: number;
  data: Task[];
}

const initialState: TasksState = {
  page: 1,
  total: 0,
  data: [] as Task[],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasksTotal(state: TasksState, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setTasks(state: TasksState, action: PayloadAction<Task[]>) {
      state.data = action.payload;
    },
    setTasksPage(state: TasksState, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setTasksTotal, setTasks, setTasksPage } = tasksSlice.actions;

export default tasksSlice.reducer;
