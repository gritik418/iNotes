"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./TodoInput.module.css";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "@/features/todo/todoSlice";

const TodoInput = () => {
  const [todoContent, setTodoContent] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch<any>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setTodoContent(e.target.value);
  };

  const addTodo = () => {
    setError("");
    if (todoContent === "") {
      setError("Content is required.");
      return;
    }
    dispatch(addTodoAsync({ content: todoContent }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <input
          className={styles.input}
          value={todoContent}
          onChange={handleChange}
          type="text"
          placeholder="Type here..."
        />
        <button className={styles.btn} onClick={addTodo}>
          <IoAddOutline className={styles.icon} />
        </button>
      </div>
      <p className={styles.error}>{error}</p>
    </div>
  );
};

export default TodoInput;
