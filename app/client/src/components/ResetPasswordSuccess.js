import React from "react";
import { Link } from "react-router-dom";

function ResetPasswordSuccess() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="text-center space-y-8 -mt-96 border-2 border-slate-100 px-60 py-36 shadow-lg shadow-green-200">
        <p className="text-4xl text-slate-500 font-bold">
          Reset Password Successful
        </p>
        <button className="text-2xl text-green-500 font-bold bg-slate-100 px-4 py-2 rounded-md">
          <Link to="/auth">Login</Link>
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordSuccess;
