import { LoginSchemaType } from "@/validators/LoginSchema";
import { SignupSchemaType } from "@/validators/SignupSchema";
import axios from "axios";

export const userLogin = async (userData: LoginSchemaType) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/login`,
      userData,
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

export const userSignup = async (userData: SignupSchemaType) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/signup`,
      userData,
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

export const getUser = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_DOMAIN}/api/user`,
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
