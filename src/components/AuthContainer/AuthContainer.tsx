import React from "react";
import styles from "./AuthContainer.module.css";

const AuthContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className={styles.container}>{children}</div>;
};

export default AuthContainer;
