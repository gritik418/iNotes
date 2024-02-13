"use client";
import { useContext } from "react";
import { NoteContext } from "./NoteContext";
import { UserContext } from "./UserContext";

export const UseNoteContext = () => {
  return useContext(NoteContext);
};

export const UseUserContext = () => {
  return useContext(UserContext);
};
