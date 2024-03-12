"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./NotesInput.module.css";
import { IoAdd } from "react-icons/io5";

type NotesDataType = {
  label: string;
  title: string;
  content: string;
};

const NotesInput = () => {
  const [notesData, setNotesData] = useState<NotesDataType>({
    content: "",
    label: "General",
    title: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNotesData({ ...notesData, [name]: value });
  };

  const handleAddNote = () => {
    // setNotes([...notes, notesData]);
    // addNote(notesData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={notesData.title}
            className={styles.input}
            placeholder="Title"
          />
          <input
            type="text"
            onChange={handleChange}
            name="label"
            value={notesData.label}
            className={styles.input}
            placeholder="General"
          />
        </div>
        <textarea
          value={notesData.content}
          name="content"
          cols={30}
          rows={4}
          onChange={handleChange}
          className={styles.content}
          placeholder="Content"></textarea>
        <button className={styles.btn} onClick={handleAddNote}>
          <IoAdd className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default NotesInput;
