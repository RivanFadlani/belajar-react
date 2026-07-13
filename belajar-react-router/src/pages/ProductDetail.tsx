import { useParams } from "react-router";

const ProductDetail = () => {
  const params = useParams();

  return (
    <>
      <div>
        <h1>Welcome to Product Detail Page</h1>
        {/* nama param harus sama seperti yang dideklarasikan (productId) */}
        {/* url param ini tipe datanya adalah 'string' */}
        <p>
          This is Pruduct Detail <strong>{params.productId}</strong>
        </p>
      </div>
    </>
  );
};

export default ProductDetail;
