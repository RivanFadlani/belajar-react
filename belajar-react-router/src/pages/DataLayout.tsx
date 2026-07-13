import { NavLink, Outlet, useLocation } from "react-router";

const DataLayout = () => {
  {
    /* Use Location */
  }
  const location = useLocation();

  return (
    <>
      <div>
        <h1>This is Navbar</h1>
        <p>Outlet Start</p>
        <hr />
      </div>
      <div>
        <li>
          {/* Navigation Link */}
          {/* Alih-alih kita menggunakan anchor (<a>), kita harus menggunakan
            <Link> bawaan react-router dengan attr 'to'
            */}
          {/* ini dilakukan karena anchor memiliki sifat reload ulang ketika pindah page  */}
          <NavLink to="/data/product">Product</NavLink>
        </li>
        <li>
          {/* NavLink: digunakan untuk memberi class .active ketika url sama dengan pathname */}
          <NavLink to="/data/seller">Seller</NavLink>
        </li>
        <li>
          <NavLink to="/data/customer">Customer</NavLink>
        </li>
        {/* Link to dalam bentuk object */}
        <li>
          <NavLink
            to={{
              pathname: "/data/product",
              search: "?category=shoes",
              hash: "#top",
            }}
          >
            Product
          </NavLink>
        </li>
      </div>
      <div>
        {/* Fungsinya kurang lebih mirip dengan React {children} */}
        <Outlet />
      </div>
      <div>
        <hr />
        <p>Outlet End</p>
        <h3>This is Footer</h3>
        <p>
          Location: {location.pathname}
          {location.search}
          {location.hash}
        </p>
      </div>
    </>
  );
};

export default DataLayout;
