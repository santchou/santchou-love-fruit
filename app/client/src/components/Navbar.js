import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import avocado from "./images/avocado.jpg";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadUser, logoutUser } from "../features/user/userSlice";
import { logoutUser2 } from "../features/verifyEmail/verifyemailSlice";
import { useLocation } from "react-router-dom";

import { getPostsBySearch } from "../features/api/post";

import jwt_decode from "jwt-decode";
import TextField from "./TextField";
//import Signup from "./Auth/Signup";

function Navbar() {
  const location = useLocation();
  const { authLoginData } = useSelector((state) => state.user);
  const [userLocalStorage, setUserLocalStorage] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(logoutUser2());
    history.push("/");
  };

  useEffect(() => {
    const token = userLocalStorage?.token;

    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
    setUserLocalStorage(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line
  }, [location, userLocalStorage?.token]);

  const handleSearch = () => {
    if (!search) {
      alert("Please enter search value");
    } else {
      dispatch(getPostsBySearch(search));
      history.push(`/posts/search?searchQuery=${search}`);
      setSearch("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      dispatch(getPostsBySearch(search));
      history.push(`/posts/search?searchQuery=${search}`);
      setSearch("");
    }
  };

  return (
    <header className="font-montserrat shadow-lg border-2 w-lg rounded-lg mt-2 mb-5 flex flex-row justify-between items-center px-2 sm:px-8 py-2">
      <div className="flex space-x-2 sm:space-x-4 justify-center items-center mr-4">
        <h2 className="text-green-700 font-bold text-xl sm:text-4xl">
          <Link to="/">Fruits</Link>
        </h2>
        <img
          src={avocado}
          alt="memories"
          className="h-4 ml-5 sm:h-8 sm:ml-5 animate-pulse"
        />
      </div>
      {userLocalStorage && (
        <div className="hidden lg:flex">
          <TextField
            type="text"
            value={search}
            setSearch={(e) => setSearch(e.target.value)}
            className="outline-none w-full mx-2"
            placeholder="Enter fruit or vegetable name"
            handleKeyPress={handleKeyPress}
            handleSearch={handleSearch}
          />
        </div>
      )}
      <div>
        {authLoginData ? (
          <div className="flex justify-center items-center space-x-4 sm:space-x-4">
            {authLoginData?.result?.imageUrl ? (
              <img
                src={authLoginData.result.imageUrl}
                alt="profile"
                className="w-8 h-8 rounded-full mr-4"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-red-500 text-white flex justify-center items-center">
                {authLoginData?.result?.name.charAt(0)}
              </div>
            )}
            <p className="text-xs sm:text-base">
              {authLoginData?.result?.name.split(" ")[0]}
            </p>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="text-green-700 font-bold hover:text-green-600 ">
              SIGN IN
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
