import React from "react";
import styles from "./AuthContent.module.css";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

const AuthContent = ({ title }: { title: string }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{title}</h1>
      {title === "Login" ? (
        <p className={styles.para}>
          Don&#x27;t have an account?
          <Link className={styles.link} href={"/signup"}>
            Create a free account
          </Link>
        </p>
      ) : (
        <p className={styles.para}>
          Already have an account?
          <Link className={styles.link} href={"/login"}>
            Login
          </Link>
        </p>
      )}

      {title !== "Login" && (
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="name">
            Full Name
          </label>
          <input className={styles.input} type="text" name="name" id="name" />
        </div>
      )}

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="email">
          Email Address
        </label>
        <input
          className={styles.input}
          autoComplete="off"
          type="email"
          name="email"
          id="email"
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.input}
          type="password"
          name="password"
          id="password"
        />
      </div>

      {title !== "Login" && (
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="cpassword">
            Confirm Password
          </label>
          <input
            className={styles.input}
            type="password"
            name="cpassword"
            id="cpassword"
          />
        </div>
      )}

      {title === "Login" && (
        <span className={styles.forgot}>
          <Link href={"/forgot-password"}>Forgot Password?</Link>
        </span>
      )}

      <div className={styles.buttonGroup}>
        <button className={styles.btn}>
          {title === "Login" ? "Get Started" : "Continue"}
          <FaLongArrowAltRight className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default AuthContent;
