import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import Book from "../components/Book";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: ":bookId",
        element: <Book />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);
