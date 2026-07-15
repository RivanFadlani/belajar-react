import { useSelector } from "react-redux";
import type { RootState } from "./store";

const Counter = () => {
  // 1. panggil useSelector untuk membaca state.counter dari Redux store
  // 2. parameter state diberi tipe RootState agar TypeScript tahu bentuk store
  // 3. state.counter merujuk ke key "counter" yang didaftarkan di configureStore reducer
  const counter = useSelector((state: RootState) => state.counter);

  return (
    <div>
      <h1>Counter: {counter}</h1>
    </div>
  );
};

export default Counter;
