import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { commentPost } from "../features/api/post";

function CommentSection({ post }) {
  //const { posts } = useSelector((state) => state.posts);
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  const dispatch = useDispatch();
  const commentRefs = useRef();

  const handleClick = async () => {
    if (user) {
      const finalComment = user?.result?.name + ": " + comment;

      const newComments = await dispatch(
        commentPost({ comment: finalComment, id: post._id })
      );

      setComments(newComments?.payload?.comments);
      setComment(" ");
    } else {
      history.push("/login");
    }

    commentRefs.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="flex flex-col-reverse md:flex md:flex-row pt-4">
      <div className="w-full mr-2">
        <p className="text-2xl my-4 text-slate-300">Comments</p>
        <div className="h-[200px] overflow-auto">
          {comments?.map((c, i) => (
            <p key={i}>
              <strong>{c.split(": ")[0]}</strong> {c.split(":")[1]}
            </p>
          ))}

          <div ref={commentRefs} />
        </div>
      </div>
      <div className="w-full">
        <textarea
          name=""
          id=""
          cols="20"
          rows="5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave your comment"
          className="border-2 w-full pl-2 pt-2"
        ></textarea>
        <button
          disabled={!comment}
          className={`border-2 w-full ${comment && "bg-slate-500"} `}
          onClick={handleClick}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default CommentSection;
