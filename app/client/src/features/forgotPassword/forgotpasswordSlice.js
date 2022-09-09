import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword } from "../api/user";

const initialState = {
  emailData: null,
  emailStatus: null,
  emailError: null,
};

export const forgotpasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state, action) => {
        state.emailStatus = "pending";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.emailStatus = "success";
        state.emailData = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.emailStatus = "rejected";
        state.emailError = action.payload;
      });
  },
});

export default forgotpasswordSlice.reducer;
