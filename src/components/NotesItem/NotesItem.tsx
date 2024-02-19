import React from "react";
import styles from "./NotesItem.module.css";

const NotesItem = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Lorem ipsum dolor sit.</p>
      <p className={styles.label}>Lorem Ipsum</p>
      <p className={styles.content}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi labore
        reprehenderit inventore facere excepturi, cupiditate maxime sed quis
        magnam ad! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nemo, quos.
      </p>
    </div>
  );
};

export default NotesItem;
