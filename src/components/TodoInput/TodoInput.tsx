import React from "react";
import styles from "./TodoInput.module.css";
import { IoAddOutline } from "react-icons/io5";

const TodoInput = () => {
  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" placeholder="Type here..." />
      <button className={styles.btn}>
        <IoAddOutline className={styles.icon} />
      </button>
    </div>
  );
};

export default TodoInput;
