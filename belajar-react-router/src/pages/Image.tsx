import { useParams } from "react-router";

const Image = () => {
  const params = useParams();

  return (
    <>
      <div>
        <h1>Welcome to Image Page</h1>
        <p>Image Page: {params["*"]}</p>
      </div>
    </>
  );
};

export default Image;
