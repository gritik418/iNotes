"use client";
import React, { useEffect } from "react";
import TodoInput from "@/components/TodoInput/TodoInput";
import TodoContainer from "@/components/TodoContainer/TodoContainer";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { getTodosAsync } from "@/features/todo/todoSlice";

const Todo = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "60px", minHeight: "95vh" }}>
        <div className="container">
          <TodoInput />
          <TodoContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Todo;
