import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import { resetPassword } from "../features/api/user";
import { useDispatch, useSelector } from "react-redux";

function ResetPassword() {
  const RP = useSelector((state) => state.resetPassword);
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [removeResetPasswordMessage, setRemoveResetPasswordMessage] =
    useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setRemoveResetPasswordMessage(false);
  };

  const handleResetPassword = () => {
    const { token, id } = queryString.parse(location.search);
    dispatch(resetPassword({ token, id, ...passwordData }));
    setRemoveResetPasswordMessage(true);
  };

  //console.log(passwordData);

  useEffect(() => {
    if (RP?.resetStatus === "success") {
      history.push("/resetpasswordsuccess");
    }
  }, [RP?.resetStatus, history]);

  return (
    <div className="flex justify-center items-center w-full h-96">
      <div className="px-4 py-4 w-full sm:w-1/2 border-4 border-slate-100 space-y-4">
        <p className="text-center text-2xl text-slate-400 font-medium">
          Reset Password
        </p>
        {removeResetPasswordMessage && (
          <p className="text-center text-xl text-red-400 font-bold">
            {RP?.resetStatus === "rejected" ? RP?.resetError.message : null}
          </p>
        )}

        <label className="block">
          <span className="">Password</span>
          <input
            type="password"
            placeholder="*********"
            name="password"
            value={passwordData.password}
            onChange={handleChange}
            className="mt-3 w-full border border-slate-400 px-3 py-2 text-sm rounded-md placeholder:italic  placeholder-slate-400 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="">ConfirmPassword</span>
          <input
            type="password"
            placeholder="*********"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            className="mt-3 w-full border border-slate-400 px-3 py-2 text-sm rounded-md placeholder:italic  placeholder-slate-400 focus:outline-none"
          />
        </label>
        <div className="mt-4 w-full">
          <button
            onClick={handleResetPassword}
            className="w-full cursor-pointer px-4 py-2 bg-slate-600 hover:bg-slate-900 text-white font-bold rounded-md"
          >
            {RP?.resetStatus === "pending" ? " Sendind ..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
