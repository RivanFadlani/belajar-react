import { useParams } from "react-router";

const NotFound = () => {
  const params = useParams();

  return (
    <>
      <div>
        <h1>Not Found</h1>
        <p>Not Found: {params["*"]}</p>
      </div>
    </>
  );
};

export default NotFound;
