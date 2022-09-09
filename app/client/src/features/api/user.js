import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const login = createAsyncThunk(
  "user/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/users/login", formData);
      localStorage.setItem("profile", JSON.stringify(response.data));

      return response.data;
    } catch (err) {
      //console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/users/signup", formData);

      return response.data;
    } catch (err) {
      //console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "user/emailVerify",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/users/verify-email", formData);
      // localStorage.setItem("emailverifyinfo", JSON.stringify(response.data));

      return response.data;
    } catch (err) {
      //console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/users/forgot-password", email);
      // localStorage.setItem("emailverifyinfo", JSON.stringify(response.data));

      return response.data;
    } catch (err) {
      //console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (tokenId, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/users/reset-password", tokenId);
      // localStorage.setItem("emailverifyinfo", JSON.stringify(response.data));

      return response.data;
    } catch (err) {
      //console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
