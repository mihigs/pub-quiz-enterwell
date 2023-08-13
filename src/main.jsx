import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import QuizList from "./components/QuizList.jsx";
import QuizForm from "./components/QuizForm.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import PreviewQuiz from "./components/PreviewQuiz.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <QuizList />,
  },
  {
    path: "/quiz/:quizId/edit",
    element: <QuizForm />,
  },
  {
    path: "/quiz/:quizName/new",
    element: <QuizForm isNewQuiz={true}/>,
  },
  {
    path: "/quiz/:quizId/preview",
    element: <PreviewQuiz />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

export { store };
