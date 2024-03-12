"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import NotesContainer from "@/components/NotesContainer/NotesContainer";
import NotesInput from "@/components/NotesInput/NotesInput";
import NotesItem, { NoteType } from "@/components/NotesItem/NotesItem";
import React, { useEffect } from "react";

const Notes = () => {
  const handleGetNotes = async () => {
    // const response = await getNotes();
    // if (response.success) {
    //   setNotes(response.notes);
    // }
  };

  useEffect(() => {
    handleGetNotes();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: "60px" }}>
        <NotesInput />
        <NotesContainer>
          <></>
          {/* {notes &&
            notes.map((note: NoteType, index: number) => (
              <NotesItem key={index} note={note} />
            ))} */}
        </NotesContainer>
      </div>
      <Footer />
    </>
  );
};

export default Notes;
