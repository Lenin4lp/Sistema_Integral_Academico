import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import { Suspense } from "react";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./auth/AuthProvider";
import AdminRoutes from "./pages/AdminRoutes.jsx";
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
const LazyDashboard = React.lazy(() =>
  import("./pages/admin/dashboard/Dashboard.jsx")
);
const LazyUsers = React.lazy(() => import("./pages/admin/users/Users.jsx"));
const LazyDegrees = React.lazy(() =>
  import("./pages/admin/degrees/Degrees.jsx")
);
const LazySubjects = React.lazy(() =>
  import("./pages/admin/subjects/Subjects.jsx")
);
const LazyBooks = React.lazy(() => import("./pages/admin/library/Books.jsx"));
const LazyModifyUsers = React.lazy(() =>
  import("./pages/admin/users/ModifyUser.jsx")
);
const LazyRegisterUser = React.lazy(() =>
  import("./pages/admin/users/RegisterUser.jsx")
);
const LazyModifyDegree = React.lazy(() =>
  import("./pages/admin/degrees/ModifyDegree.jsx")
);
const LazyRegisterDegree = React.lazy(() =>
  import("./pages/admin/degrees/RegisterDegree.jsx")
);
const LazySubjectInfo = React.lazy(() =>
  import("./pages/admin/subjects/SubjectInfo.jsx")
);
const LazyRegisterSubject = React.lazy(() =>
  import("./pages/admin/subjects/RegisterSubject.jsx")
);
const LazyRegisterPeriod = React.lazy(() =>
  import("./pages/admin/periods/RegisterPeriod.jsx")
);
const LazyModifyPeriod = React.lazy(() =>
  import("./pages/admin/periods/ModifyPeriod.jsx")
);
const LazyGroupInfo = React.lazy(() =>
  import("./pages/admin/groups/GroupInfo.jsx")
);
const LazyRegisterGroup = React.lazy(() =>
  import("./pages/admin/groups/RegisterGroup.jsx")
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
  {
    path: "/",
    element: <AdminRoutes />,
    children: [
      {
        path: "/admin/dashboard",
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
            <LazyDashboard />
          </Suspense>
        ),
      },
      {
        path: "/admin/usuarios",
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
            <LazyUsers />
          </Suspense>
        ),
      },
      {
        path: "/admin/usuarios/:userId",
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
            <LazyModifyUsers />
          </Suspense>
        ),
      },
      {
        path: "/admin/usuarios/registrar",
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
            <LazyRegisterUser />
          </Suspense>
        ),
      },
      {
        path: "/admin/grupos/registrar",
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
            <LazyRegisterGroup />
          </Suspense>
        ),
      },
      {
        path: "/admin/grupos/:groupId2",
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
            <LazyGroupInfo />
          </Suspense>
        ),
      },
      {
        path: "/admin/carreras",
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
            <LazyDegrees />
          </Suspense>
        ),
      },
      {
        path: "/admin/carreras/:degreeId",
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
            <LazyModifyDegree />
          </Suspense>
        ),
      },
      {
        path: "/admin/carreras/registrar",
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
            <LazyRegisterDegree />
          </Suspense>
        ),
      },
      {
        path: "/admin/periodos/registrar",
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
            <LazyRegisterPeriod />
          </Suspense>
        ),
      },
      {
        path: "/admin/periodos/:periodId",
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
            <LazyModifyPeriod />
          </Suspense>
        ),
      },
      {
        path: "/admin/materias",
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
            <LazySubjects />
          </Suspense>
        ),
      },
      {
        path: "/admin/materias/:subjectId2",
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
            <LazySubjectInfo />
          </Suspense>
        ),
      },
      {
        path: "/admin/materias/registrar",
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
            <LazyRegisterSubject />
          </Suspense>
        ),
      },
      {
        path: "/admin/biblioteca",
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
            <LazyBooks />
          </Suspense>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <div className="">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  </React.StrictMode>
);
