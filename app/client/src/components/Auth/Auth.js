import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

import { useDispatch, useSelector } from "react-redux";
import { googleSignup } from "../../features/user/userSlice";
import { login, signup } from "../../features/api/user";
import { useHistory, Link } from "react-router-dom";

import { LockClosedIcon } from "@heroicons/react/outline";
import { EyeOffIcon, EyeIcon } from "@heroicons/react/outline";
import { RefreshIcon } from "@heroicons/react/outline";
import Navbar from "../Navbar";
import ForgorPassword from "../ForgorPassword";

function Auth() {
  const auth = useSelector((state) => state.user);

  const emailVerify = useSelector((state) => state.emailVerify);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignUp, setIsSignIn] = useState(false);
  const [liginSignupMessage, setloginSignupMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [displayEmailPassword, setDisplayEmailPassword] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleDisplayEmailPassword = () => {
    setDisplayEmailPassword(!displayEmailPassword);
  };

  const handleSignIn = () => {
    setIsSignIn(!isSignUp);
  };

  const handleShowPassword = () => {
    setShowPassword(false);
  };

  const handleMaskPassword = () => {
    setShowPassword(true);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(false);
  };

  const handleMaskConfirmPassword = () => {
    setShowConfirmPassword(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setloginSignupMessage(true);

    if (isSignUp) {
      dispatch(signup(formData));
    } else {
      dispatch(login(formData));
    }
  };

  useEffect(() => {
    if (auth?.signupStatus === "success" && !emailVerify?.verifyEmailData) {
      history.push(`/users/${auth?.authSignupData?.result?._id}/verify-email`);
    } else if (auth?.loginStatus === "success") {
      history.push("/");
    }
  }, [
    auth?.authSignupData?.result?._id,
    auth?.signupStatus,
    auth?.loginStatus,
    emailVerify?.verifyEmailData,
    history,
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setloginSignupMessage(false);
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

  return (
    <>
      <Navbar />

      <div className="flex justify-center w-full ">
        <div className="w-96 py-6 px-4 shadow-lg border-4 border-slate-100 rounded-md">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center">
              <LockClosedIcon className="h-8 text-white" />
            </div>
            <div className="font-bold text-2xl">
              {isSignUp ? "Sign up" : "Sign in"}
            </div>
          </div>
          {liginSignupMessage &&
            (auth?.loginStatus === "rejected" ? (
              isSignUp ? null : (
                <div className="p-4 my-4 rounded-md bg-slate-100 text-red-400 font-medium text-center text-lg">
                  <p className="mb-2">{auth?.loginError?.message}</p>
                  {auth?.loginError?.link && (
                    <Link to={`/users/${auth?.loginError?.link}/verify-email`}>
                      <span className="mt-2 text-red-800 text-xl font-bold px-4 py-1 bg-red-200 hover:bg-red-100 rounded-md">
                        Here
                      </span>
                    </Link>
                  )}
                </div>
              )
            ) : null)}

          {liginSignupMessage &&
            (auth?.signupStatus === "rejected" ? (
              isSignUp ? (
                <p className="p-4 m-2 rounded-md bg-slate-100 text-red-400 font-medium text-center text-lg">
                  {auth?.signupError?.message}
                </p>
              ) : null
            ) : null)}

          <form className="space-y-2 mb-8" onSubmit={handleSubmit}>
            {isSignUp && (
              <>
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
              </>
            )}
            <label className="block">
              <span className="text-sm font-medium text-slate-700 after:content-['*'] after:text-red-500 after:ml-0.5 after:font-bold">
                Email
              </span>
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="px-3 py-2 w-full text-sm border border-slate-300 shadow-sm rounded-md placeholder:italic placeholder-slate-400 focus:outline-none hover:border-sky-500 hover:ring-1 transition duration-200 ease-in-out"
            />
            <label className="block">
              <span className="text-sm font-medium text-slate-700 after:content-['*'] after:text-red-500 after:ml-0.5 after:font-bold">
                Password
              </span>
            </label>
            <div className="flex items-center border border-slate-300 rounded-md shadow-sm hover:border-sky-500 hover:ring-1 transition duration-200 ease-in-out">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="px-3 py-2 w-full text-sm rounded-md placeholder:italic  placeholder-slate-400 focus:outline-none"
              />
              {/* {isSignUp && */}
              {showPassword ? (
                <EyeIcon className="h-4 mr-4" onClick={handleShowPassword} />
              ) : (
                <EyeOffIcon className="h-4 mr-4" onClick={handleMaskPassword} />
              )}
            </div>
            {isSignUp && (
              <>
                <label htmlFor="" className="block">
                  <span className="text-sm font-medium text-slate-700 after:content-['*'] after:text-red-500 after:ml-0.5 after:font-bold">
                    Confirm password
                  </span>
                </label>
                <div className="flex items-center border border-slate-300 rounded-md shadow-sm hover:border-sky-500 hover:ring-1 transition duration-200 ease-in-out">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="px-3 py-2  w-full text-sm rounded-md  placeholder:italic  placeholder-slate-400 focus:outline-none"
                  />
                  {isSignUp &&
                    (showConfirmPassword ? (
                      <EyeIcon
                        className="h-4 mr-4"
                        onClick={handleShowConfirmPassword}
                      />
                    ) : (
                      <EyeOffIcon
                        className="h-4 mr-4"
                        onClick={handleMaskConfirmPassword}
                      />
                    ))}
                </div>
              </>
            )}
            {!isSignUp && (
              <div className="py-2 flex justify-end">
                <span
                  onClick={handleDisplayEmailPassword}
                  className=" font-medium text-slate-300 text-xl cursor-pointer"
                >
                  Forget password
                </span>
              </div>
            )}
            {auth?.userStatus === "pending" ? (
              <button
                type="button"
                className="bg-blue-500 w-full text-white font-medium"
                disabled
              >
                <RefreshIcon className="animate-spin h-6 inline mr-4" />

                {isSignUp ? "Sign up... " : "Sign in..."}
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white w-full rounded-md mt-4 py-2 mb-4 font-medium"
              >
                {isSignUp ? "Sign up " : "Sign in"}
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
                  className="bg-blue-500 hover:bg-blue-600 text-white w-full rounded-md mt-4 py-2 mb-4 font-medium"
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
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button
            className="ml-2 cursor-pointer bg-blue-100 hover:bg-blue-200 px-2 py-2 rounded-md text-blue-800 font-medium text-xs"
            onClick={handleSignIn}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
      </div>
      {displayEmailPassword && (
        <ForgorPassword
          handleDisplayEmailPassword={handleDisplayEmailPassword}
          setDisplayEmailPassword={setDisplayEmailPassword}
          displayEmailPassword={displayEmailPassword}
        />
      )}
    </>
  );
}

export default Auth;
