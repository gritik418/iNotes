import { UserType } from "@/app/api/(auth)/signup/route";
import axios from "axios";

export const userSignUp = async (userData: UserType) => {
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
