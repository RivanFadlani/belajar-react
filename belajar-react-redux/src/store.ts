import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";

// 1. configureStore menggabungkan semua reducer menjadi satu root reducer
// 2. key "counter" menentukan nama properti di state global: state.counter
// 3. nilai counterSlice.reducer adalah fungsi reducer dari createSlice
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// 1. RootState adalah tipe dari seluruh state Redux, diambil dari store.getState
// 2. dipakai di useSelector agar state memiliki tipe yang benar (TypeScript)
// 3. AppDispatch adalah tipe dari dispatch, dipakai untuk dispatch action
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
