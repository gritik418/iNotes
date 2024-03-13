"use client";
import React from "react";
import styles from "./TodoItem.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { Checkbox } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  completeTodoAsync,
  deleteTodoByIdAsync,
} from "@/features/todo/todoSlice";

type TodoType = {
  _id: string;
  content: string;
  isCompleted: boolean;
};

const TodoItem = ({ todo }: { todo: TodoType }) => {
  const dispatch = useDispatch<any>();

  const handleUpdate = (e: any) => {
    dispatch(
      completeTodoAsync({
        id: todo._id,
        todoData: { isCompleted: !todo.isCompleted },
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodoByIdAsync(todo._id));
  };
  return (
    <div className={styles.container}>
      <Checkbox
        className={styles.checkBox}
        colorScheme="gray"
        iconSize={14}
        onChange={handleUpdate}
        value={todo.isCompleted as unknown as string}
        size={"lg"}></Checkbox>
      <p
        className={styles.content}
        style={{
          textDecoration: `${todo.isCompleted ? "line-through" : ""}`,
        }}>
        {todo.content}
      </p>
      <MdDeleteOutline className={styles.deleteBtn} onClick={handleDelete} />
    </div>
  );
};

export default TodoItem;
