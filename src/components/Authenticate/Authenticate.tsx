"use client";
import { getUserAsync } from "@/features/user/userSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Authenticate = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getUserAsync());
  }, []);

  return <div></div>;
};

export default Authenticate;
