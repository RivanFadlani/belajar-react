import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Seller from "./pages/Seller";
import Customer from "./pages/Customer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <App />: Tidak perlu gunakan ini lagi */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Tanpa Nested Route */}
        <Route path="/data/product" element={<Product />} />
        <Route path="/data/seller" element={<Seller />} />
        <Route path="/data/customer" element={<Customer />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
