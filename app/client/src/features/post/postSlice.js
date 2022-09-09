import { createSlice } from "@reduxjs/toolkit";
import {
  getPost,
  getPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../api/post";

const initialState = {
  posts: [],
  post: [],
  currentPage: 0,
  numberOfPages: 0,
  createStatus: null,
  updateStatus: null,
  likeStatus: null,
  deleteStatus: null,
  getPostsStatus: null,
  getPostStatus: null,
  commentStatus: null,
  //getPostsBySearch: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.getPostStatus = "loading";
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.getPostStatus = "success";
      })
      .addCase(getPost.rejected, (state) => {
        state.getPostStatus = "failed";
      })
      .addCase(getPosts.pending, (state) => {
        state.getPostsStatus = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.numberOfPages = action.payload.numberOfPages;
        state.currentPage = action.payload.currentPage;
        state.getPostsStatus = "success";
      })
      .addCase(getPosts.rejected, (state) => {
        state.getPostsStatus = "failed";
      })
      .addCase(getPostsBySearch.pending, (state) => {
        //state.getPostsBySearch = "loading";
        state.getPostsStatus = "loading";
      })
      .addCase(getPostsBySearch.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.getPostsStatus = "success";
      })
      .addCase(getPostsBySearch.rejected, (state) => {
        state.getPostsStatus = "failed";
      })
      .addCase(createPost.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.createStatus = "success";
      })
      .addCase(createPost.rejected, (state) => {
        state.createStatus = "failed";
      })
      .addCase(updatePost.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const newPosts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        state.posts = newPosts;
        state.updateStatus = "success";
      })
      .addCase(updatePost.rejected, (state) => {
        state.updateStatus = "failed";
      })
      .addCase(deletePost.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deleteStatus = "success";
        const posts = state.posts.filter(
          (post) => post._id !== action.payload._id
        );
        state.posts = posts;
      })
      .addCase(deletePost.rejected, (state) => {
        state.deleteStatus = "failed";
      })
      .addCase(likePost.pending, (state) => {
        state.likeStatus = "loading";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.likeStatus = "success";
        const posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        state.posts = posts;
      })
      .addCase(likePost.rejected, (state) => {
        state.likeStatus = "failed";
      })
      .addCase(commentPost.pending, (state) => {
        state.commentStatus = "loading";
      })
      .addCase(commentPost.fulfilled, (state, action) => {
        state.commentStatus = "success";
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        });
      })
      .addCase(commentPost.rejected, (state) => {
        state.commentStatus = "failed";
      });
  },
});

export default postSlice.reducer;
