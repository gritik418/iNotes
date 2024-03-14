"use client";
import {
  getUserAsync,
  selectIsLoggedIn,
  selectUser,
} from "@/features/user/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Authenticate = () => {
  const dispatch = useDispatch<any>();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!isLoggedIn || !user.email) {
      dispatch(getUserAsync());
    }
  }, [isLoggedIn, dispatch, user]);

  return <div></div>;
};

export default Authenticate;
