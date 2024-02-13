"use client";
import { createContext } from "react";

export const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const name = "ritik";
  return (
    <NoteContext.Provider value={{ name }}>{children}</NoteContext.Provider>
  );
};

export default NoteProvider;
