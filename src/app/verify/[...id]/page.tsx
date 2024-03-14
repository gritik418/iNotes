"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "./verify.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMessge,
  selectVerified,
  verifyEmailAsync,
} from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";

const VerifyEmail = ({ params }: any) => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const message: string = useSelector(selectMessge);
  const verified: boolean = useSelector(selectVerified);

  useEffect(() => {
    dispatch(verifyEmailAsync({ user: params.id[0], token: params.id[1] }));
  }, [dispatch, params]);

  useEffect(() => {
    if (verified) {
      router.push("/");
    }
  }, [verified, router, message]);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image src={"/images/logo.png"} height={50} width={50} alt="logo" />
        <h1 className={styles.brand}>iNotes</h1>
      </div>
      <div className={styles.group}>
        <h2 className={styles.heading}>Verifiying your Email Address</h2>
      </div>
      <div className={styles.info}>
        <p>
          Thanks for creating your account on iNotes! You will be redirected
          soon after verification.
        </p>
        <p>This process might take few seconds.</p>
      </div>
      {!message ? (
        <Image
          src={"/images/loading.gif"}
          height={120}
          width={120}
          alt="loading"
        />
      ) : (
        <h3 className={styles.message}>{message}</h3>
      )}
    </div>
  );
};

export default VerifyEmail;
