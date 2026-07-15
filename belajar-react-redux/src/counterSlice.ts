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
    /* kalau pada saat useDispatch() increment mengirim argument 'dispatch(increment(2))',
     * maka argument itu akan dianggap sebagai payload dari action.
     * maka reducer dari increment juga akan berubah parameternya (state, action)
     * - state = untuk menyimpan state saat ini
     * - payload = untuk membawa data yang akan disimpan ke state
     * *kurang lebih caranya sama seperti reducer react
     * */
    increment: (state, action) => {
      if (action.payload) {
        return state + action.payload;
      } else {
        return state + 1;
      }
    },
    decrement: (state, action) => {
      if (action.payload) {
        return state - action.payload;
      } else {
        return state - 1;
      }
    },
  },
  // selector
  // action itu untuk memanipulasi state, sedangkan selector untuk mengambil data si state
  selectors: {
    getDoubleCounter: (state) => {
      return state * 2;
    },
    getTriple: (state, value) => {
      return state * value;
    },
  },
});

// destructuring reducer dari slice.action
export const { increment, decrement } = counterSlice.actions;
export const { getDoubleCounter, getTriple } = counterSlice.selectors;
