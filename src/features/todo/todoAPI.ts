import axios from "axios";

export const addTodo = async (todoData: any) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/todo`,
      todoData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getTodos = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/todo`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const completeTodo = async (id: string, todoData: any) => {
  try {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/todo/${id}`,
      todoData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteTodoById = async (id: string) => {
  try {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/todo/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
