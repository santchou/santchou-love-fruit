import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

import { useDispatch, useSelector } from "react-redux";
import { googleSignup } from "../../features/user/userSlice";
import { signup } from "../../features/api/user";
import { Link, useHistory } from "react-router-dom";

import { LockClosedIcon } from "@heroicons/react/outline";
import { EyeOffIcon, EyeIcon } from "@heroicons/react/outline";

function Signup() {
  const { signupStatus, authSignupData, signupError } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    dispatch(signup(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId:
          "864588080259-dke964hfs7pdlsfv3ot6ove9sms9sj7g.apps.googleusercontent.com",
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  const googleSuccess = (response) => {
    const result = response?.profileObj;
    const token = response?.tokenId;

    try {
      dispatch(googleSignup({ result, token }));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google sign in is unsuccessful. try again");
  };

  useEffect(() => {
    if (authSignupData) history.push("/login");
  }, [authSignupData, history]);

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="w-96 py-6 px-4 shadow-lg border-4 border-slate-100 rounded-md">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-green-700 rounded-full flex justify-center items-center">
              <LockClosedIcon className="h-8 text-white" />
            </div>
            <div className="font-bold text-2xl">Sign up</div>
          </div>
          <div className="text-red-500 text-center mt-4 font-medium">
            {signupStatus === "rejected" && signupError.message}
          </div>
          <form className="space-y-2 mb-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-medium text-slate-700 after:content-['*'] after:text-red-500 after:ml-0.5 after:font-bold">
                FirstName
              </span>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your firstName"
                className="mt-2 border border-slate-300 px-3 py-2 rounded-md w-full text-sm shadow-sm  placeholder:italic placeholder-slate-400 focus:outline-none hover:border-sky-500 hover:ring-1 transition duration-200 ease-in-out"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700 after:content-['*'] after:text-red-500 after:ml-0.5 after:font-bold">
                LastName
              </span>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your lastName"
                className="mt-2 border border-slate-300 px-3 py-2 rounded-md w-full text-sm shadow-sm  placeholder:italic placeholder-slate-400 focus:outline-none hover:border-sky-500 hover:ring-1 transition duration-200 ease-in-out"
              />
            </label>

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
            <label htmlFor="" className="block">
              <span className="text-sm font-medium text-slate-700 after:content-['*'] after:text-red-500 after:ml-0.5 after:font-bold">
                Confirm password
              </span>

              <div className="flex items-center border border-slate-300 rounded-md shadow-sm hover:border-sky-500 hover:ring-1 transition duration-200 ease-in-out">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="px-3 py-2  w-full text-sm rounded-md  placeholder:italic  placeholder-slate-400 focus:outline-none"
                />

                {showConfirmPassword ? (
                  <EyeIcon
                    className="h-4 mr-4"
                    onClick={handleShowConfirmPassword}
                  />
                ) : (
                  <EyeOffIcon
                    className="h-4 mr-4"
                    onClick={handleShowConfirmPassword}
                  />
                )}
              </div>
            </label>
            {signupStatus === "pending" ? (
              <button className="ml-2 bg-green-200 hover:bg-green-100 px-2 py-2 w-full rounded-md text-white font-bold text-xs cursor-not-allowed">
                Sign up
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-600 text-white w-full rounded-md mt-4 py-2 mb-4 font-medium"
              >
                Sign up
              </button>
            )}

            <div className="flex justify-center items-center gap-x-3">
              <hr className="bg-slate-300 w-full" />
              <span className="text-slate-500 font-bold">or</span>
              <hr className="bg-slate-300 w-full" />
            </div>

            <GoogleLogin
              clientId="864588080259-dke964hfs7pdlsfv3ot6ove9sms9sj7g.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="bg-green-500 hover:bg-green-700 text-white w-full rounded-md mt-4 py-2 mb-4 font-medium"
                >
                  Sign in with Google
                </button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
            />
          </form>
          <span className="text-slate-400 font-medium">
            Already have an account?
          </span>
          <Link to="/login">
            <button className="ml-2 cursor-pointer bg-green-700 hover:bg-green-600 px-2 py-1 rounded-md text-white font-bold text-xs">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Signup;
