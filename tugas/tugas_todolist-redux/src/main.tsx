import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import AddTodo from "./features/todos/AddTodo.tsx";
import ListTodo from "./features/todos/ListTodo.tsx";
import UpdateTodo from "./features/todos/UpdateTodo.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/todolist">
            <Route index element={<ListTodo />} />
            <Route path="add" element={<AddTodo />} />
            <Route path=":id/edit" element={<UpdateTodo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
