"use client";
import AuthContainer from "@/components/AuthContainer/AuthContainer";
import AuthContent from "@/components/AuthContent/AuthContent";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { selectIsLoggedIn } from "@/features/user/userSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const SignUp = () => {
  const router = useRouter();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    router.push("/");
  }
  return (
    <>
      <Navbar />
      <div className="container">
        <AuthContainer>
          <AuthContent title={"Sign Up"} />
        </AuthContainer>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
