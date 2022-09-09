import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../features/api/user";
import { useHistory } from "react-router-dom";

function ForgorPassword({
  handleDisplayEmailPassword,
  setDisplayEmailPassword,
  displayEmailPassword,
}) {
  const dispatch = useDispatch();
  const [email, setEmailPassword] = useState("");
  const EP = useSelector((state) => state.forgotPassword);
  const history = useHistory();

  const handleForgetPassword = () => {
    //const email = { emailpassword };
    dispatch(forgotPassword({ email }));
    //console.log(emailpassword);
  };

  useEffect(() => {
    if (EP?.emailStatus === "success") {
      setDisplayEmailPassword(!displayEmailPassword);
      history.push("/resetPasswordMessage");
    }
  }, [
    dispatch,
    setDisplayEmailPassword,
    displayEmailPassword,
    EP?.emailStatus,
    history,
  ]);
  //console.log(FP);
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="bg-slate-100 mx-4 w-full md:w-1/2 shadow-md rounded-md px-4 py-4 border-2 border-slate-300">
        <div className="flex justify-end">
          <svg
            onClick={handleDisplayEmailPassword}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        {EP?.emailStatus === "rejected" ? (
          <p className="text-red-400 font-bold my-2 text-center">
            {EP?.emailError?.message}
          </p>
        ) : null}
        <p className="text-center m-8 text-xl text-slate-500 font-medium">
          Forget password
        </p>
        <label className="block">
          <span className="">Email</span>
          <input
            type="email"
            placeholder="Enter your email"
            //value={email}
            onChange={(e) => setEmailPassword(e.target.value)}
            className="mt-3 w-full border border-slate-400 px-3 py-2 text-sm rounded-md placeholder:italic  placeholder-slate-400 focus:outline-none"
          />
        </label>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleForgetPassword}
            className="cursor-pointer px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded-md"
          >
            {EP?.emailStatus === "pending" ? "Sending ..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgorPassword;
