import React from "react";
import TodoInput from "@/components/TodoInput/TodoInput";
import TodoContainer from "@/components/TodoContainer/TodoContainer";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const Todo = () => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "60px" }}>
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
