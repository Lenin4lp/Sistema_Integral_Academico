import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { getPeriods } from "../../api/academic";
import { getModalities } from "../../api/academic";

function Grades() {
  const { user } = useAuth();
  const [errors, setErrors] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("2023-2024");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");

  const handleDegreeChange = (e) => {
    setSelectedDegree(e.target.value);
  };

  const sortedGrades =
    user && user.role_id === 1
      ? user.roleTable &&
        user.roleTable.grades.sort((a, b) => {
          const groupA = a.group.subject.subject_name;
          const groupB = b.group.subject.subject_name;
          return groupA.localeCompare(groupB);
        })
      : user &&
        user.roleTable &&
        user.roleTable.group.sort((a, b) => {
          const groupA = a.subject.subject_name;
          const groupB = b.subject.subject_name;
          return groupA.localeCompare(groupB);
        });

  const filteredGrades =
    user && user.role_id === 1
      ? sortedGrades &&
        sortedGrades.filter((group) => group.group.period_id === selectedPeriod)
      : sortedGrades &&
        sortedGrades.filter((group) => group.period_id === selectedPeriod);
  const activeGrades =
    user && user.role_id === 1
      ? user.roleTable &&
        user.roleTable.grades
          .filter(
            (grade) =>
              grade.group.group_status === 1 ||
              grade.group.group_status === null
          )
          .sort((a, b) => {
            const groupA = a.group?.subject?.subject_name;
            const groupB = b.group?.subject?.subject_name;
            return groupA.localeCompare(groupB);
          })
      : user.roleTable &&
        user.roleTable.group
          .filter(
            (group) => group.group_status === 1 || group.group_status === null
          )
          .sort((a, b) => {
            const groupA = a?.subject?.subject_name;
            const groupB = b?.subject?.subject_name;
            return groupA.localeCompare(groupB);
          });

  const filteredGroup =
    user.roleTable &&
    user.roleTable.group.find((group) => group.group_id === selectedSubject);

  const FirstGroup = user && user.role_id === 2 && filteredGrades[0];

  const getPeriodsList = async () => {
    try {
      const res = await getPeriods();
      if (res.status === 200) {
        setPeriods(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const getModalityList = async () => {
    try {
      const res = await getModalities();
      if (res.status === 200) {
        setModalities(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    getPeriodsList();
    getModalityList();
    selectedSubject === "" && setSelectedSubject(FirstGroup?.group_id);
  }, []);

  useEffect(() => {
    if (user && user.role_id === 2) {
      setSelectedDegree("");
    }
  }, [selectedSubject]);

  const groupCareers =
    user &&
    user.role_id === 2 &&
    user.roleTable &&
    filteredGroup?.student.reduce((acc, student) => {
      if (!acc.includes(student.degree.degree_name)) {
        acc.push(student.degree.degree_name);
      }
      return acc;
    }, []);

  console.log(filteredGroup);
  console.log(selectedDegree);

  return (
    <div>
      <div className=" overflow-x-hidden relative ">
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
            <div className="  mt-8 md:mt-14 mx-2 md:mx-10 inline-flex items-center justify-center gap-3">
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.54497 8.73005C2 9.79961 2 11.1997 2 14C2 16.8003 2 18.2004 2.54497 19.27C3.02433 20.2108 3.78924 20.9757 4.73005 21.455C5.79961 22 7.19974 22 10 22H14C16.8003 22 18.2004 22 19.27 21.455C20.2108 20.9757 20.9757 20.2108 21.455 19.27C22 18.2004 22 16.8003 22 14C22 11.1997 22 9.79961 21.455 8.73005C20.9757 7.78924 20.2108 7.02433 19.27 6.54497C18.2004 6 16.8003 6 14 6H10C7.19974 6 5.79961 6 4.73005 6.54497C3.78924 7.02433 3.02433 7.78924 2.54497 8.73005ZM15.0595 12.4995C15.3353 12.1905 15.3085 11.7164 14.9995 11.4406C14.6905 11.1647 14.2164 11.1915 13.9406 11.5005L10.9286 14.8739L10.0595 13.9005C9.78359 13.5915 9.30947 13.5647 9.0005 13.8406C8.69152 14.1164 8.66468 14.5905 8.94055 14.8995L10.3691 16.4995C10.5114 16.6589 10.7149 16.75 10.9286 16.75C11.1422 16.75 11.3457 16.6589 11.488 16.4995L15.0595 12.4995Z"
                    fill="#ffffff"
                  />{" "}
                  <path
                    d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z"
                    fill="#ffffff"
                  />{" "}
                </g>
              </svg>
              <h1 className=" text-white underline underline-offset-8 decoration-2 decoration-[#146898] duration-300 text-xl md:text-2xl lg:text-3xl font-semibold font-mono">
                CALIFICACIONES
              </h1>
            </div>
          </div>
          <div className=" flex justify-center items-start mt-5  mx-10 my-10">
            <div className=" grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
              <div className=" col-span-1 block">
                <div className=" flex justify-center items-start">
                  <div className=" m-2 md:m-5 h-fit bg-white w-fit md:w-full rounded-lg">
                    <div className=" m-5 block">
                      <h1 className=" font-semibold text-[#1C274C]">
                        Periodos:
                      </h1>
                      <div className=" mt-5 flex justify-center md:block">
                        {periods
                          .sort((a, b) => {
                            const periodA = a.period_id;
                            const periodB = b.period_id;
                            return periodA.localeCompare(periodB);
                          })
                          .map((period) => (
                            <button
                              key={period.period_id}
                              onClick={() =>
                                setSelectedPeriod(period.period_id)
                              }
                              className={` ${
                                selectedPeriod === period.period_id
                                  ? "bg-[#146898] text-white"
                                  : "bg-[#F6F6F6]"
                              } my-2 p-2 hover:bg-[#146898] text-[#1C274C] hover:text-white duration-300  rounded-lg`}
                            >
                              <h1 className=" text-left text-sm">
                                {period.period_name}
                              </h1>
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
                {user && user.role_id === 2 && (
                  <div className=" flex justify-center items-start">
                    <div className=" m-2 mt-8 h-fit bg-[#4784a0] w-fit md:w-full rounded-lg">
                      <div className=" m-5 block">
                        <h1 className=" font-semibold text-white">Materia:</h1>
                        <div className=" mt-3 flex-wrap justify-center md:block">
                          <p className=" text-sm font-medium text-white">
                            {filteredGroup?.subject.subject_name}
                          </p>
                        </div>
                        <h1 className=" mt-5 font-semibold text-white">
                          Grupo:
                        </h1>
                        <div className=" mt-3 flex-wrap justify-center md:block">
                          <p className=" text-sm font-medium text-white">{`${filteredGroup?.group_name} (${filteredGroup?.group_id})`}</p>
                        </div>
                        <h1 className=" mt-5 font-semibold text-white">
                          Nº de estudiantes:
                        </h1>
                        <div className=" mt-3 flex-wrap justify-center md:block">
                          <p className=" text-sm font-medium text-white">
                            {filteredGroup?.student.length}
                          </p>
                        </div>
                        <div className=" py-8 flex justify-center items-center">
                          <button className=" p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#146898] text-white hover:text-white text-[13px] duration-500">
                            Obtener reporte
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className=" col-span-1 md:col-span-3 lg:col-span-4 flex justify-center items-start">
                <div className=" m-5 h-fit w-fit rounded-lg">
                  <div className=" flex justify-center items-start mb-10 mt-0 mx-5">
                    <div className=" block">
                      <h1 className=" text-center text-white mb-10 font-semibold text-xl md:text-2xl underline underline-offset-8 decoration-[#146898]">
                        Registro de calificaciones
                      </h1>
                      {user &&
                      user.role_id === 1 &&
                      filteredGrades.length > 0 ? (
                        <div className=" flex justify-center items-center mt-5">
                          <table className=" border-collapse   text-[10px] sm:text-sm">
                            <thead className=" rounded text-[12px]">
                              <tr>
                                <th className="  font-semibold text-[#1C274C]"></th>
                                <th
                                  className="border hidden lg:table-cell bg-[#1C274C] p-2 border-[#4784a0] text-white font-semibold "
                                  colSpan="5"
                                >
                                  1er hemisemestre
                                </th>
                                <th
                                  className="border hidden lg:table-cell bg-[#1C274C] p-2 border-[#4784a0] text-white font-semibold"
                                  colSpan="5"
                                >
                                  2do hemisemestre
                                </th>
                                <th className="  font-semibold text-[#1C274C]"></th>
                              </tr>
                              <tr>
                                <th className=" border bg-[#1C274C] py-2 px-10 sm:px-20 border-[#4784a0] font-semibold text-white">
                                  Materia
                                </th>
                                <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                  Nota 1
                                </th>
                                <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                  Nota 2
                                </th>
                                <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                  Prueba
                                </th>
                                <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                  Examen
                                </th>
                                <th className=" border p-2 hidden bg-[#1C274C]	sm:table-cell border-slate-300 font-semibold  text-white ">
                                  Prom 1
                                </th>
                                <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                  Nota 1
                                </th>
                                <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                  Nota 2
                                </th>
                                <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                  Prueba
                                </th>
                                <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                  Examen
                                </th>
                                <th className=" border p-2 hidden bg-[#1C274C]	sm:table-cell border-slate-300 font-semibold  text-white ">
                                  Prom 2
                                </th>
                                <th className=" border p-2 hidden sm:table-cell bg-[#1C274C] border-slate-300 font-semibold text-white">
                                  Recup.
                                </th>
                                <th className=" border p-2 bg-[#1C274C] border-slate-300 font-semibold text-white">
                                  Nota final
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedPeriod === ""
                                ? user.roleTable &&
                                  activeGrades.grades.map((group) => (
                                    <tr
                                      key={group.group.group_id}
                                      className=" text-[12px]"
                                    >
                                      <th className="border p-3 text-left bg-white border-slate-300 font-semibold hover:text-[#146898] duration-300 text-[#1C274C]">
                                        <a
                                          href={`/materias/${group.group.group_id}`}
                                        >
                                          {group.group.subject &&
                                            group.group.subject.subject_name}
                                        </a>
                                      </th>

                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.grade_1}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.grade_2}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.test_1}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.exam_1}
                                      </th>
                                      <th className="border p-3 hidden sm:table-cell border-slate-300 bg-white font-semibold text-[#1C274C]">
                                        {group && group.prom_1}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.grade_3}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.grade_4}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.test_2}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.exam_2}
                                      </th>
                                      <th className="border p-3 hidden sm:table-cell bg-white border-slate-300 font-semibold text-[#1C274C]">
                                        {group && group.prom_2}
                                      </th>
                                      <th className="border p-3 hidden sm:table-cell  border-slate-300 font-semibold text-white">
                                        {group && group.resit}
                                      </th>
                                      <th className="border p-3 border-slate-300 bg-white font-semibold text-[#1C274C]">
                                        {group && group.final_grade}
                                      </th>
                                    </tr>
                                  ))
                                : user.roleTable &&
                                  filteredGrades.map((group) => (
                                    <tr
                                      key={group.group.group_id}
                                      className=" text-[12px]"
                                    >
                                      <th className="border p-3 text-left bg-white border-slate-300 font-semibold hover:text-[#146898] duration-300 text-[#1C274C]">
                                        <a
                                          href={`/materias/${group.group.group_id}`}
                                        >
                                          {group.group.subject &&
                                            group.group.subject.subject_name}
                                        </a>
                                      </th>

                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.grade_1}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.grade_2}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.test_1}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.exam_1}
                                      </th>
                                      <th className="border p-3 hidden sm:table-cell border-slate-300 bg-white font-semibold text-[#1C274C]">
                                        {group && group.prom_1}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.grade_3}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.grade_4}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.test_2}
                                      </th>
                                      <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                        {group && group.exam_2}
                                      </th>
                                      <th className="border p-3 hidden sm:table-cell bg-white border-slate-300 font-semibold text-[#1C274C]">
                                        {group && group.prom_2}
                                      </th>
                                      <th className="border p-3 hidden sm:table-cell  border-slate-300 font-semibold text-white">
                                        {group && group.resit}
                                      </th>
                                      <th className="border p-3 border-slate-300 bg-white font-semibold text-[#1C274C]">
                                        {group && group.final_grade}
                                      </th>
                                    </tr>
                                  ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        user &&
                        user.role_id === 1 && (
                          <div className=" h-full py-24 w-full flex justify-center items-center">
                            <h1 className=" text-lg text-center text-white ">
                              Lo siento, no se encontraron resultados
                            </h1>
                          </div>
                        )
                      )}
                      {user &&
                      user.role_id === 2 &&
                      user.roleTable &&
                      filteredGrades.length > 0 ? (
                        <div className=" flex justify-center items-center mt-5">
                          <div className=" block">
                            <div className=" w-full h-fit flex flex-wrap justify-center items-start">
                              {user.roleTable &&
                                filteredGrades.map((group) => (
                                  <div
                                    key={group.group_id}
                                    className=" mx-1 my-2"
                                  >
                                    <button
                                      onClick={() =>
                                        setSelectedSubject(group.group_id)
                                      }
                                      className={` hover:bg-[#4784a0] ${
                                        selectedSubject === group.group_id
                                          ? "bg-[#4784a0]"
                                          : "bg-transparent"
                                      } text-[12px] duration-300 text-white border-t border-r rounded w-[200px] p-2`}
                                    >
                                      {group.subject.subject_name}
                                      <br />
                                      {group.group_name}
                                      <br />
                                      {group.modality_id === 1
                                        ? "(Presencial)"
                                        : "(En línea)"}
                                    </button>
                                  </div>
                                ))}
                            </div>
                            <div className=" w-full h-fit flex justify-end py-10 items-center">
                              <select
                                onChange={handleDegreeChange}
                                className=" w-[230px]"
                                name=""
                                id=""
                              >
                                <option value="">Todas las carreras</option>
                                {user.roleTable &&
                                  groupCareers?.map((group, index) => (
                                    <option key={index} value={group}>
                                      {group}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <table className=" border-collapse   text-[10px] sm:text-sm">
                              <thead className=" rounded text-[12px]">
                                <tr>
                                  <th className="  font-semibold text-[#1C274C]"></th>
                                  <th
                                    className="border hidden lg:table-cell bg-[#1C274C] p-2 border-[#4784a0] text-white font-semibold "
                                    colSpan="5"
                                  >
                                    1er hemisemestre
                                  </th>
                                  <th
                                    className="border hidden lg:table-cell bg-[#1C274C] p-2 border-[#4784a0] text-white font-semibold"
                                    colSpan="5"
                                  >
                                    2do hemisemestre
                                  </th>
                                  <th className="  font-semibold text-[#1C274C]"></th>
                                </tr>
                                <tr>
                                  <th className=" border bg-[#1C274C] py-2 px-10 sm:px-20 border-[#4784a0] font-semibold text-white">
                                    Estudiante
                                  </th>
                                  <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                    Nota 1
                                  </th>
                                  <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                    Nota 2
                                  </th>
                                  <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                    Prueba
                                  </th>
                                  <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                    Examen
                                  </th>
                                  <th className=" border p-2 hidden bg-[#1C274C]	sm:table-cell border-slate-300 font-semibold  text-white ">
                                    Prom 1
                                  </th>
                                  <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                    Nota 1
                                  </th>
                                  <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                    Nota 2
                                  </th>
                                  <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                    Prueba
                                  </th>
                                  <th className=" border p-2 hidden lg:table-cell border-[#4784a0] font-semibold text-white">
                                    Examen
                                  </th>
                                  <th className=" border p-2 hidden bg-[#1C274C]	sm:table-cell border-slate-300 font-semibold  text-white ">
                                    Prom 2
                                  </th>
                                  <th className=" border p-2 hidden sm:table-cell bg-[#1C274C] border-slate-300 font-semibold text-white">
                                    Recup.
                                  </th>
                                  <th className=" border p-2 bg-[#1C274C] border-slate-300 font-semibold text-white">
                                    Nota final
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedDegree === ""
                                  ? user.roleTable &&
                                    filteredGroup?.grades
                                      .sort((a, b) => {
                                        const gradeA =
                                          a.student.user.user_lastname;
                                        const gradeB =
                                          b.student.user.user_lastname;
                                        return gradeA.localeCompare(gradeB);
                                      })
                                      .map((grade) => (
                                        <tr
                                          key={grade && grade.grade_id}
                                          className=" text-[12px]"
                                        >
                                          <th className="border p-3 text-left bg-white border-slate-300 font-semibold hover:text-[#146898] duration-300 text-[#1C274C]">{`${grade.student.user.user_lastname} ${grade.student.user.user_name}`}</th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.grade_1}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.grade_2}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.test_1}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.exam_1}
                                          </th>
                                          <th className="border p-3 hidden sm:table-cell bg-white border-slate-300 font-semibold text-[#1C274C]">
                                            {grade && grade.prom_1}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.grade_3}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.grade_4}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.test_2}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.exam_2}
                                          </th>
                                          <th className="border p-3 hidden sm:table-cell bg-white border-slate-300 font-semibold text-[#1C274C]">
                                            {grade && grade.prom_2}
                                          </th>
                                          <th className="border p-3 hidden sm:table-cell  border-slate-300 font-semibold text-white">
                                            {grade && grade.resit}
                                          </th>
                                          <th className="border p-3 border-slate-300 bg-white font-semibold text-[#1C274C]">
                                            {grade && grade.final_grade}
                                          </th>
                                          <th className="border p-3 border-white font-semibold group  text-[#1C274C]">
                                            <a
                                              href={`/calificaciones/${grade.grade_id}`}
                                            >
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
                                      ))
                                  : user.roleTable &&
                                    filteredGroup?.grades
                                      .sort((a, b) => {
                                        const gradeA =
                                          a.student.user.user_lastname;
                                        const gradeB =
                                          b.student.user.user_lastname;
                                        return gradeA.localeCompare(gradeB);
                                      })
                                      .filter(
                                        (grade) =>
                                          grade.student?.degree?.degree_name ==
                                          selectedDegree
                                      )
                                      .map((grade) => (
                                        <tr
                                          key={grade && grade.grade_id}
                                          className=" text-[12px]"
                                        >
                                          <th className="border p-3 text-left bg-white border-slate-300 font-semibold hover:text-[#146898] duration-300 text-[#1C274C]">{`${grade.student.user.user_lastname} ${grade.student.user.user_name}`}</th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.grade_1}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.grade_2}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.test_1}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.exam_1}
                                          </th>
                                          <th className="border p-3 hidden sm:table-cell bg-white border-slate-300 font-semibold text-[#1C274C]">
                                            {grade && grade.prom_1}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.grade_3}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.grade_4}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.test_2}
                                          </th>
                                          <th className="border p-3 hidden lg:table-cell border-slate-300 font-medium text-white">
                                            {grade && grade.exam_2}
                                          </th>
                                          <th className="border p-3 hidden sm:table-cell bg-white border-slate-300 font-semibold text-[#1C274C]">
                                            {grade && grade.prom_2}
                                          </th>
                                          <th className="border p-3 hidden sm:table-cell  border-slate-300 font-semibold text-white">
                                            {grade && grade.resit}
                                          </th>
                                          <th className="border p-3 border-slate-300 bg-white font-semibold text-[#1C274C]">
                                            {grade && grade.final_grade}
                                          </th>
                                          <th className="border p-3 border-white font-semibold group  text-[#1C274C]">
                                            <a
                                              href={`/calificaciones/${grade.grade_id}`}
                                            >
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
                      ) : (
                        user &&
                        user.role_id === 2 && (
                          <div>
                            <h1>No se encontraron resultados</h1>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grades;
