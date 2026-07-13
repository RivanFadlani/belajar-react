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
import ProductDetail from "./pages/ProductDetail";
import User from "./pages/User";
import Address from "./pages/Address";
import Image from "./pages/Image";
import NotFound from "./pages/NotFound";
import ProductSearch from "./pages/ProductSearch";

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
          <Route path="product/search" element={<ProductSearch />} />
          <Route path="seller" element={<Seller />} />
          {/* /data/customer */}
          <Route path="customer">
            <Route index element={<Customer />} />
            {/* /data/customer/user/id */}
            <Route path="user/:userId">
              <Route index element={<User />} />
              {/* /data/customer/user/id/address/id */}
              <Route path="address/:addressId">
                <Route index element={<Address />} />
              </Route>
            </Route>
          </Route>
          {/* Route Param */}
          {/* Gunakan titik dua, diikuti dengan nama param */}
          {/* 'productId' dianggap sebagai parameter dinamis */}
          <Route path="product/:productId" element={<ProductDetail />} />
          {/* Star Segment: tidak peduli seberapa panjang route, route-nya akan terbaca */}
          <Route path="image/*" element={<Image />} />
        </Route>
        {/* Biasanya star segment digunakan untuk Not Found Page */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
