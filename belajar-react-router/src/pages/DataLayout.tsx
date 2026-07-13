import { Link, Outlet } from "react-router";

const DataLayout = () => {
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
          <Link to="/data/product">Product</Link>
        </li>
        <li>
          <Link to="/data/seller">Seller</Link>
        </li>
        <li>
          <Link to="/data/customer">Customer</Link>
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
      </div>
    </>
  );
};

export default DataLayout;
