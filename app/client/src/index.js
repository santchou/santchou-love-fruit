import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./features/app/store";

import "./index.css";
import App from "./App";

/* import { loadUser } from "./features/user/userSlice";

store.dispatch(loadUser()); */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
