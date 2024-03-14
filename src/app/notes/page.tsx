"use client";
import Authenticate from "@/components/Authenticate/Authenticate";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import NotesContainer from "@/components/NotesContainer/NotesContainer";
import NotesInput from "@/components/NotesInput/NotesInput";
import NotesItem, { NoteType } from "@/components/NotesItem/NotesItem";
import { getNotesAsync, selectNotes } from "@/features/notes/notesSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Notes = () => {
  const dispatch = useDispatch<any>();
  const notes = useSelector(selectNotes);

  useEffect(() => {
    dispatch(getNotesAsync());
  }, [dispatch]);
  return (
    <>
      <Authenticate />
      <Navbar />
      <div
        className="container"
        style={{ paddingTop: "60px", minHeight: "95vh" }}>
        <NotesInput />
        <NotesContainer>
          {notes &&
            notes.map((note: NoteType, index: number) => (
              <NotesItem key={note._id} note={note} />
            ))}
        </NotesContainer>
      </div>
      <Footer />
    </>
  );
};

export default Notes;
