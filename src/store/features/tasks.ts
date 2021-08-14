import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../entities/task";

type SortOrder = "asc" | "desc";

interface TasksState {
  sortField: string;
  sortOrder: SortOrder;
  page: number;
  total: number;
  data: Task[];
}

const initialState: TasksState = {
  sortField: "id",
  sortOrder: "asc",
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
    setSortField(state: TasksState, action: PayloadAction<string>) {
      state.sortField = action.payload;
    },
    setSortOrder(state: TasksState, action: PayloadAction<SortOrder>) {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  setTasksTotal,
  setTasks,
  setTasksPage,
  setSortField,
  setSortOrder,
} = tasksSlice.actions;

export default tasksSlice.reducer;
