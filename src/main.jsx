import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import QuizList from "./components/QuizList.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuizList />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
