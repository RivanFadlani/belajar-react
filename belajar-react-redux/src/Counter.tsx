import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import { decrement, increment } from "./counterSlice";

const Counter = () => {
  // 1. panggil useSelector untuk membaca state.counter dari Redux store
  // 2. parameter state diberi tipe RootState agar TypeScript tahu bentuk store
  // 3. state.counter merujuk ke key "counter" yang didaftarkan di configureStore reducer
  const counter = useSelector((state: RootState) => state.counter);
  // gunakan hook useDispatch() dari redux
  const dispatch = useDispatch();

  // buat handle function
  const handleIncrement = () => {
    // panggil action dari counterSlice (slice)
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={handleIncrement}>Increment +++</button>
      <button onClick={handleDecrement}>Decrement +++</button>
    </div>
  );
};

export default Counter;
