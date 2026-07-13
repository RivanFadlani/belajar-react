import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

const ProductSearch = () => {
  {
    /* URL Search Param akan mengembalikan array yang berisi object URLSearchParam dan setter functionnya */
  }
  {
    /* URLSearchParam itu ada di dokumentasi mdn javascript */
  }
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (search) {
      navigate({
        pathname: "/data/product/search",
        search: `?search=${search}`,
      });
    }
  };

  return (
    <>
      <div>
        <h1>Search Product</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <p>Kamu mencari: {searchParams.get("search")}</p>
      </div>
    </>
  );
};

export default ProductSearch;
