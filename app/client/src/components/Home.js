import { useState } from "react";
import Posts from "./Posts/Posts";
import Form from "./Form";
import { useHistory, useLocation } from "react-router-dom";
import PaginationOutlined from "./Pagination";
import { useEffect } from "react";
import { getPosts, getPostsBySearch } from "../features/api/post";
import { useDispatch } from "react-redux";
import TextField from "./TextField";

function Home() {
  const user = localStorage.getItem("profile");
  const location = useLocation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const history = useHistory();

  const query = new URLSearchParams(location.search);

  const page = parseInt(query.get("page") || "1");

  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page, dispatch]);

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
    <>
      {user && (
        <div className="flex justify-center my-4 lg:hidden">
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
      <main className="font-montserrat border-2 border-slate-100 shadow-lg rounded-lg">
        <div className="flex flex-col-reverse md:flex md:flex-row">
          <div className="w-full md:w-3/4">
            <Posts setCurrentId={setCurrentId} />
          </div>
          <div className="w-full md:w-1/4">
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </div>
        </div>
      </main>
      <footer className="flex justify-center mt-8 px-4 py-2 rounded-md shadow-md shadow-lime-200">
        <PaginationOutlined page={page} />
      </footer>
    </>
  );
}

export default Home;
