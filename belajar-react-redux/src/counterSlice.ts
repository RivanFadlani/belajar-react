import { createSlice } from "@reduxjs/toolkit";

// 1. createSlice menerima objek konfigurasi: name, initialState, reducers
// 2. name "counter" dipakai sebagai prefix action type (contoh: "counter/increment")
// 3. initialState diisi 0 sebagai nilai awal state
// 4. reducers: {} berisi fungsi untuk mengubah state (masih kosong, akan diisi nanti)
// 5. createSlice otomatis menghasilkan action creator dan reducer berdasarkan reducers
export const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    // property ini akan dipanggil sebagai action
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

// destructuring reducer dari slice.action
export const { increment, decrement } = counterSlice.actions;
