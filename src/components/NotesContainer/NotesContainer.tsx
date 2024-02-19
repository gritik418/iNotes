import React from "react";
import styles from "./NotesContainer.module.css";

const NotesContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className={styles.container}>{children}</div>;
};

export default NotesContainer;
