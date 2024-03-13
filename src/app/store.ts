"use client";
import notesReducer from "@/features/notes/notesSlice";
import todoReducer from "@/features/todo/todoSlice";
import userReducer from "@/features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
    todos: todoReducer,
  },
});

export default store;
