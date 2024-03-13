"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./NotesInput.module.css";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addNotesAsync } from "@/features/notes/notesSlice";
import { selectIsLoggedIn } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNotesData({ ...notesData, [name]: value });
  };

  const handleAddNote = () => {
    if (isLoggedIn) {
      dispatch(addNotesAsync(notesData));
      setNotesData({
        content: "",
        label: "General",
        title: "",
      });
    } else {
      toast.error("Please Login.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    }
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
