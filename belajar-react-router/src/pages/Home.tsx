import { useNavigate } from "react-router";

const Home = () => {
  // Navigasi antar page menggunakan function javascript
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({
      pathname: "/data",
    });
  };

  return (
    <div>
      <h1>Selamat Datang di Home</h1>
      <p>Kamu masuk route (/)</p>
      <button onClick={handleClick}>Go To Data Page</button>
    </div>
  );
};

export default Home;
