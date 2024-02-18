import React from "react";
import styles from "./TodoItem.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { Checkbox } from "@chakra-ui/react";

const TodoItem = ({ checked }: { checked: boolean }) => {
  return (
    <div className={styles.container}>
      <Checkbox
        className={styles.checkBox}
        colorScheme="gray"
        iconSize={14}
        size={"lg"}></Checkbox>
      <p className={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima ut culpa
        repellat
      </p>
      <MdDeleteOutline className={styles.deleteBtn} />
    </div>
  );
};

export default TodoItem;
