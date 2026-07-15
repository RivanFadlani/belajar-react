import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import {
  decrement,
  getDoubleCounter,
  getTriple,
  increment,
} from "./counterSlice";

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
    dispatch(increment(1));
  };

  const handleDecrement = () => {
    dispatch(decrement(1));
  };

  const doubleCounter = useSelector(getDoubleCounter);
  const tripleCounter = useSelector((state: RootState) => getTriple(state, 3));

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <h2>Double Counter: {doubleCounter}</h2>
      <h2>Triple Counter: {tripleCounter}</h2>
      <button onClick={handleIncrement}>Increment +++</button>
      <button onClick={() => dispatch(increment(3))}>Increment +3</button>
      <button onClick={handleDecrement}>Decrement +++</button>
      <button onClick={() => dispatch(decrement(3))}>Decrement -3</button>
    </div>
  );
};

export default Counter;
