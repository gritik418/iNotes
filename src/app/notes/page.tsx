import NotesContainer from "@/components/NotesContainer/NotesContainer";
import NotesInput from "@/components/NotesInput/NotesInput";
import NotesItem from "@/components/NotesItem/NotesItem";
import React from "react";

const Notes = () => {
  return (
    <div className="container" style={{ paddingTop: "60px" }}>
      <NotesInput />
      <NotesContainer>
        <NotesItem />
        <NotesItem />
        <NotesItem />
        <NotesItem />
        <NotesItem />
        <NotesItem />
      </NotesContainer>
    </div>
  );
};

export default Notes;
