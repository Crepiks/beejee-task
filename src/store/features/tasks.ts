import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../entities/task";

interface TasksState {
  data: Task[];
}

const initialState: TasksState = {
  data: [] as Task[],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state: TasksState, action: PayloadAction<Task[]>) {
      state.data = action.payload;
    },
  },
});

export const { setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
