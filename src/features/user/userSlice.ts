import { LoginSchemaType } from "@/validators/LoginSchema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin, userSignup } from "./userAPI";
import { SignupSchemaType } from "@/validators/SignupSchema";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  loginLoading: false,
  signupLoading: false,
  isLoggedIn: false,
};

export const userLoginAsync = createAsyncThunk(
  "users/userLogin",
  async (userData: LoginSchemaType) => {
    const response = await userLogin(userData);
    return response;
  }
);

export const userSignupAsync = createAsyncThunk(
  "users/userSignup",
  async (userData: SignupSchemaType) => {
    const response = await userSignup(userData);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSignupAsync.pending, (state, action) => {
        state.signupLoading = true;
      })
      .addCase(userSignupAsync.fulfilled, (state, action) => {
        state.signupLoading = false;
        if (action.payload.success) {
          state.isLoggedIn = true;
          toast.success(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        } else {
          state.isLoggedIn = false;
          toast.error(action.payload.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      })
      .addCase(userSignupAsync.rejected, (state, action) => {
        state.signupLoading = false;
      });
  },
});

export const selectIsLoggedIn = (state: any) => state.user.isLoggedIn;

export default userSlice.reducer;
