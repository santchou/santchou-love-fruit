import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

function TextField({ type, value, setSearch, handleKeyPress, handleSearch }) {
  return (
    <div className="flex justify-center items-center border-2 border-green-400 rounded-md w-[300px] transition-[width] duration-200 ease-in transform hover:w-[400px]">
      <input
        type={type}
        value={value}
        onChange={setSearch}
        className="outline-none w-full mx-2"
        placeholder="Enter fruit or vegetable name"
        onKeyDown={handleKeyPress}
      />
      <SearchIcon
        className="w-8 h-8 rounded-full border-2 bg-green-500 hover:bg-green-600 cursor-pointer text-white"
        onClick={handleSearch}
      />
    </div>
  );
}

export default TextField;
