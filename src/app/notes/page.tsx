"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import NoteModal from "@/components/NoteModal/NoteModal";
import NotesContainer from "@/components/NotesContainer/NotesContainer";
import NotesInput from "@/components/NotesInput/NotesInput";
import NotesItem, { NoteType } from "@/components/NotesItem/NotesItem";
import { getNotesAsync, selectNotes } from "@/features/notes/notesSlice";
import { useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Notes = () => {
  const dispatch = useDispatch<any>();
  const notes = useSelector(selectNotes);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [noteId, setNoteId] = useState<string>("");

  useEffect(() => {
    dispatch(getNotesAsync());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{ paddingTop: "60px", minHeight: "95vh" }}>
        <NotesInput />
        <NotesContainer>
          {notes &&
            notes.map((note: NoteType, index: number) => (
              <NotesItem setNoteId={setNoteId} onOpen={onOpen} key={index} note={note} />
            ))}
        </NotesContainer>
      </div>
      <NoteModal id="" isOpen={isOpen} onClose={onClose} />
      <Footer />
    </>
  );
};

export default Notes;
