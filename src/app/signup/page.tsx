"use client";
import AuthContainer from "@/components/AuthContainer/AuthContainer";
import AuthContent from "@/components/AuthContent/AuthContent";
import React from "react";

const SignUp = () => {
  return (
    <div className="container">
      <AuthContainer>
        <AuthContent title={"Sign Up"} />
      </AuthContainer>
    </div>
  );
};

export default SignUp;
