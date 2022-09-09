import { createSlice } from "@reduxjs/toolkit";
import { verifyEmail } from "../api/user";

const initialState = {
  verifyEmailData: null,
  verifyEmailStatus: null,
  verifyEmailError: null,
};

export const verifyemailSlice = createSlice({
  name: "emailVerify",
  initialState,

  reducers: {
    logoutUser2: (state) => {
      state.verifyEmailData = null;
      state.verifyEmailStatus = null;
      state.verifyEmailError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state, action) => {
        state.verifyEmailStatus = "pending";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.verifyEmailStatus = "success";
        state.verifyEmailData = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifyEmailStatus = "rejected";
        state.verifyEmailError = action.payload;
      });
  },
});

export const { logoutUser2 } = verifyemailSlice.actions;
export default verifyemailSlice.reducer;
