import React, { useEffect, useState } from "react";
import { getDegrees } from "../../api/academic";
import { getModalities } from "../../api/academic";

function Degrees() {
  const [degrees, setDegrees] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [selectedModality, setSelectedModality] = useState("1");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsTable, setStudentsTable] = useState([]);
  const [search, setSearch] = useState("");

  const handleModalityChange = (e) => {
    setSelectedModality(e.target.value);
  };

  const sortedDegrees =
    degrees &&
    degrees.sort((a, b) => {
      const degreeA = a.degree_name;
      const degreeB = b.degree_name;
      return degreeA.localeCompare(degreeB);
    });

  const filteredDegrees =
    sortedDegrees &&
    sortedDegrees.filter((degree) =>
      degree.modality.some((m) => m.modality_id == selectedModality)
    );

  const FirstDegree = filteredDegrees && filteredDegrees[0];

  const getDegreesList = async () => {
    try {
      const res = await getDegrees();
      if (res.status === 200) {
        setDegrees(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getModalitiesList = async () => {
    try {
      const res = await getModalities();
      if (res.status === 200) {
        setModalities(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Degree =
    selectedDegree !== "" &&
    degrees &&
    degrees.find((degree) => degree.degree_id == selectedDegree);

  const Modality =
    modalities && modalities.find((m) => m.modality_id == selectedModality);

  const Students =
    selectedDegree !== "" &&
    selectedModality !== "" &&
    Degree &&
    Degree.student
      .filter(
        (student) =>
          student.degree_id === selectedDegree &&
          student.group[0].modality_id == selectedModality
      )
      .sort((a, b) => {
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
    getDegreesList();
    getModalitiesList();
  }, []);

  useEffect(() => {
    setSelectedDegree("");
  }, [selectedModality]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDegree]);

  console.log(FirstDegree);

  return (
    <div className="overflow-x-hidden">
      <div className="  relative ">
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
      <div className="  h-fit mt-10 md:mt-5 w-full flex justify-center items-center">
        <div className=" block">
          <div className=" flex justify-start items-start">
            <div className="  mt-8 md:mt-14 mx-2 lg:mx-10 inline-flex items-center justify-center gap-3">
              <svg
                className="  h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]"
                fill="#ffffff"
                viewBox="-5 0 32 32"
                version="1.1"
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
                  <title>university</title>{" "}
                  <path d="M0.84 12.96h20.52c0.48 0 0.84-0.36 0.84-0.84 0-0.36-0.2-0.64-0.52-0.76l-10.2-5.2c-0.24-0.12-0.52-0.12-0.76 0l-10.24 5.2c-0.36 0.16-0.52 0.56-0.44 0.96 0.12 0.36 0.4 0.64 0.8 0.64zM11.12 7.88l6.72 3.4h-13.44l6.72-3.4zM21.36 24.24h-1.64v-9.36c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v9.36h-3.52v-9.36c0-0.48-0.36-0.84-0.84-0.84-0.44 0-0.84 0.36-0.84 0.84v9.36h-3.52v-9.36c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v9.36h-3.48v-9.36c0-0.48-0.36-0.84-0.84-0.84s-0.8 0.36-0.8 0.84v9.36h-1.64c-0.48 0-0.84 0.36-0.84 0.84s0.36 0.84 0.84 0.84h20.52c0.48 0 0.84-0.36 0.84-0.84s-0.4-0.84-0.88-0.84z"></path>{" "}
                </g>
              </svg>
              <h1 className=" text-white underline underline-offset-8 decoration-2 decoration-[#146898] duration-300 text-xl md:text-2xl lg:text-3xl font-semibold font-mono">
                CARRERAS
              </h1>
            </div>
          </div>
          <div className=" w-full h-fit flex justify-start p-5 lg:p-10 items-center">
            <select
              className=" w-[150px] lg:w-[200px]"
              onChange={handleModalityChange}
              name=""
              id=""
            >
              {modalities.map((modality) => (
                <option key={modality.modality_id} value={modality.modality_id}>
                  {modality.modality_name}
                </option>
              ))}
            </select>
          </div>
          <div className=" flex container justify-center items-center ">
            <div className=" flex justify-center items-center w-full lg:mx-24 h-fit border-b border-white">
              <div className=" justify-stretch grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {degrees &&
                  filteredDegrees.map((degree) => (
                    <div
                      key={degree.degree_id}
                      className=" m-3 flex justify-center items-center"
                    >
                      <div
                        onClick={() => setSelectedDegree(degree.degree_id)}
                        className={` p-2 md:p-3 border-b mb-3 rounded border-l border-r border-r-transparent border-t border-t-transparent hover:cursor-pointer  ${
                          selectedDegree === degree.degree_id
                            ? "bg-[#1C274C]"
                            : "bg-[#4784a0]"
                        } hover:border-r-white hover:border-t-white duration-300 border-white`}
                      >
                        <h1 className=" text-white text-center text-[12px] lg:text-sm">
                          {degree.degree_name}
                        </h1>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className=" md:mt-5 flex justify-start items-center w-full h-fit">
            {selectedDegree !== "" ? (
              <div className=" grid  grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
                <div className=" col-span-1 flex justify-center items-start">
                  <div className=" m-2 md:m-5 h-fit bg-white w-full rounded-lg">
                    <div className=" m-5 block">
                      <h1 className=" font-semibold text-[#1C274C]">
                        Carrera:
                      </h1>
                      <div className=" mt-2 sm:mt-3 flex-wrap justify-center md:block">
                        <p className=" text-sm font-medium text-[#1C274C]">
                          {Degree && Degree.degree_name}
                        </p>
                      </div>
                      <h1 className=" mt-3 sm:mt-5 font-semibold text-[#1C274C]">
                        Modalidades:
                      </h1>
                      <div className=" mt-2 sm:mt-3 flex-wrap justify-center md:block">
                        {Degree &&
                          Degree.modality.map((modality) => (
                            <p
                              key={modality.modality_id}
                              className=" text-sm mt-1 font-medium text-[#1C274C]"
                            >
                              {modality && modality.modality_name}
                            </p>
                          ))}
                      </div>
                      <h1 className=" mt-3 sm:mt-5 font-semibold text-[#1C274C]">
                        Modalidad actual:
                      </h1>
                      <div className=" mt-2 sm:mt-3 flex-wrap justify-center md:block">
                        <p className=" text-sm font-medium text-[#1C274C]">
                          {Modality && Modality.modality_name}
                        </p>
                      </div>
                      <h1 className=" mt-3 sm:mt-5 font-semibold text-[#1C274C]">
                        Nº de estudiantes:
                      </h1>
                      <div className=" mt-2 sm:mt-3 flex-wrap justify-center md:block">
                        <p className=" text-sm font-medium text-[#1C274C]">
                          {Students && Students.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" mx-2 m-8 md:m-10 col-span-1 md:col-span-3 lg:col-span-4 flex  items-start">
                  <div className=" block">
                    <div className=" flex w-full justify-start mb-10 items-center">
                      <h1 className=" text-left text-sm sm:text-lg font-semibold text-white">
                        Lista de estudiantes
                      </h1>
                    </div>
                    <div className="relative mb-4 flex w-[200px] md:w-[25vw] flex-wrap items-stretch rounded-lg bg-white ">
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
                    <table className=" border-collapse   text-[12px] lg:text-sm">
                      <thead className=" rounded ">
                        <tr>
                          <th className="border px-20 md:px-20 lg:px-40 bg-[#1C274C] p-2 border-[#4784a0] text-white font-semibold ">
                            Nombres
                          </th>
                          <th className="border hidden sm:table-cell px-10 md:px-20 lg:px-20 bg-[#1C274C] p-2 border-[#4784a0] text-white font-semibold ">
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
                                className=" text-[11px] md:text-[13px]"
                              >
                                <th className="border p-3 text-left bg-white border-slate-300 font-semibold hover:text-[#146898] duration-300 text-[#1C274C]">
                                  {`${student.user.user_lastname} ${student.user.user_name}`}
                                </th>
                                <th className="border hidden sm:table-cell p-3 text-left bg-white border-slate-300 font-semibold hover:text-[#146898] duration-300 text-[#1C274C]">
                                  {student.user.user_email}
                                </th>
                              </tr>
                            ))
                          : studentsTable.map((student) => (
                              <tr
                                key={student.student_id}
                                className=" text-[11px] md:text-[13px]"
                              >
                                <th className="border p-3 text-left bg-white border-slate-300 font-semibold hover:text-[#146898] duration-300 text-[#1C274C]">
                                  {`${student.user.user_lastname} ${student.user.user_name}`}
                                </th>
                                <th className="border hidden sm:table-cell p-3 text-left bg-white border-slate-300 font-semibold hover:text-[#146898] duration-300 text-[#1C274C]">
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
                </div>
              </div>
            ) : (
              <div className=" p-10 flex justify-center items-start w-full h-full ">
                <h1 className=" text-white">Selecciona una carrera</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Degrees;
