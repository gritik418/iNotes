"use client";
import React, { useState } from "react";
import styles from "./forgotpassword.module.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { forgotPasswordAsync, selectLoading } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState<string>("");

  const handleForgot = () => {
    dispatch(forgotPasswordAsync({ userData: { email } }));
    setTimeout(() => {
      setEmail("");
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ minHeight: "90vh" }}>
        <div className={styles.container}>
          <div className={styles.group}>
            <Image
              src={"/images/forgotPassword.png"}
              height={120}
              width={120}
              alt="forgot-password"
            />
            <h1 className={styles.heading}>Forgot Password</h1>
          </div>
        </div>
        <div className={styles.actions}>
          <input
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />
          <button
            className={styles.btn}
            style={{
              opacity: `${loading ? "0.5" : "1"}`,
            }}
            onClick={handleForgot}>
            {loading ? "Processing..." : "Continue"}
            {!loading && <FaLongArrowAltRight className={styles.icon} />}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
