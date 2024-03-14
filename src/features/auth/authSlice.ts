import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword,
  resetPassword,
  verifyEmail,
  verifyResetLink,
} from "./authAPI";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  message: "",
  verified: false,
  loading: false,
  allowReset: false,
  failureMessage: "",
  passwordChanged: false,
};

export const verifyEmailAsync = createAsyncThunk(
  "auth/verifyEmail",
  async ({ user, token }: { user: string; token: string }) => {
    const response = await verifyEmail(user, token);
    return response;
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async ({ userData }: { userData: { email: string } }) => {
    const response = await forgotPassword(userData);
    return response;
  }
);

export const verifyResetLinkAsync = createAsyncThunk(
  "auth/verifyResetLink",
  async ({ user, token }: { user: string; token: string }) => {
    const response = await verifyResetLink(user, token);
    return response;
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async ({
    user,
    token,
    userData,
  }: {
    user: string;
    token: string;
    userData: { password: string };
  }) => {
    const response = await resetPassword(user, token, userData);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmailAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.message = action.payload.message;
          if (action.payload.message === "Account Verified") {
            state.verified = true;
          }
        }
      })
      .addCase(verifyEmailAsync.rejected, (state, action) => {
        state.message = "User Not Found";
      })
      .addCase(forgotPasswordAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success) {
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
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        toast.error("Some error occured", {
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
      })
      .addCase(verifyResetLinkAsync.pending, (state, action) => {
        state.loading = true;
        state.allowReset = false;
      })
      .addCase(verifyResetLinkAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.success) {
          if (action.payload.message === "Allow Reset") {
            state.allowReset = true;
          } else {
            state.failureMessage = action.payload.message;
          }
        } else {
          state.failureMessage = action.payload.message;
        }
      })
      .addCase(verifyResetLinkAsync.rejected, (state, action) => {
        state.loading = false;
        state.allowReset = false;
      })
      .addCase(resetPasswordAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          if (action.payload.message === "Password Changed") {
            state.passwordChanged = true;
          }
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
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        toast.error("Some error occured", {
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
      });
  },
});

export const selectMessge = (state: any) => state.auth.message;
export const selectVerified = (state: any) => state.auth.verified;
export const selectLoading = (state: any) => state.auth.loading;
export const selectAllowReset = (state: any) => state.auth.allowReset;
export const selecFailureMessage = (state: any) => state.auth.failureMessage;
export const selectPasswordChanged = (state: any) => state.auth.passwordChanged;

export default authSlice.reducer;
