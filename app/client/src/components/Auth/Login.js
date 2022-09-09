import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { login } from "../../features/api/user";
import { Link, useHistory } from "react-router-dom";

import { LockClosedIcon } from "@heroicons/react/outline";
import { EyeOffIcon, EyeIcon } from "@heroicons/react/outline";

//import Navbar from "../Navbar";
//import ForgorPassword from "../ForgorPassword";

function Login() {
  const { loginStatus, authLoginData, loginError } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (authLoginData) history.push("/");
  }, [authLoginData, history]);

  return (
    <>
      {/* <Navbar /> */}

      <div className="flex justify-center w-full">
        <div className="w-96 py-6 px-4 shadow-lg border-4 border-slate-100 rounded-md">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-green-700 rounded-full flex justify-center items-center">
              <LockClosedIcon className="h-8 text-white" />
            </div>
            <div className="font-bold text-2xl">Sign In</div>
          </div>
          <div className="text-red-500 text-center mt-4 font-medium">
            {loginStatus === "rejected" && loginError?.message}
          </div>
          <form className="space-y-2 mb-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-slate-700 after:content-['*'] after:text-red-500 after:ml-0.5 after:font-bold">
                Email
              </span>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="px-3 py-2 w-full text-sm border border-slate-300 shadow-sm rounded-md placeholder:italic placeholder-slate-400 focus:outline-none hover:border-sky-500 hover:ring-1 transition duration-200 ease-in-out"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700 after:content-['*'] after:text-red-500 after:ml-0.5 after:font-bold">
                Password
              </span>

              <div className="flex items-center border border-slate-300 rounded-md shadow-sm hover:border-sky-500 hover:ring-1 transition duration-200 ease-in-out">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="px-3 py-2 w-full text-sm rounded-md placeholder:italic  placeholder-slate-400 focus:outline-none"
                />

                {showPassword ? (
                  <EyeIcon className="h-4 mr-4" onClick={handleShowPassword} />
                ) : (
                  <EyeOffIcon
                    className="h-4 mr-4"
                    onClick={handleShowPassword}
                  />
                )}
              </div>
            </label>
            {loginStatus === "pending" ? (
              <button className="ml-2 bg-green-200 hover:bg-green-100 px-2 py-2 w-full rounded-md text-white font-bold text-xs cursor-not-allowed">
                Sign In
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-600 text-white w-full rounded-md mt-4 py-2 mb-4 font-medium"
              >
                Sign In
              </button>
            )}
          </form>
          <div className="flex justify-center items-center gap-x-3">
            <hr className="bg-slate-300 w-full" />
            <span className="text-slate-500 font-bold">or</span>
            <hr className="bg-slate-300 w-full" />
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white w-full rounded-md mt-4 py-2 mb-4 font-medium"
            onClick={() =>
              setFormData({
                ...formData,
                email: "guestuser@gmail.com",
                password: "test1234",
              })
            }
          >
            Sign In as Guest User
          </button>
          <span className="text-slate-400 font-medium">
            Don't have an account?
          </span>
          <Link to="/signup">
            <button className="ml-2 cursor-pointer bg-green-700 hover:bg-green-600 px-2 py-1 rounded-md text-white font-bold text-xs">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
