import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTodo, completeTodo, deleteTodoById, getTodos } from "./todoAPI";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  todos: [],
  addTodoLoading: false,
};

export const addTodoAsync = createAsyncThunk(
  "todo/addTodo",
  async (todoData: { content: string }) => {
    const response = await addTodo(todoData);
    return response;
  }
);

export const getTodosAsync = createAsyncThunk("todo/getTodos", async () => {
  const response = await getTodos();
  return response;
});

export const completeTodoAsync = createAsyncThunk(
  "todo/completeTodo",
  async ({ id, todoData }: { id: string; todoData: any }) => {
    const response = await completeTodo(id, todoData);
    return response;
  }
);

export const deleteTodoByIdAsync = createAsyncThunk(
  "todo/deleteTodo",
  async (id: string) => {
    const response = await deleteTodoById(id);
    return response;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    resetTodos(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoAsync.pending, (state, action) => {
        state.addTodoLoading = true;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.addTodoLoading = false;
        if (action.payload.success) {
          state.todos.unshift(action.payload.todo as never);
          toast.success(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          toast.error(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.addTodoLoading = false;
        toast.error("Something went wrong", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.todos = action.payload.todos;
        }
      })
      .addCase(completeTodoAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          // @ts-ignore
          state.todos = state.todos.map((todo: any): any => {
            if (todo._id === action.payload.todo._id) {
              return action.payload.todo;
            }
            return todo;
          });
        }
      })
      .addCase(deleteTodoByIdAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          // @ts-ignore
          state.todos = state.todos.filter((todo: any): any => {
            if (todo._id !== action.payload.todoId) {
              return todo;
            }
          });
        }
      });
  },
});

export const selectTodos = (state: any) => state.todos.todos;
export const { resetTodos } = todoSlice.actions;

export default todoSlice.reducer;
