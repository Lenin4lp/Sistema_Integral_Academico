import React, { useState, useEffect } from "react";
import Cards from "../../../components/Cards";
import { Link } from "react-router-dom";
import { getGroup } from "../../../api/academic";
import { useParams } from "react-router-dom";

function GroupInfo() {
  const { groupId2 } = useParams();
  const [group, setGroup] = useState();
  const [errors, setErrors] = useState([]);
  const [page, setPage] = useState(1);
  const [usersTable, setUsersTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const getAGroup = async (id) => {
    try {
      const res = await getGroup(id);
      if (res.status === 200) {
        setGroup(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const sortedGrades =
    group &&
    group.grades.sort((a, b) => {
      const lastNameA = a.student?.user?.user_lastname || "";
      const lastNameB = b.student?.user?.user_lastname || "";
      return lastNameA.localeCompare(lastNameB);
    });

  const sortedUsers =
    group &&
    group.student.sort((a, b) => {
      const lastNameA = a.user?.user_lastname || "";
      const lastNameB = b.user?.user_lastname || "";
      return lastNameA.localeCompare(lastNameB);
    });

  const handleChange = (e) => {
    setSearch(e.target.value);
    searchedUsers(e.target.value);
  };

  useEffect(() => {
    getAGroup(groupId2);
  }, []);

  return (
    <div className=" my-8 lg:my-14 mx-2 md:mx-10 w-full">
      <div className=" h-fit block ml-1 lg:ml-10">
        <div className=" font-bold text-xl">
          <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
            {`${group && group.group_name} - ${
              group && group.subject.subject_name
            }`}
          </h1>
        </div>
        <div className=" font-medium text-lg">
          <h1 className=" text-white opacity-60 text-lg lg:text-xl ">
            {group && group.group_id}
          </h1>
        </div>
        <div className=" font-bold text-base mt-5">
          <h1 className=" text-white text-base lg:text-xl ">
            Docente:
            <span className=" font-normal">
              {group && group.teacher
                ? ` ${group.teacher && group.teacher.user.user_name}`
                : " Docente no registrado"}
            </span>
          </h1>
        </div>
        <div className=" font-bold text-base mt-5">
          <h1 className=" text-white text-base lg:text-xl ">
            Modalidad:
            <span className=" font-normal">
              {group && group.modality_id === 1 ? " Presencial" : " Virtual"}
            </span>
          </h1>
        </div>
        {page === 1 && (
          <div className=" flex justify-center items-center w-fit m-3 md:m-10">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className=" text-white hover:z-10">
                <button
                  className=" h-fit w-fit"
                  onClick={() => {
                    setPage(2);
                  }}
                >
                  <Cards
                    cardColor="bg-gradient-to-br from-[#297e66] to-[#2ea886] lg:h-32"
                    cardTitle="Usuarios matriculados"
                    cardDescription=""
                    cardFontColor={""}
                  />
                </button>
              </div>
              <div className=" text-white hover:z-10">
                <button
                  className=" h-fit w-fit"
                  onClick={() => {
                    setPage(3);
                  }}
                >
                  <Cards
                    cardColor="bg-gradient-to-br from-[#317f8d] to-[#2f9caf] lg:h-32"
                    cardTitle="Calificaciones"
                    cardDescription=""
                    cardFontColor={""}
                  />
                </button>
              </div>
              <div className=" text-white hover:z-10">
                <button
                  className=" h-fit w-fit"
                  onClick={() => {
                    setPage(4);
                  }}
                >
                  <Cards
                    cardColor="bg-gradient-to-br from-[#a7b33f] to-[#b6c05a] lg:h-32"
                    cardTitle="Modificar Grupo"
                    cardDescription=""
                    cardFontColor={""}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
        {page === 2 && (
          <>
            <div className=" mt-7 flex">
              <button onClick={() => setPage(1)} className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500">
                Regresar
              </button>
              <button onClick={() => setPage(5)} className=" ml-10 p-2 border border-white active:transform active:scale-90 bg-transparent rounded-lg hover:bg-[#f1ce2f] text-white hover:text-[#1C274C] text-sm lg:text-base duration-500">
                Matricular alumno
              </button>
            </div>
            <div className="relative mt-8 mb-4 flex w-[100%] md:w-[25vw] flex-wrap items-stretch rounded-lg bg-white ">
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

                    <th className=" border text-[10px] sm:text-[12px] lg:text-base hidden md:table-cell border-white font-semibold py-2 px-1 lg:px-[20px] text-white bg-[#146898]">
                      Estado
                    </th>
                    <th className=" border text-[10px] sm:text-[12px] lg:text-base border-white font-semibold py-2 px-[] lg:px-[20px] text-white bg-[#146898]">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers &&
                    sortedUsers.map((user) => (
                      <tr
                        className=" hover:bg-[#202b52] duration-300"
                        key={user.user_id}
                      >
                        <th className="border text-[9px] sm:text-[12px] lg:text-base p-3 text-left border-slate-300 font-semibold text-white">{`${
                          user && user.user.user_lastname
                        } ${user && user.user.user_name}`}</th>
                        <th className="border text-[9px] sm:text-[12px] lg:text-base p-3 hidden sm:table-cell text-left border-slate-300 font-semibold text-white">
                          {user && user.user.user_email}
                        </th>

                        <th className="border text-[9px] sm:text-[12px] lg:text-base hidden md:table-cell p-3 text-center border-slate-300 font-semibold text-white">
                          {user && user.user.user_status === true
                            ? "Inactivo"
                            : "Activo"}
                        </th>
                        <th className="border p-3 text-center border-slate-300 font-semibold text-white flex justify-center items-center">
                          <Link
                            className=" "
                            to={`/admin/usuarios/${user && user.user.user_id}`}
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
          </>
        )}
        {page === 3 && (
          <>
          <div className=" mt-7">
              <button onClick={() => setPage(1)} className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500">
                Regresar
              </button>
            </div>
          <div className="  z-10 bg-[#151c31]">
            <div className=" py-10">
              <div className="  flex justify-center items-center ">
                <div className=" block">
                  <table
                    id="myTable"
                    className=" border-collapse border border-slate-400 text-[10px] sm:text-sm"
                  >
                    <thead className=" rounded">
                      <tr>
                        <th className=" border border-[#151c31] font-semibold text-[#1C274C]"></th>
                        <th
                          className="border hidden lg:table-cell bg-white p-2 border-[#4784a0] text-[#1C274C] font-semibold "
                          colSpan="5"
                        >
                          1er hemisemestre
                        </th>
                        <th
                          className="border hidden lg:table-cell bg-white p-2 border-[#4784a0] text-[#1C274C] font-semibold"
                          colSpan="5"
                        >
                          2do hemisemestre
                        </th>
                        <th className=" font-semibold text-[#1C274C]"></th>
                      </tr>
                      <tr>
                        <th className=" border bg-white py-2 px-10 sm:px-20 border-slate-300 font-semibold text-[#1C274C]">
                          Estudiante
                        </th>
                        <th className=" border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                          Nota 1
                        </th>
                        <th className=" border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                          Nota 2
                        </th>
                        <th className=" border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                          Prueba
                        </th>
                        <th className=" border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                          Examen
                        </th>
                        <th className=" border p-2 hidden bg-white	sm:table-cell border-slate-300 font-semibold lg:bg-[#151c31] text-[#1C274C] lg:text-white">
                          Prom 1
                        </th>
                        <th className=" border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                          Nota 1
                        </th>
                        <th className=" border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                          Nota 2
                        </th>
                        <th className=" border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                          Prueba
                        </th>
                        <th className=" border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                          Examen
                        </th>
                        <th className=" border p-2 hidden bg-white	sm:table-cell border-slate-300 font-semibold lg:bg-[#151c31] text-[#1C274C] lg:text-white">
                          Prom 2
                        </th>
                        <th className=" border p-2 hidden sm:table-cell bg-white border-slate-300 font-semibold text-[#1C274C]">
                          Supletorio
                        </th>
                        <th className=" border p-2 bg-white border-slate-300 font-semibold text-[#1C274C]">
                          Nota final
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedGrades &&
                        sortedGrades.map((grade) => (
                          <tr key={grade.grade_id}>
                            <th className="border p-3 text-left border-slate-300 font-semibold text-white">
                              {grade &&
                                grade.student.user.user_lastname +
                                  " " +
                                  grade.student.user.user_name}
                            </th>
                            <th className="border p-3 hidden lg:table-cell border-slate-300 font-semibold text-white">
                              {grade && grade.grade_1}
                            </th>
                            <th className="border p-3 hidden lg:table-cell border-slate-300 font-semibold text-white">
                              {grade && grade.grade_2}
                            </th>
                            <th className="border p-3 hidden lg:table-cell border-slate-300 font-semibold text-white">
                              {grade && grade.test_1}
                            </th>
                            <th className="border p-3 hidden lg:table-cell border-slate-300 font-semibold text-white">
                              {grade && grade.exam_1}
                            </th>
                            <th className="border p-3 hidden sm:table-cell border-slate-300 font-semibold text-white">
                              {grade && grade.prom_1}
                            </th>
                            <th className="border p-3 hidden lg:table-cell border-slate-300 font-semibold text-white">
                              {grade && grade.grade_3}
                            </th>
                            <th className="border p-3 hidden lg:table-cell border-slate-300 font-semibold text-white">
                              {grade && grade.grade_4}
                            </th>
                            <th className="border p-3 hidden lg:table-cell border-slate-300 font-semibold text-white">
                              {grade && grade.test_2}
                            </th>
                            <th className="border p-3 hidden lg:table-cell border-slate-300 font-semibold text-white">
                              {grade && grade.exam_2}
                            </th>
                            <th className="border p-3 hidden sm:table-cell border-slate-300 font-semibold text-white">
                              {grade && grade.prom_2}
                            </th>
                            <th className="border p-3 hidden sm:table-cell border-slate-300 font-semibold text-white">
                              {grade && grade.resit}
                            </th>
                            <th className="border p-3 border-slate-300 font-semibold text-white">
                              {grade && grade.final_grade}
                            </th>
                            <th className="border p-3 border-white font-semibold group  text-white">
                              <a href={``}>
                                <svg
                                  width="20px"
                                  height="20px"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="cursor-pointer"
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
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </>
        )}
        {page === 4 && (
          <></>
        )}
      </div>
    </div>
  );
}

export default GroupInfo;
