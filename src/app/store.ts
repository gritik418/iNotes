"use client";
import notesReducer from "@/features/notes/notesSlice";
import userReducer from "@/features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
});

export default store;
