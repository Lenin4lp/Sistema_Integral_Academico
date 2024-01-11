import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroup } from "../../api/academic";
import { useAuth } from "../../auth/AuthProvider";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateSubject } from "../../api/academic";

function CourseInfo() {
  const { user } = useAuth();
  const [group, setGroup] = useState([]);
  const [errors, setErrors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsTable, setStudentsTable] = useState([]);
  const [search, setSearch] = useState("");
  const [content, setContent] = useState(0);
  const [file, setFile] = useState();
  let { id } = useParams();
  const navigate = useNavigate();

  const modifySubject = async (id, content) => {
    try {
      const res = await updateSubject(id, content);
      if (res.status === 200) {
        alert("Archivo cargado exitosamente");

        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const upload = () => {
    const formData = new FormData();
    formData.append("myFile", file);
    axios
      .post("http://localhost:8081/api/upload", formData)
      .then((res) => {
        if (res.status === 200) {
          const subjectId = group && group.subject_id;
          const fileLocation = res.data.location;
          const data = {
            syllabus: fileLocation,
          };
          console.log(fileLocation);
          modifySubject(subjectId, data);
        }
      })
      .catch((er) => console.log(er));
  };

  const getAGroup = async (groupId) => {
    try {
      const res = await getGroup(groupId);
      if (res.status === 200) {
        setGroup(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const Students =
    group &&
    group.student?.sort((a, b) => {
      const studentA = a.user.user_lastname;
      const studentB = b.user.user_lastname;
      return studentA.localeCompare(studentB);
    });

  const studentsPerPage = 10;
  const indexofLastStudent = currentPage * studentsPerPage;
  const indexofFirstStudent = indexofLastStudent - studentsPerPage;
  const currentStudents =
    search === ""
      ? Students && Students.slice(indexofFirstStudent, indexofLastStudent)
      : studentsTable.slice(indexofFirstStudent, indexofLastStudent);

  const totalPages = Math.ceil(Students && Students.length / studentsPerPage);

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
    searchedStudents(e.target.value);
  };

  const searchedStudents = (search) => {
    let results =
      Students &&
      Students.filter((student) => {
        if (
          student.user.user_lastname
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          student.user.user_name.toLowerCase().includes(search.toLowerCase())
        ) {
          return student;
        }
      });
    setStudentsTable(results);
  };

  useEffect(() => {
    getAGroup(id);
  }, []);

  return (
    <div className=" overflow-x-hidden relative mb-10">
      <div className=" ">
        <div className=" fixed top-0 w-full h-fit bg-white z-30">
          <div>
            <h1 className=" text-left text-[12px] md:text-base p-2 text-[#1C274C]">
              Bienvenid@ al <span className=" pl-1 font-bold">S</span>istema{" "}
              <span className=" pl-1 font-bold">I</span>ntegral{" "}
              <span className=" pl-1 font-bold">A</span>cadémico
            </h1>
          </div>
        </div>
      </div>
      <div className=" sm:bg-[#1C274C] mt-8 md:mt-5 w-full flex justify-center items-center">
        <div className=" block">
          <div className=" flex justify-center items-center">
            <div className="  my-5 md:my-14 mx-2 md:mx-10 inline-flex items-center justify-center">
              <h1 className=" text-lg md:text-2xl text-center text-white font-bold">
                {(group && group.subject?.subject_name)?.toUpperCase()}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center md:justify-start w-full items-center md:items-start mt-5  md:mx-10  lg:my-10">
        <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <div className=" col-span-1 block">
            <div className=" flex justify-center items-start">
              <div className=" sm:m-2 md:m-5 h-fit bg-white w-fit md:w-full rounded-lg">
                <div className=" m-5 block">
                  <h1 className=" font-semibold text-[#1C274C]">Grupo:</h1>
                  <div className=" mt-3 flex-wrap justify-center md:block">
                    <p className=" text-sm font-medium text-[#1C274C]">{`${
                      group && group.group_name
                    } (${group && group.group_id})`}</p>
                  </div>
                  <h1 className=" mt-5 font-semibold text-[#1C274C]">
                    Modalidad:
                  </h1>
                  <div className=" mt-3 flex-wrap justify-center md:block">
                    <p className=" text-sm font-medium text-[#1C274C]">
                      {group && group.modality_id === 1
                        ? "Presencial"
                        : "En línea"}
                    </p>
                  </div>
                  <h1 className=" mt-5 font-semibold text-[#1C274C]">
                    N° de estudiantes:
                  </h1>
                  <div className=" mt-3 flex-wrap justify-center md:block">
                    <p className=" text-sm font-medium text-[#1C274C]">
                      {group && group.student?.length}
                    </p>
                  </div>
                  <h1 className=" mt-5 font-semibold text-[#1C274C]">
                    Docente:
                  </h1>
                  <div className=" mt-3 flex-wrap justify-center md:block">
                    <p className=" text-sm font-medium text-[#1C274C]">
                      {group && group.teacher?.user.user_name}
                    </p>
                  </div>
                  <div className=" mt-1 flex-wrap justify-center md:block">
                    <p className=" text-sm font-medium text-[#1C274C]">
                      {group && group.teacher?.user.user_lastname}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" m-5 ">
              <div className=" flex justify-center items-center">
                <a href="/calificaciones">
                  <button className=" p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#1C274C] text-white hover:text-white text-[13px] duration-500">
                    Ir a calificaciones
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className=" overscroll-none px-12 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-center md:justify-start items-start">
            {content === 0 && (
              <div className=" block">
                {user && user.role_id === 1 && (
                  <div className=" mx-3 md:mx-10 mt-10 font-semibold text-sm lg:text-lg">
                    <div className=" grid grid-cols-1 md:grid-cols-4 hover:scale-[1.03] duration-500">
                      <div
                        onClick={() =>
                          (window.location.href = `mailto:${
                            group && group.teacher?.user.user_email
                          }`)
                        }
                        className="  "
                      >
                        <div className=" group hover:cursor-pointer flex justify-center items-center col-span-1 h-[150px] w-[132px] lg:w-[200px] rounded bg-[#1C274C] text-white">
                          <div className=" block">
                            <div className=" flex justify-center items-center">
                              <svg
                                className=" h-[40px] lg:h-[70px] w-auto"
                                fill="#ffffff"
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 299.97 299.97"
                                xml:space="preserve"
                                stroke="#ffffff"
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
                                    <g>
                                      {" "}
                                      <g>
                                        {" "}
                                        <path d="M149.985,126.898c34.986,0,63.449-28.463,63.449-63.449C213.435,28.463,184.971,0,149.985,0S86.536,28.463,86.536,63.449 C86.536,98.436,114.999,126.898,149.985,126.898z M149.985,15.15c26.633,0,48.299,21.667,48.299,48.299 s-21.667,48.299-48.299,48.299s-48.299-21.667-48.299-48.299S123.353,15.15,149.985,15.15z"></path>{" "}
                                        <path d="M255.957,271.919l-20.807-86.313c-2.469-10.244-11.553-17.399-22.093-17.399c-13.216,0-114.332,0-126.145,0 c-10.538,0-19.623,7.155-22.093,17.399l-20.807,86.313c-3.444,14.289,7.377,28.051,22.093,28.051h167.76 C248.563,299.97,259.407,286.229,255.957,271.919z M66.105,284.82c-4.898,0-8.513-4.581-7.364-9.35l20.807-86.314 c0.823-3.415,3.851-5.799,7.365-5.799H121.4l-9.553,67.577c-0.283,2,0.244,4.029,1.464,5.637l21.422,28.249H66.105z M127.291,249.932l9.411-66.574h26.567l9.411,66.574l-22.695,29.927L127.291,249.932z M233.865,284.82h-68.628l21.421-28.248 c1.22-1.609,1.747-3.638,1.464-5.637l-9.553-67.577h34.487c3.513,0,6.542,2.385,7.365,5.8l20.807,86.313 C242.377,280.235,238.769,284.82,233.865,284.82z"></path>{" "}
                                      </g>{" "}
                                    </g>{" "}
                                  </g>{" "}
                                </g>
                              </svg>
                            </div>

                            <div className=" block m-2">
                              <p className=" text-center text-[12px] lg:text-sm font-medium">
                                {group && group.teacher?.user.user_name}
                              </p>
                              <p className=" text-center text-[12px] lg:text-sm font-medium">
                                {group && group.teacher?.user.user_lastname}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() =>
                          (window.location.href = `mailto:${
                            group && group.teacher?.user.user_email
                          }`)
                        }
                        className="hover:cursor-pointer hidden md:flex justify-center duration-500 col-span-3 rounded border-slate-300 border bg-gradient-to-br from-[#ffffff] to-[#94afbe] text-[#1C274C]"
                        action=""
                      >
                        <div className=" flex h-full justify-center items-center">
                          <h1 className=" text-sm lg:text-base">
                            Contactar docente a través del correo institucional
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className=" mx-3 md:mx-10 mt-10 font-semibold text-sm lg:text-lg">
                  <div className=" grid grid-cols-1 md:grid-cols-4 hover:scale-[1.03] duration-500">
                    <div
                      onClick={() =>
                        (window.location.href = `${
                          group.subject.syllabus === null
                            ? ""
                            : group.subject.syllabus
                        }`)
                      }
                    >
                      <div className=" group hover:cursor-pointer flex justify-center items-center col-span-1 h-[150px] w-[132px] lg:w-[200px] rounded bg-[#1C274C] text-white">
                        <div className=" block">
                          <div className=" flex justify-center items-center">
                            <svg
                              className=" h-[40px] lg:h-[70px] w-auto"
                              fill="#ffffff"
                              viewBox="0 0 1920 1920"
                              xmlns="http://www.w3.org/2000/svg"
                              stroke="#ffffff"
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
                                  d="M1801.441 0v1920H219.03v-439.216h-56.514c-31.196 0-56.515-25.299-56.515-56.47 0-31.172 25.319-56.47 56.515-56.47h56.514V1029.02h-56.514c-31.196 0-56.515-25.3-56.515-56.471 0-31.172 25.319-56.47 56.515-56.47h56.514V577.254h-56.514c-31.196 0-56.515-25.299-56.515-56.47 0-31.172 25.319-56.471 56.515-56.471h56.514V0h1582.412Zm-113.03 112.941H332.06v351.373h56.515c31.196 0 56.514 25.299 56.514 56.47 0 31.172-25.318 56.47-56.514 56.47H332.06v338.824h56.515c31.196 0 56.514 25.3 56.514 56.471 0 31.172-25.318 56.47-56.514 56.47H332.06v338.824h56.515c31.196 0 56.514 25.299 56.514 56.47 0 31.172-25.318 56.471-56.514 56.471H332.06v326.275h1356.353V112.94ZM640.289 425.201H1388.9v112.94H640.288v-112.94Zm0 214.83h639.439v112.94h-639.44v-112.94Zm0 534.845H1388.9v112.94H640.288v-112.94Zm0 214.83h639.439v112.94h-639.44v-112.94Z"
                                  fillRule="evenodd"
                                ></path>{" "}
                              </g>
                            </svg>
                          </div>

                          <div className=" m-2">
                            <p className=" font-medium text-[12px] lg:text-sm">
                              Syllabus
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className=" hidden md:flex justify-center hover:cursor-pointer col-span-3 rounded border-slate-300 border bg-gradient-to-br from-[#ffffff] to-[#94afbe] text-[#1C274C]"
                      action=""
                      onClick={() =>
                        (window.location.href = `${
                          group.subject.syllabus === null
                            ? ""
                            : group.subject.syllabus
                        }`)
                      }
                    >
                      <div className=" flex h-full justify-center items-center">
                        <h1 className=" text-sm text-center lg:text-base">
                          Accede al Syllabus de la materia
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                {user && user.role_id === 2 && (
                  <div className="mx-3 md:mx-10 mt-10 font-semibold text-sm lg:text-lg">
                    <div className=" flex justify-center items-center">
                      <button
                        onClick={() => setContent(2)}
                        className=" p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#1C274C] text-white hover:text-white text-[13px] duration-500"
                      >
                        Modificar Syllabus
                      </button>
                    </div>
                  </div>
                )}

                <div className=" mx-3 md:mx-10 mt-10 font-semibold text-sm lg:text-lg">
                  <div className=" grid grid-cols-1 md:grid-cols-4 hover:scale-[1.03] duration-500">
                    <div onClick={() => setContent(1)}>
                      <div className=" group hover:cursor-pointer flex justify-center items-center col-span-1 h-[150px] w-[132px] lg:w-[200px] rounded bg-[#1C274C] text-white">
                        <div className=" block">
                          <div className=" flex justify-center items-center">
                            <svg
                              className=" h-[40px] lg:h-[70px] w-auto"
                              fill="#ffffff"
                              version="1.1"
                              id="Capa_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              viewBox="0 0 31.716 31.716"
                              xmlSpace="preserve"
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
                                  <path d="M30.604,14.503v-3.815c0.709-0.606,1.112-1.479,1.112-2.416c0-1.322-0.832-2.52-2.069-2.98l-11.44-4.259 c-1.549-0.577-3.275-0.574-4.821,0.007L2.062,5.294C0.829,5.757,0,6.954,0,8.271c0,1.318,0.83,2.514,2.062,2.976l4.236,1.591 l0.005,3.199c-0.091,0.939-0.76,7.993,3.183,12.388c1.601,1.783,3.729,2.688,6.32,2.688c2.593,0,4.718-0.905,6.319-2.688 c4.014-4.474,3.248-11.748,3.18-12.434l0.004-3.126l3.68-1.37v3.008c-0.545,0.395-0.892,1.165-0.892,2.014 c0,1.123,0,2.284,1.697,2.284c1.698,0,1.698-1.162,1.698-2.284C31.494,15.669,31.15,14.898,30.604,14.503z M20.645,27.095 c-1.226,1.364-2.809,2.026-4.838,2.026c-2.031,0-3.611-0.664-4.836-2.026c-2.157-2.397-2.675-5.208-2.754-7.96 c1.834,1.184,4.739,1.792,7.587,1.792c2.853,0,5.761-0.61,7.593-1.802C23.318,21.879,22.804,24.695,20.645,27.095z M8.775,16.187 v-2.418l4.611,1.733c1.545,0.582,3.273,0.583,4.822,0.008l4.628-1.723v2.4c0,0.774-2.737,2.256-7.03,2.256 S8.775,16.961,8.775,16.187z M26.527,9.393l-9.547,3.554c-0.756,0.283-1.603,0.281-2.36-0.003L5.165,9.392 c-0.084-0.031-0.19-0.068-0.307-0.107c-0.542-0.18-1.552-0.518-1.552-1.014c0-0.505,0.963-0.822,1.538-1.011 c0.123-0.04,0.232-0.077,0.321-0.11l9.454-3.552C15,3.454,15.398,3.383,15.804,3.383c0.404,0,0.798,0.071,1.176,0.211l9.549,3.555 c0.078,0.029,0.172,0.062,0.277,0.097c0.52,0.178,1.602,0.544,1.602,1.025C28.408,8.466,28.091,8.815,26.527,9.393z"></path>{" "}
                                </g>{" "}
                              </g>
                            </svg>
                          </div>

                          <div className=" m-2">
                            <p className=" text-center text-[12px] lg:text-sm py-2 font-medium">
                              Lista de Estudiantes
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => setContent(1)}
                      className=" hidden md:flex justify-center hover:cursor-pointer col-span-3 rounded border-slate-300 border bg-gradient-to-br from-[#ffffff] to-[#94afbe] text-[#1C274C]"
                      action=""
                    >
                      <div className=" flex h-full justify-center items-center">
                        <h1 className=" text-base">
                          {user && user.role_id === 1
                            ? "Conoce a tus compañeros de clase"
                            : "Conozca a sus alumnos"}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {content === 1 && (
              <div className=" flex justify-start items-center">
                <div className=" block">
                  <div className="  mt-10 font-semibold flex justify-start items-center w-full text-sm lg:text-lg"></div>
                  {Students && Students.length > 0 && (
                    <div className=" block">
                      <div className=" flex w-full justify-start mb-5 items-center">
                        <h1 className=" text-left text-lg font-semibold text-white">
                          Lista de estudiantes
                        </h1>
                      </div>
                      <button
                        onClick={() => setContent(0)}
                        className=" my-5 p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#1C274C] text-white hover:text-white text-[13px] duration-500"
                      >
                        Regresar
                      </button>
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
                      <table className=" border-collapse   text-[10px] sm:text-sm">
                        <thead className=" rounded text-[12px] lg:text-sm">
                          <tr>
                            <th className="border px-20 sm:px-32 md:px-20 lg:px-40 bg-[#1C274C] p-2 border-[#4784a0] text-white font-semibold ">
                              Nombres
                            </th>
                            <th className="border px-10 bg-[#1C274C] hidden md:table-cell p-2 border-[#4784a0] text-white font-semibold ">
                              Correo Institucional
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {search === ""
                            ? Students &&
                              currentStudents.map((student) => (
                                <tr
                                  key={student.student_id}
                                  className="  text-[12px] lg:text-sm"
                                >
                                  <th className="border p-3 text-left bg-white border-slate-300 font-semibold hover:text-[#146898] duration-300 text-[#1C274C]">
                                    {`${student.user.user_lastname} ${student.user.user_name}`}
                                  </th>
                                  <th className="border p-3 hidden md:table-cell text-left bg-white border-slate-300 font-semibold hover:text-[#146898] duration-300 text-[#1C274C]">
                                    {student.user.user_email}
                                  </th>
                                </tr>
                              ))
                            : studentsTable.map((student) => (
                                <tr
                                  key={student.student_id}
                                  className=" text-[12px] lg:text-sm"
                                >
                                  <th className="border p-3 text-left bg-white border-slate-300 font-semibold hover:text-[#146898] duration-300 text-[#1C274C]">
                                    {`${student.user.user_lastname} ${student.user.user_name}`}
                                  </th>
                                  <th className="border p-3 hidden md:table-cell text-left bg-white border-slate-300 font-semibold hover:text-[#146898] duration-300 text-[#1C274C]">
                                    {student.user.user_email}
                                  </th>
                                </tr>
                              ))}
                        </tbody>
                      </table>

                      <nav
                        aria-label="Page navigation example"
                        className=" my-5 flex justify-center items-center"
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
                  )}
                </div>
              </div>
            )}
            {content === 2 && (
              <div className=" flex justify-center md:justify-start items-center">
                <div className=" block">
                  <div className="  mt-10 font-semibold flex-wrap justify-start items-center text-white w-full text-sm lg:text-xl">
                    <h1>Modificar Syllabus</h1>
                  </div>
                  <button
                    onClick={() => setContent(0)}
                    className=" my-8 p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#1C274C] text-white hover:text-white text-[13px] duration-500"
                  >
                    Regresar
                  </button>
                  <div className=" mt-5">
                    <div className=" flex justify-start items-center">
                      <h1 className=" text-white text-sm">
                        Selecciona el archivo correspondiente al Syllabus
                      </h1>
                    </div>
                  </div>
                  <div className=" mt-5 text-white">
                    <input
                      accept="application/pdf"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <button
                    className=" text-white mt-10 p-2 hover:border-r-white bg-[#146898] hover:border-t-white duration-300 border-white border-b mb-3 rounded border-l border-r border-r-transparent border-t border-t-transparent hover:cursor-pointer"
                    type="button"
                    onClick={upload}
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
