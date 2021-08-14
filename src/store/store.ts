import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks";
import userReducer from "./features/user";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
