import React from "react";
import styles from "./NotesItem.module.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export type NoteType = {
  title: string;
  label: string;
  content: string;
};

const NotesItem = ({ note }: { note: NoteType }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{note.title}</p>
      <p className={styles.label}>{note.label}</p>
      <p className={styles.content}>{note.content}</p>
      <div className={styles.actions}>
        <span>
          <CiEdit className={`${styles.icon} ${styles.leftIcon}`} />
        </span>
        <span>
          <MdDelete className={styles.icon} />
        </span>
      </div>
    </div>
  );
};

export default NotesItem;
