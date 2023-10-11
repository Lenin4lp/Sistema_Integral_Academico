import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/home/Home.jsx";
import Courses from "./pages/courses/Courses.jsx";
import Library from "./pages/library/Library.jsx";
import Support from "./pages/support/Support.jsx";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./auth/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/cursos",
        element: <Courses />,
      },
      {
        path: "/biblioteca",
        element: <Library />,
      },
      {
        path: "/soporte",
        element: <Support />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
