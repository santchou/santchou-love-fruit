import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "../api/user";

const initialState = {
  authSignupData: null,
  authLoginData: null,
  userStatus: null,
  signupStatus: null,
  loginStatus: null,
  signupError: null,
  loginError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    loadUser: (state) => {
      const profile = JSON.parse(localStorage.getItem("profile"));
      // const profile = localStorage.getItem("profile");
      if (profile) {
        // state.authUserData = profile;
        state.authLoginData = profile;
      }
    },
    logoutUser: (state) => {
      localStorage.removeItem("profile");
      state.authLoginData = null;
      state.authSignupData = null;
      state.userStatus = null;
      state.userStatus = null;
      state.signupStatus = null;
      state.loginStatus = null;
      state.signupError = null;
      state.loginError = null;
    },
    googleSignup: (state, action) => {
      localStorage.setItem("profile", JSON.stringify(action.payload));
      // state.authUserData = action.payload;
      state.authLoginData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.userStatus = "pending";
        state.loginStatus = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userStatus = "success";
        state.loginStatus = "success";
        state.authLoginData = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.userStatus = "rejected";
        state.loginStatus = "rejected";
        state.loginError = action.payload;
      })
      .addCase(signup.pending, (state, action) => {
        state.userStatus = "pending";
        state.signupStatus = "pending";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.userStatus = "success";
        state.signupStatus = "success";
        state.authSignupData = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.userStatus = "rejected";
        state.signupStatus = "rejected";
        state.signupError = action.payload;
      });
  },
});

export const { googleSignup, loadUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
