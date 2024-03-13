"use client";
import React from "react";
import styles from "./TodoItem.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { Checkbox } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTodoAsync,
  deleteTodoByIdAsync,
} from "@/features/todo/todoSlice";
import { selectIsLoggedIn } from "@/features/user/userSlice";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";

type TodoType = {
  _id: string;
  content: string;
  isCompleted: boolean;
};

const TodoItem = ({ todo }: { todo: TodoType }) => {
  const dispatch = useDispatch<any>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const router = useRouter();

  const handleUpdate = (e: any) => {
    if (isLoggedIn) {
      dispatch(
        completeTodoAsync({
          id: todo._id,
          todoData: { isCompleted: !todo.isCompleted },
        })
      );
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
        defaultChecked={todo.isCompleted}
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
