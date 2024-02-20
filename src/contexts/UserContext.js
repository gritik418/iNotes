"use client";
import { createContext } from "react";
import { userSignUp } from "./UserMethods";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={{ userSignUp }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
