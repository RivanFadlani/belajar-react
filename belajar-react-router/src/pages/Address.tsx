import { useParams } from "react-router";

const Address = () => {
  const params = useParams();
  return (
    <>
      <div>
        <h1>Welcome to User Page</h1>
        <p>
          This is User Page <strong>{params.addressId}</strong>
        </p>
      </div>
    </>
  );
};

export default Address;
