import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Seller from "./pages/Seller";
import Customer from "./pages/Customer";
import Data from "./pages/Data";
import DataLayout from "./pages/DataLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <App />: Tidak perlu gunakan ini lagi */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Menggunakan Nested Route */}
        {/* Wrapper tidak direkomendasikan dijadikan sebagai index router, 
            karena wrapper biasanya digunakan untuk menyediakan struktur component
            seperti navbar, header, atau footer
          */}
        <Route path="/data" element={<DataLayout />}>
          <Route index element={<Data />} /> {/* Halaman utama di (/data) */}
          <Route path="product" element={<Product />} />
          <Route path="seller" element={<Seller />} />
          <Route path="customer" element={<Customer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
