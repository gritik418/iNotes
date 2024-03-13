import React from "react";
import styles from "./NotesItem.module.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDisclosure } from "@chakra-ui/react";
import NoteModal from "../NoteModal/NoteModal";
import { useDispatch } from "react-redux";
import { deleteNoteByIdAsync } from "@/features/notes/notesSlice";

export type NoteType = {
  title: string;
  label: string;
  content: string;
  _id: string;
};

const NotesItem = ({ note }: { note: NoteType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<any>();

  const handleDelete = () => {
    dispatch(deleteNoteByIdAsync(note._id));
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{note.title}</p>
      {note.label && <p className={styles.label}>{note.label}</p>}
      <p className={styles.content}>{note.content}</p>
      <div className={styles.actions}>
        <span>
          <CiEdit
            className={`${styles.icon} ${styles.leftIcon}`}
            onClick={onOpen}
          />
        </span>
        <span>
          <MdDelete className={styles.icon} onClick={handleDelete} />
        </span>
      </div>

      <NoteModal note={note} isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default NotesItem;
