import { Outlet } from "react-router";

const DataLayout = () => {
  return (
    <>
      <div>
        <h1>This is Navbar</h1>
        <p>Outlet Start</p>
        <hr />
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
