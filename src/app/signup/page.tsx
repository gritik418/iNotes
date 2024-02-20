"use client";
import AuthContainer from "@/components/AuthContainer/AuthContainer";
import AuthContent from "@/components/AuthContent/AuthContent";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { UseUserContext } from "@/contexts/useContextState";
import { useRouter } from "next/navigation";
import React from "react";

const SignUp = () => {
  const { isLoggedIn } = UseUserContext();
  const router = useRouter();

  if (isLoggedIn) {
    return router.push("/");
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
