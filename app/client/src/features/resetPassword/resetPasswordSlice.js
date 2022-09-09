import { createSlice } from "@reduxjs/toolkit";
import { resetPassword } from "../api/user";

const initialState = {
  resetData: null,
  resetStatus: null,
  resetError: null,
};

export const resetpasswordSlice = createSlice({
  name: "resetPassword",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state, action) => {
        state.resetStatus = "pending";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetStatus = "success";
        state.resetData = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetStatus = "rejected";
        state.resetError = action.payload;
      });
  },
});

export default resetpasswordSlice.reducer;
