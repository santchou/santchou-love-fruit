// import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import VerifyEmail from "./components/VerifyEmail";
import ResetPassword from "./components/ResetPassword";
import ResetPasswordMessage from "./components/ResetPasswordMessage";
import ResetPasswordSuccess from "./components/ResetPasswordSuccess";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import PostDetails from "./components/PostDetails";
import { useSelector } from "react-redux";
import Message from "./components/Message";
import Navbar from "./components/Navbar";

function App() {
  const { authLoginData } = useSelector((state) => state.user);
  return (
    <div className="p-2">
      <BrowserRouter>
        <Message />
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route
            path="/signup"
            exact
            component={() =>
              authLoginData ? <Redirect to="/posts" /> : <Signup />
            }
          />
          <Route
            path="/login"
            exact
            component={() =>
              authLoginData ? <Redirect to="/posts" /> : <Login />
            }
          />
          <Route
            path="/users/:userId/verify-email"
            exact
            component={VerifyEmail}
          />
          <Route path="/reset-password" exact component={ResetPassword} />
          <Route
            path="/resetPasswordMessage"
            exact
            component={ResetPasswordMessage}
          />
          <Route
            path="/resetpasswordsuccess"
            exact
            component={ResetPasswordSuccess}
          />
          resetpasswordsuccess
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
