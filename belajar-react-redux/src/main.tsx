import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
