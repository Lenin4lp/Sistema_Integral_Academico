import React, { useEffect, useState } from "react";
import { getUsers } from "../../../api/user";
import { Link } from "react-router-dom";                            

function Users() {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersTable, setUsersTable] = useState([]);
  const [search, setSearch] = useState("");
  

  const getUsersList = async () => {
    try {
      const res = await getUsers();
      if (res.status === 200) {
        setUsers(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  const sortedUsers =
    users &&
    users.sort((a, b) => {
      const lastNameA = a.user_lastname || "";
      const lastNameB = b.user_lastname || "";
      return lastNameA.localeCompare(lastNameB);
    });

  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentusers =
    search === ""
      ? sortedUsers.slice(indexOfFirstUser, indexOfLastUser)
      : usersTable.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const goToNextPage = () => {
    if (currentPage === totalPages) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage >= 1) {
      if (currentPage === 1) {
        return;
      }
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    searchedUsers(e.target.value);
  };

  const searchedUsers = (search) => {
    let results = sortedUsers.filter((user) => {
      if (
        user.user_name.toLowerCase().includes(search.toLowerCase()) ||
        user.user_lastname.toLowerCase().includes(search.toLowerCase())
      ) {
        return user;
      }
    });
    setUsersTable(results);
  };

  console.log(sortedUsers);

  return (
    <div className="my-8 lg:my-14 mx-1 sm:mx-2 md:mx-10 w-full overflow-x-hidden">
      <div className=" h-fit block ml-1 lg:ml-10">
        
        <div className=" font-bold text-xl">
          <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
            Administrar Usuarios
          </h1>
        </div>
        <div className=" my-10">
          <Link to={`/admin/usuarios/registrar`}>
            <button className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500">
              Crear Usuario
            </button>
          </Link>
        </div>
        <div className="relative mb-4 flex w-[100%] md:w-[25vw] flex-wrap items-stretch rounded-lg bg-white ">
          <input
            type="search"
            className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-[#1C274C] focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={handleChange}
          />
          <span
            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 "
            id="basic-addon2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="h-5 w-5 fill-[#1C274C]"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <div className=" my-10 flex justify-center items-center">
          <table
            id="usersTable"
            className="border-collapse border border-slate-400 text-[10px] sm:text-sm"
          >
            <thead className=" rounded">
              <tr>
                <th className=" border text-[10px] sm:text-[12px] lg:text-base border-white font-semibold py-2 px-[20px] sm:px-[30px] lg:px-[100px] text-white bg-[#146898]">
                  Nombres
                </th>
                <th className=" border text-[10px] sm:text-[12px] lg:text-base hidden sm:table-cell border-white font-semibold py-2 px-[30px] lg:px-[100px] text-white bg-[#146898]">
                  Correo
                </th>
                <th className=" border text-[10px] sm:text-[12px] lg:text-base hidden lg:table-cell border-white font-semibold py-2 px-1 lg:px-[40px] text-white bg-[#146898]">
                  Rol
                </th>
                <th className=" border text-[10px] sm:text-[12px] lg:text-base hidden md:table-cell border-white font-semibold py-2 px-1 lg:px-[20px] text-white bg-[#146898]">
                  Estado
                </th>
                <th className=" border text-[10px] sm:text-[12px] lg:text-base border-white font-semibold py-2 px-[] lg:px-[20px] text-white bg-[#146898]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {search === ""
                ? sortedUsers &&
                  currentusers.map((user) => (
                    <tr
                      className=" hover:bg-[#202b52] duration-300"
                      key={user.user_id}
                    >
                      <th className="border text-[9px] sm:text-[12px] lg:text-base p-3 text-left border-slate-300 font-semibold text-white">{`${
                        user && user.user_lastname
                      } ${user && user.user_name}`}</th>
                      <th className="border text-[9px] sm:text-[12px] lg:text-base p-3 hidden sm:table-cell text-left border-slate-300 font-semibold text-white">
                        {user && user.user_email}
                      </th>
                      <th className="border text-[9px] sm:text-[12px] lg:text-base hidden lg:table-cell p-3 text-center border-slate-300 font-semibold text-white">
                        {user && user.role_id === 3
                          ? "Administrador"
                          : user && user.role_id === 2
                          ? "Docente"
                          : "Estudiante"}
                      </th>
                      <th className="border text-[9px] sm:text-[12px] lg:text-base hidden md:table-cell p-3 text-center border-slate-300 font-semibold text-white">
                        {user && user.user_status === true
                          ? "Activo"
                          : "Inactivo"}
                      </th>
                      <th className="border p-3 text-center border-slate-300 font-semibold text-white flex justify-center items-center">
                        <a
                          className=" "
                          href={`/admin/usuarios/${user && user.user_id}`}
                        >
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="cursor-pointer mx-1"
                          >
                            <path
                              d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                              stroke="#a19b3c"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className=" group-hover:stroke-slate-800"
                            />
                            <path
                              d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                              stroke="#a19b3c"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className=" group-hover:stroke-slate-800"
                            />
                          </svg>
                        </a>
                        
                      </th>
                    </tr>
                  ))
                : usersTable &&
                  currentusers.map((user) => (
                    <tr
                      className=" hover:bg-[#202b52] duration-300"
                      key={user.user_id}
                    >
                      <th className="border text-[9px] sm:text-[12px] lg:text-base p-3 text-left border-slate-300 font-semibold text-white">{`${
                        user && user.user_lastname
                      } ${user && user.user_name}`}</th>
                      <th className="border text-[9px] sm:text-[12px] lg:text-base p-3 hidden sm:table-cell text-left border-slate-300 font-semibold text-white">
                        {user && user.user_email}
                      </th>
                      <th className="border text-[9px] sm:text-[12px] lg:text-base hidden lg:table-cell p-3 text-center border-slate-300 font-semibold text-white">
                        {user && user.role_id === 3
                          ? "Administrador"
                          : user && user.role_id === 2
                          ? "Docente"
                          : "Estudiante"}
                      </th>
                      <th className="border text-[9px] sm:text-[12px] lg:text-base hidden md:table-cell p-3 text-center border-slate-300 font-semibold text-white">
                        {user && user.user_status === true
                          ? "Activo"
                          : "Inactivo"}
                      </th>
                      <th className="border p-3 text-center border-slate-300 font-semibold text-white flex justify-center items-center">
                        <Link
                          className=" "
                          to={`/admin/usuarios/${user && user.user_id}`}
                        >
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="cursor-pointer mx-1"
                          >
                            <path
                              d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                              stroke="#a19b3c"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className=" group-hover:stroke-slate-800"
                            />
                            <path
                              d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                              stroke="#a19b3c"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className=" group-hover:stroke-slate-800"
                            />
                          </svg>
                        </Link>
                        
                      </th>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <nav
          aria-label="Page navigation example"
          className=" md:mt-2 flex justify-center items-center"
        >
          <ul className="list-style-none flex">
            <li>
              <button
                className="relative block font-medium rounded bg-transparent px-3 py-1.5 text-[10px] sm:text-sm text-white border border-white w-28 hover:bg-[#146898] transition-all duration-300 "
                href="#"
                onClick={goToPreviousPage}
              >
                Previous
              </button>
            </li>

            <li>
              <button
                className="relative block font-medium rounded bg-transparent px-3 py-1.5 text-[10px] sm:text-sm text-white border border-white w-28 hover:bg-[#146898] transition-all duration-300 "
                href="#"
                onClick={goToNextPage}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Users;
