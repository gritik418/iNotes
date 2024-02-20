"use client";
import React, { useState } from "react";
import styles from "./AuthContent.module.css";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";
import { UseUserContext } from "@/contexts/useContextState";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContent = ({ title }: { title: string }) => {
  const [userData, setUserData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const { userSignUp } = UseUserContext();

  const login = () => {
    console.log("login");
  };

  const signUp = async () => {
    setErrors({});
    const data = await userSignUp(userData);

    if (Object.keys(data).includes("errors")) {
      setErrors(data.errors);
      return;
    }

    if (data.success) {
      toast.success(data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
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
        <div className={styles.group}>
          <div className={`${styles.inputGroup} ${styles.nameGroup}`}>
            <label className={styles.label} htmlFor="first_name">
              First Name
            </label>
            <input
              className={styles.input}
              type="text"
              name="first_name"
              id="first_name"
              onChange={handleChange}
              value={userData.first_name}
            />
            <span className={styles.error}>{errors.first_name}</span>
          </div>
          <div className={`${styles.inputGroup} ${styles.nameGroup}`}>
            <label className={styles.label} htmlFor="last_name">
              Last Name
            </label>
            <input
              className={styles.input}
              type="text"
              name="last_name"
              id="last_name"
              onChange={handleChange}
              value={userData.last_name}
            />
          </div>
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
          onChange={handleChange}
          value={userData.email}
        />
        <span className={styles.error}>{errors.email}</span>
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
          onChange={handleChange}
          value={userData.password}
        />
        <span className={styles.error}>{errors.password}</span>
      </div>

      {title !== "Login" && (
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="cpassword">
            Confirm Password
          </label>
          <input
            className={styles.input}
            type="password"
            name="password_confirmation"
            id="cpassword"
            onChange={handleChange}
            value={userData.cpassword}
          />
        </div>
      )}

      {title === "Login" && (
        <span className={styles.forgot}>
          <Link href={"/forgot-password"}>Forgot Password?</Link>
        </span>
      )}

      <div className={styles.buttonGroup}>
        <button
          className={styles.btn}
          onClick={title === "Login" ? login : signUp}>
          {title === "Login" ? "Get Started" : "Continue"}
          <FaLongArrowAltRight className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default AuthContent;
