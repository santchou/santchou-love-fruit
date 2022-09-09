import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

import { TailSpin } from "react-loader-spinner";

function Posts({ setCurrentId }) {
  const { posts, getPostsStatus } = useSelector((state) => state.posts);

  return getPostsStatus === "loading" ? (
    <div className="flex justify-center items-center h-full">
      <div className=" rounded-full bg-slate-200">
        <TailSpin height="100" width="100" color="green" ariaLabel="loading" />
      </div>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {posts?.map((post) => (
        <Post key={post._id} post={post} setCurrentId={setCurrentId} />
      ))}
    </div>
  );
}

export default Posts;
