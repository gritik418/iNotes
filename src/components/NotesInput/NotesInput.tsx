import React from "react";
import styles from "./NotesInput.module.css";
import { IoAdd } from "react-icons/io5";

const NotesInput = () => {
  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name=""
            id=""
            className={styles.input}
            placeholder="Title"
          />
          <input
            type="text"
            name=""
            id=""
            className={styles.input}
            placeholder="General"
          />
        </div>
        <textarea
          name=""
          id=""
          cols={30}
          rows={4}
          className={styles.content}
          placeholder="Content"></textarea>
        <button className={styles.btn}>
          <IoAdd className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default NotesInput;
