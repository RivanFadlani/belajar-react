import { createSlice, nanoid } from "@reduxjs/toolkit";

interface TodoState {
  id: string;
  name: string;
}

// == bisa juga
// * const initialState = [] satisfies TodoState[];

const initialState: TodoState[] = [];

// ingat! cara manipulasi state di sini menggunakan 'immerjs'
const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // action.payload yang dipicu oleh useDispatch()
      const { name } = action.payload;
      state.push({ id: nanoid(), name });
    },
    // cara lain destructuring action
    removeTodo: (state, { payload: id }) => {
      const index = state.findIndex((state) => state.id === id); // mengembalikan number (index)
      if (index !== -1) state.splice(index, 1);
    },
    // destructuring parameter jika lebih dari satu
    updateTodo: (state, { payload: { name, id } }) => {
      const todo = state.find((state) => state.id === id); // mengembalikan object {id: ..., name: ...}
      if (todo) todo.name = name;
    },
  },
  selectors: {
    getTodo: (state, id) => {
      return state.find((state) => state.id === id);
    },
  },
});

export default todoSlice;

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export const { getTodo } = todoSlice.selectors;
