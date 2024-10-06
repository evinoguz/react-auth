import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todos = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, actions) => {
      state.todos = actions.payload;
    },
    appendTodo: (state, actions) => {
      state.todos = [...state.todos, actions.payload];
    },
  },
});
export const { setTodos, appendTodo } = todos.actions;
export default todos.reducer;
