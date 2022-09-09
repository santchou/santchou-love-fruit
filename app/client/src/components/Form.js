import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../features/api/post";
import FileBase from "react-file-base64";
import avocado from "./images/avocado.jpg";

import { useSelector } from "react-redux";

function Form({ currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const { posts, createStatus, updateStatus } = useSelector(
    (state) => state.posts
  );
  const { authLoginData } = useSelector((state) => state.user);

  const post = posts?.find((p) => (currentId ? p._id === currentId : null));

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: authLoginData?.result?.name }));
    } else {
      dispatch(
        updatePost({
          currentId,
          ...postData,
          name: authLoginData?.result?.name,
        })
      );
    }
    clear();
  };

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      selectedFile: "",
    });
  };

  if (!authLoginData?.result?.name) {
    return (
      <div className="flex flex-col shadow-lg ml-2">
        <p className="text-slate-900 fond-bold py-6 px-4 my-4 text-xl">
          <strong>Please</strong> Sign In to post your own fruit or vegetable
          and like's others.
        </p>
        <strong className="text-center text-xl animate-pulse">
          You can delete only your post
        </strong>
        <div className="relative flex justify-center inset-x-0 mt-12">
          <img
            src={avocado}
            alt="avocado"
            className="h-40 w-40 rounded-full animate-bounce"
          />
          <p className="absolute bottom-10 text-center text-white">Avocado</p>
        </div>
        <p className="text-center font-bold mb-4">Good for brain</p>
      </div>
    );
  }
  return (
    <div className="shadow-lg px-2 py-4 rounded-lg">
      <form onSubmit={handleSubmit} className="mt-4 mb-4">
        <h6 className="text-center text-2xl mb-4 text-slate-500">
          <strong>{currentId ? "Updating" : "Post"} </strong> your loved fruits
          or vegetables
        </h6>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            Fruit or vegetable Title
          </span>

          <input
            type="text"
            value={postData.title}
            name="title"
            required
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition duration-500 ease-in-out"
            placeholder="Enter fruit or vegetable name"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            Fruit or vegetable description
          </span>
          <textarea
            value={postData.message}
            name="message"
            required
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition duration-500
        ease-in-out"
            rows="3"
            placeholder="Your description"
          ></textarea>
        </label>
        <div
          className="mt-2 block text-slate-500
      mr-4 py-2 px-4
      rounded-full border-0
      text-sm font-semibold
      bg-violet-50text-violet-700
    bg-violet-100"
        >
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>

        {!currentId ? (
          <div className="flex">
            {createStatus === "loading" ? (
              <button
                type="submit"
                className="bg-sky-200 hover:bg-sky-300  mb-2 mt-2 rounded-lg p-1 text-white w-full cursor-not-allowed"
              >
                SUBMITING...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700  mb-2 mt-2 rounded-lg p-1 text-white w-full "
              >
                SUBMIT
              </button>
            )}
          </div>
        ) : (
          <div className="flex">
            {updateStatus === "loading" ? (
              <button
                type="submit"
                className="bg-sky-200 hover:bg-sky-300  mb-2 mt-2 rounded-lg p-1 text-white w-full cursor-not-allowed"
              >
                EDITING...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700  mb-2 mt-2 rounded-lg p-1 text-white w-full "
              >
                EDIT
              </button>
            )}
          </div>
        )}
      </form>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 rounded-lg p-1 text-white w-full"
          onClick={clear}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
}

export default Form;
