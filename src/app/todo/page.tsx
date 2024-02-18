import React from "react";
import TodoInput from "@/components/TodoInput/TodoInput";
import TodoContainer from "@/components/TodoContainer/TodoContainer";

const Todo = () => {
  return (
    <div style={{ paddingTop: "60px" }}>
      <div className="container">
        <TodoInput />
        <TodoContainer />
      </div>
    </div>
  );
};

export default Todo;
