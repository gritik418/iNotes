"use client";
import { createContext } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export default UserProvider;
