import AuthContainer from "@/components/AuthContainer/AuthContainer";
import AuthContent from "@/components/AuthContent/AuthContent";
import React from "react";

const Login = () => {
  return (
    <div className="container">
      <AuthContainer>
        <AuthContent title={"Login"} />
      </AuthContainer>
    </div>
  );
};

export default Login;
