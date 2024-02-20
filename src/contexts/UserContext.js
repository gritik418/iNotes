"use client";
import { createContext, useState } from "react";
import { userSignUp } from "./UserMethods";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserContext.Provider value={{ userSignUp, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
