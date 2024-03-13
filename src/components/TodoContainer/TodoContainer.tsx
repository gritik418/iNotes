"use client";
import React from "react";
import styles from "./TodoContainer.module.css";
import TodoItem from "../TodoItem/TodoItem";
import { useSelector } from "react-redux";
import { selectTodos } from "@/features/todo/todoSlice";

const TodoContainer = () => {
  const todos = useSelector(selectTodos);

  return (
    <div className="container">
      <div className={styles.todoBox}>
        {todos &&
          todos.map((todo: any) => {
            return <TodoItem key={todo._id} todo={todo} />;
          })}
      </div>
    </div>
  );
};

export default TodoContainer;
