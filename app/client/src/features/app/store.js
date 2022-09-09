import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../post/postSlice";
import userReducer from "../user/userSlice";
import verifyemailReducer from "../verifyEmail/verifyemailSlice";
import forgotpasswordReducer from "../forgotPassword/forgotpasswordSlice";
import resetPasswordReducer from "../resetPassword/resetPasswordSlice";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    user: userReducer,
    emailVerify: verifyemailReducer,
    forgotPassword: forgotpasswordReducer,
    resetPassword: resetPasswordReducer,
  },
});
