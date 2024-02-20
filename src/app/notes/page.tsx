import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import NotesContainer from "@/components/NotesContainer/NotesContainer";
import NotesInput from "@/components/NotesInput/NotesInput";
import NotesItem from "@/components/NotesItem/NotesItem";
import React from "react";

const Notes = () => {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
};

export default Notes;
