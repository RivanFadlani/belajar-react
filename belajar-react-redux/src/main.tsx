import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import { store } from "./store";
import Counter from "./Counter";

// 1. createRoot mengambil elemen DOM #root sebagai tempat render React
// 2. StrictMode mengaktifkan deteksi masalah di development
// 3. Provider menyediakan Redux store ke seluruh komponen di dalamnya
// 4. BrowserRouter mengaktifkan routing client-side
// 5. Routes mendefinisikan daftar route yang tersedia
// 6. Route "/" menampilkan App, Route "/counter" menampilkan Counter
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/counter"
            element={
              <>
                {/* Berbeda dengan react state yang bisa menyimpan state berbeda per component yang sama.
                di redux, state di store itu bersifat global, jadi semua state di component yang sama akan sinkron statenya*/}
                <Counter />
                <Counter />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
