import React, { useEffect, useState } from "react";
import { getUsers } from "../../../api/user";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal";

function Users() {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersTable, setUsersTable] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

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
        <Modal open={open} onClose={() => setOpen(false)}>
          <div className=" block m-3">
            <div className=" flex justify-center items-center">
              <svg
                className="h-[100px] fill-[#ad2c2c]"
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                fill=""
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path
                      className="st0"
                      d="M308.229,51.853C308,23.183,284.751,0.017,256,0c-28.734,0.017-52,23.183-52.228,51.853 c-63.821,9.2-109.796,33.323-109.796,49.845v16.718c0,20.784,72.538,37.625,162.024,37.625c89.486,0,162.024-16.841,162.024-37.625 v-16.718C418.024,85.176,372.049,61.053,308.229,51.853z M256,48.065c-6.245,0-12.376,0.196-18.433,0.498 c0.735-3.715,2.547-6.996,5.144-9.616c3.445-3.437,8.049-5.494,13.289-5.51c5.257,0.017,9.845,2.073,13.306,5.51 c2.595,2.62,4.408,5.902,5.135,9.616C268.384,48.261,262.245,48.065,256,48.065z"
                    ></path>{" "}
                    <path
                      className="st0"
                      d="M256,178.335c-89.486,0-162.024-16.841-162.024-37.625l18.53,316.253C112.506,478.506,167.233,512,256,512 c88.767,0,143.51-33.494,143.51-55.037l18.514-316.253C418.024,161.494,345.486,178.335,256,178.335z M158.588,421.682 l-6.661-195.134c4.465,1.02,9.249,1.878,14.269,2.743l6.752,197.878C167.763,425.436,162.988,423.567,158.588,421.682z M217.176,436.98l-3.609-202.278c4.637,0.318,9.339,0.629,14.123,0.784l3.608,202.98C226.433,438.074,221.722,437.6,217.176,436.98 z M294.824,436.98c-4.547,0.62-9.339,1.094-14.196,1.486l3.608-202.98c4.784-0.155,9.494-0.466,14.123-0.784L294.824,436.98z M353.412,421.682c-4.392,1.886-9.175,3.755-14.351,5.486l6.744-197.878c5.02-0.865,9.803-1.796,14.277-2.743L353.412,421.682z"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
            </div>
            <div className=" my-3">
              <h1 className=" text-center text-lg font-bold">Confirmación</h1>
            </div>
            <div className=" my-3">
              <h1 className=" text-center text-base font-medium">
                ¿Estás seguro de eliminar este usuario?
              </h1>
            </div>
            <div className=" flex justify-center items-center">
            <div className=" my-2 grid grid-cols-2">
              <div className=" mx-4">
                <button className=" p-2 active:transform active:scale-90 border border-white bg-[#ad2c2c] rounded-lg hover:bg-[#b94d4d] text-white hover:text-white text-[12px] md:text-sm lg:text-base duration-500">
                  Eliminar
                </button>
              </div>
              <div className=" mx-4">
                <button className=" p-2 active:transform active:scale-90 border border-gray-400 rounded-lg hover:bg-[#146898] text-black hover:text-white text-[12px] md:text-sm lg:text-base duration-500">
                  Cancelar
                </button>
              </div>
            </div>
            </div>
          </div>
        </Modal>
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
                        <svg
                          className=" mx-1"
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#d75656"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                              stroke="#d75656"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
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
                        <svg
                          className=" mx-1"
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#d75656"
                        >
                          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
                              stroke="#d75656"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                          </g>
                        </svg>
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
