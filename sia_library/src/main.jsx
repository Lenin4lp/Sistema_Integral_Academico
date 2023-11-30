import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import { Suspense } from "react";

import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./auth/AuthProvider";
const LazyHome = React.lazy(() => import("./pages/home/Home.jsx"));
const LazyCourses = React.lazy(() => import("./pages/courses/Courses.jsx"));
const LazyLibrary = React.lazy(() => import("./pages/library/Library.jsx"));
const LazySupport = React.lazy(() => import("./pages/support/Support.jsx"));
const LazyCourseInfo = React.lazy(() =>
  import("./pages/courses/CourseInfo.jsx")
);
const LazyProfile = React.lazy(() => import("./pages/profile/Profile.jsx"));
const LazyModify = React.lazy(() => import("./pages/profile/Modify.jsx"));
const LazyModifyGrades = React.lazy(() =>
  import("./pages/courses/ModifyGrades.jsx")
);

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
        element: (
          <Suspense
            fallback={
              <>
                <div className="flex justify-center items-center w-screen h-screen bg-white">
                  <div className="block">
                    <div className="w-20 h-20 rounded-full animate-spin border-x-[3px] border-solid border-[#146898] border-t-transparent shadow-md"></div>
                    <h4 className=" text-center text-[#146898]  font-semibold mt-5">
                      Cargando...
                    </h4>
                  </div>
                </div>
              </>
            }
          >
            <LazyHome />
          </Suspense>
        ),
      },
      {
        path: "/cursos",
        element: (
          <Suspense
            fallback={
              <>
                fallback=
                {
                  <>
                    <div className="flex justify-center items-center w-screen h-screen bg-white">
                      <div className="block">
                        <div className="w-20 h-20 rounded-full animate-spin border-x-[3px] border-solid border-[#146898] border-t-transparent shadow-md"></div>
                        <h4 className=" text-center text-[#146898]  font-semibold mt-5">
                          Cargando...
                        </h4>
                      </div>
                    </div>
                  </>
                }
              </>
            }
          >
            <LazyCourses />
          </Suspense>
        ),
      },
      {
        path: "/biblioteca",
        element: (
          <Suspense
            fallback={
              <>
                <>
                  <div className="flex justify-center items-center w-screen h-screen bg-white">
                    <div className="block">
                      <div className="w-20 h-20 rounded-full animate-spin border-x-[3px] border-solid border-[#146898] border-t-transparent shadow-md"></div>
                      <h4 className=" text-center text-[#146898]  font-semibold mt-5">
                        Cargando...
                      </h4>
                    </div>
                  </div>
                </>
              </>
            }
          >
            <LazyLibrary />
          </Suspense>
        ),
      },
      {
        path: "/cursos/:id",
        element: (
          <Suspense
            fallback={
              <>
                <>
                  <div className="flex justify-center items-center w-screen h-screen bg-white">
                    <div className="block">
                      <div className="w-20 h-20 rounded-full animate-spin border-x-[3px] border-solid border-[#146898] border-t-transparent shadow-md"></div>
                      <h4 className=" text-center text-[#146898]  font-semibold mt-5">
                        Cargando...
                      </h4>
                    </div>
                  </div>
                </>
              </>
            }
          >
            <LazyCourseInfo />
          </Suspense>
        ),
      },
      {
        path: "/cursos/:id/:gradeId",
        element: (
          <Suspense
            fallback={
              <>
                <>
                  <div className="flex justify-center items-center w-screen h-screen bg-white">
                    <div className="block">
                      <div className="w-20 h-20 rounded-full animate-spin border-x-[3px] border-solid border-[#146898] border-t-transparent shadow-md"></div>
                      <h4 className=" text-center text-[#146898]  font-semibold mt-5">
                        Cargando...
                      </h4>
                    </div>
                  </div>
                </>
              </>
            }
          >
            <LazyModifyGrades />
          </Suspense>
        ),
      },
      {
        path: "/soporte",
        element: (
          <Suspense
            fallback={
              <>
                <>
                  <div className="flex justify-center items-center w-screen h-screen bg-white">
                    <div className="block">
                      <div className="w-20 h-20 rounded-full animate-spin border-x-[3px] border-solid border-[#146898] border-t-transparent shadow-md"></div>
                      <h4 className=" text-center text-[#146898]  font-semibold mt-5">
                        Cargando...
                      </h4>
                    </div>
                  </div>
                </>
              </>
            }
          >
            <LazySupport />
          </Suspense>
        ),
      },
      {
        path: "/perfil",
        element: (
          <Suspense
            fallback={
              <>
                fallback=
                {
                  <>
                    <div className="flex justify-center items-center w-screen h-screen bg-white">
                      <div className="block">
                        <div className="w-20 h-20 rounded-full animate-spin border-x-[3px] border-solid border-[#146898] border-t-transparent shadow-md"></div>
                        <h4 className=" text-center text-[#146898]  font-semibold mt-5">
                          Cargando...
                        </h4>
                      </div>
                    </div>
                  </>
                }
              </>
            }
          >
            <LazyProfile />
          </Suspense>
        ),
      },
      {
        path: "/perfil/modificar",
        element: (
          <Suspense
            fallback={
              <>
                <>
                  <div className="flex justify-center items-center w-screen h-screen bg-white">
                    <div className="block">
                      <div className="w-20 h-20 rounded-full animate-spin border-x-[3px] border-solid border-[#146898] border-t-transparent shadow-md"></div>
                      <h4 className=" text-center text-[#146898]  font-semibold mt-5">
                        Cargando...
                      </h4>
                    </div>
                  </div>
                </>
              </>
            }
          >
            <LazyModify />
          </Suspense>
        ),
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
