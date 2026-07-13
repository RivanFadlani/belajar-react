import { useParams } from "react-router";

const User = () => {
  const params = useParams();
  return (
    <>
      <div>
        <h1>Welcome to User Page</h1>
        <p>
          This is User Page <strong>{params.userId}</strong>
        </p>
      </div>
    </>
  );
};

export default User;
