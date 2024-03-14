"use client";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./resetPassword.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordAsync,
  selecFailureMessage,
  selectAllowReset,
  selectLoading,
  selectPasswordChanged,
  verifyResetLinkAsync,
} from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { FaLongArrowAltRight } from "react-icons/fa";

const ResetPassword = ({ params }: any) => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [resetPasswordData, setResetPasswordData] = useState({
    cpassword: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const loading = useSelector(selectLoading);
  const allowReset = useSelector(selectAllowReset);
  const failureMessage = useSelector(selecFailureMessage);
  const passwordChanged = useSelector(selectPasswordChanged);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPasswordData({ ...resetPasswordData, [name]: value });
  };

  const handleResetPassword = () => {
    setError("");
    if (resetPasswordData.password.length < 6) {
      setError("Password must be atleast 6 characters long.");
      return;
    } else if (resetPasswordData.cpassword !== resetPasswordData.password) {
      setError("Password and Confirm Password must be same.");
      return;
    } else if (!allowReset) {
      return;
    }

    dispatch(
      resetPasswordAsync({
        user: params.id[0],
        token: params.id[1],
        userData: { password: resetPasswordData.password },
      })
    );
  };

  useEffect(() => {
    if (passwordChanged) {
      router.push("/login");
    }
  }, [passwordChanged, router]);

  useEffect(() => {
    dispatch(verifyResetLinkAsync({ user: params.id[0], token: params.id[1] }));
  }, [dispatch, params]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={"/images/logo.png"} height={50} width={50} alt="logo" />
        <h1 className={styles.brand}>iNotes</h1>
      </div>
      <div className={styles.group}>
        <Image
          src={"/images/resetPassword.png"}
          height={120}
          width={120}
          alt="reset"
        />
        <h2 className={styles.heading}>Reset your Password</h2>
        {!failureMessage && (
          <p style={{ marginTop: "15px", fontSize: "16px" }}>
            The Link is valid only for 10 minutes
          </p>
        )}
      </div>

      <>
        {allowReset && !failureMessage ? (
          <>
            <div className={styles.info}>
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
                  value={resetPasswordData.password}
                />
                <span className={styles.error}>{error}</span>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="cpassword">
                  Confirm Password
                </label>
                <input
                  className={styles.input}
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  onChange={handleChange}
                  value={resetPasswordData.cpassword}
                />
              </div>
            </div>
            <button
              className={styles.btn}
              style={{
                opacity: `${loading ? "0.5" : "1"}`,
              }}
              onClick={handleResetPassword}>
              {loading ? "Processing..." : "Continue"}
              {!loading && <FaLongArrowAltRight className={styles.icon} />}
            </button>
          </>
        ) : failureMessage ? (
          <p className={styles.failure}>{failureMessage}</p>
        ) : (
          <Image
            style={{ marginTop: "140px" }}
            src={"/images/loading.gif"}
            height={120}
            width={120}
            alt="loading"
          />
        )}
      </>
    </div>
  );
};

export default ResetPassword;
