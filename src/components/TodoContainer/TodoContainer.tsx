import React from "react";
import styles from "./TodoContainer.module.css";
import TodoItem from "../TodoItem/TodoItem";

const TodoContainer = () => {
  return (
    <div className="container">
      <div className={styles.todoBox}>
        <TodoItem checked={true} />
        <TodoItem checked={false} />
        <TodoItem checked={true} />
        <TodoItem checked={false} />
        <TodoItem checked={true} />
      </div>
    </div>
  );
};

export default TodoContainer;
