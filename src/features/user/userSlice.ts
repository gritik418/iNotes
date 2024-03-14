import { LoginSchemaType } from "@/validators/LoginSchema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, userLogin, userSignup } from "./userAPI";
import { SignupSchemaType } from "@/validators/SignupSchema";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  loading: false,
  isLoggedIn: false,
  userData: {},
  errors: {},
};

export const getUserAsync = createAsyncThunk("users/getUser", async () => {
  const response = await getUser();
  return response;
});

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
  reducers: {
    resetUser(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignupAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userSignupAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.errors) {
          state.errors = action.payload.errors;
        }
        if (action.payload.success) {
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
        state.loading = false;
      })
      .addCase(userLoginAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.errors) {
          state.errors = action.payload.errors;
        }
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
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.isLoggedIn = true;
          state.userData = action.payload.user;
        }
      });
  },
});

export const selectIsLoggedIn = (state: any) => state.user.isLoggedIn;
export const selectLoading = (state: any) => state.user.loading;
export const selectUser = (state: any) => state.user.userData;
export const selectErrors = (state: any) => state.user.errors;

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
