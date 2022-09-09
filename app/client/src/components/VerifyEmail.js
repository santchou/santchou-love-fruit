import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../features/api/user";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function VerifyEmail() {
  const history = useHistory();
  const inputRef = useRef();
  // const { signupStatus } = useSelector((state) => state.user);
  const emailVerify = useSelector((state) => state.emailVerify);
  const { userId } = useParams();

  const [codeInput, setCodeInput] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
  });
  const [index, setIndex] = useState(1);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(verifyEmail({ ...codeInput, userId }));
  };

  useEffect(() => {
    if (emailVerify?.verifyEmailStatus === "success") history.push("/auth");
  }, [emailVerify?.verifyEmailStatus, history]);

  const handleChange = (e) => {
    setIndex(index === 4 ? 1 : index + 1);
    setCodeInput({ ...codeInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [index]);

  return (
    <div className="flex justify-center mt-32 ">
      <div className=" border w-lg py-2 px-4 shadow-md rounded-md">
        <h1 className="font-medium text-2xl">
          Please erify your email to complete your signup. We send you PIN.
        </h1>
        {emailVerify?.verifyEmailStatus === "rejected" && (
          <p className="pt-4 text-red-400 text-center">
            {emailVerify?.verifyEmailError?.message}
          </p>
        )}

        <form className="space-x-2 mt-10 text-center" onSubmit={handleSubmit}>
          <input
            ref={index === 1 ? inputRef : null}
            type="text"
            className="border-4 border-slate-400 focus:outline-none focus:border-slate-700 w-12 h-12 text-center text-xl"
            maxLength="1"
            name="input1"
            value={codeInput.input1}
            onChange={handleChange}
          />
          <input
            ref={index === 2 ? inputRef : null}
            type="text"
            className="border-4 border-slate-400 focus:outline-none focus:border-slate-700 w-12 h-12 text-center text-xl"
            maxLength="1"
            name="input2"
            value={codeInput.input2}
            onChange={handleChange}
          />
          <input
            ref={index === 3 ? inputRef : null}
            type="text"
            className="border-4 border-slate-400 focus:outline-none focus:border-slate-700 w-12 h-12 text-center text-xl"
            maxLength="1"
            name="input3"
            value={codeInput.input3}
            onChange={handleChange}
          />
          <input
            ref={index === 4 ? inputRef : null}
            type="text"
            className="border-4 border-slate-400 focus:outline-none focus:border-slate-700 w-12 h-12 text-center text-xl"
            maxLength="1"
            name="input4"
            value={codeInput.input4}
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="block mt-10 mb-4 px-8 py-2 bg-slate-400 hover:bg-slate-500 rounded-md font-bold text-white"
            >
              {emailVerify?.verifyEmailStatus === "pending"
                ? "Send..."
                : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
