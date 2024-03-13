import React from "react";
import styles from "./NotesItem.module.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export type NoteType = {
  title: string;
  label: string;
  content: string;
  _id: string;
};

const NotesItem = ({
  note,
  onOpen,
  setNoteId,
}: {
  note: NoteType;
  onOpen: any;
  setNoteId: any;
}) => {
  setNoteId(note._id);
  return (
    <div className={styles.container}>
      <p className={styles.title}>{note.title}</p>
      <p className={styles.label}>{note.label}</p>
      <p className={styles.content}>{note.content}</p>
      <div className={styles.actions}>
        <span>
          <CiEdit
            className={`${styles.icon} ${styles.leftIcon}`}
            onClick={onOpen}
          />
        </span>
        <span>
          <MdDelete className={styles.icon} />
        </span>
      </div>
    </div>
  );
};

export default NotesItem;
