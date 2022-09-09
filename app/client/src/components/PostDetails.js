import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams } from "react-router-dom";

import { getPost, getPostsBySearch } from "../features/api/post";
import { TailSpin } from "react-loader-spinner";
import Img from "./cloudinary/Img";
import CommentSection from "./CommentSection";

function PostDetails() {
  const { post, posts, getPostStatus } = useSelector((state) => state.posts);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(getPostsBySearch(post.title));
  }, [post, dispatch]);

  const recommendedPosts = posts?.filter(
    (postItem) => postItem._id !== post._id
  );

  return getPostStatus === "loading" ? (
    <div className="flex justify-center items-center h-full">
      <div className=" rounded-full bg-slate-200">
        <TailSpin height="100" width="100" color="green" ariaLabel="loading" />
      </div>
    </div>
  ) : (
    <>
      <div className="md:flex w-full  shadow-lg p-4 space-x-4 rounded-lg min-h-[400px]">
        <div className="md:w-2/3 space-y-2 divide-y divide-dashed">
          <div className="">
            <h2 className="font-bold text-3xl">{post.title}</h2>
            <p className="text-xs text-slate-400">{post.message}</p>
            <h6>
              Created by: <strong>{post.name}</strong>{" "}
            </h6>
            <h6 className="text-slate-300">
              {moment(post.createAt).fromNow()}
            </h6>
            {/* divder */}
          </div>
          <CommentSection post={post} />
        </div>

        <div className="w-full md:w-1/3 my-4">
          <Img public_id={post.selectedFile} height={200} />
        </div>
      </div>
      {recommendedPosts.length !== 0 && (
        <div>
          {recommendedPosts.map(
            ({ title, message, name, selectedFile, createAt, _id }) => (
              <div
                key={_id}
                className="flex w-full shadow-lg p-4 space-x-4 rounded-lg h-[400px]"
              >
                <div className="w-1/2">
                  <Img public_id={selectedFile} height={200} />
                </div>
                <div className="w-1/2 space-y-2">
                  <h2 className="font-bold text-3xl">
                    Another benefits of {title}
                  </h2>
                  <p className="text-xs text-slate-400">{message}</p>
                  <h6>
                    Post by: <strong>{name}</strong>{" "}
                  </h6>
                  <h6 className="text-slate-300">
                    {moment(createAt).fromNow()}
                  </h6>
                  {/* divder */}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}

export default PostDetails;
