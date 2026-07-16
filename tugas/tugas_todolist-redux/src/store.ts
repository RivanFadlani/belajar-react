import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todos/todosSlice";

const store = configureStore({
  reducer: {
    todoList: todoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
