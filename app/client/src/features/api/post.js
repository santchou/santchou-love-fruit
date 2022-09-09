import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const getPost = createAsyncThunk("post/getPost", async (id) => {
  try {
    const response = await API.get(`/api/posts/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getPosts = createAsyncThunk("posts/getPosts", async (page) => {
  try {
    const response = await API.get(`/api/posts?page=${page}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getPostsBySearch = createAsyncThunk(
  "posts/getPostsBySearch",
  async (searchQuery) => {
    try {
      const response = await API.get(
        `/api/posts/search?searchQuery=${searchQuery}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createPost = createAsyncThunk("post/createPost", async (post) => {
  try {
    const response = await API.post("/api/posts", post);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = createAsyncThunk(
  "post/updatePost",

  async ({ currentId: id, ...postData }) => {
    try {
      const response = await API.patch(`/api/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  try {
    const response = await API.delete(`api/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const likePost = createAsyncThunk("post/likePost", async (id) => {
  try {
    const response = await API.patch(`api/posts/${id}/likePost`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const commentPost = createAsyncThunk(
  "post/comment",
  async ({ comment, id }) => {
    try {
      const response = await API.post(`/api/posts/${id}/commentPost`, {
        comment,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
