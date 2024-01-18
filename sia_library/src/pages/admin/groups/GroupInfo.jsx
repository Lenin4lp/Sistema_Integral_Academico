import React, { useState, useEffect } from "react";
import Cards from "../../../components/Cards";
import { Link } from "react-router-dom";
import {
  getGroup,
  assignStudentToGroup,
  updateGroup,
  getModalities,
  deleteStudentFromGroup,
} from "../../../api/academic";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getStudents, getTeachers } from "../../../api/user";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Toaster, toast } from "sonner";

function GroupInfo() {
  const { groupId2 } = useParams();
  const [group, setGroup] = useState();
  const [errors, setErrors] = useState([]);
  const [page, setPage] = useState(1);
  const [isChecked, setIsChecked] = useState(true);
  const { register, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");

  const handleDegreeChange = (e) => {
    setSelectedDegree(e.target.value);
  }

  const getTeacherList = async () => {
    try {
      const res = await getTeachers();
      if (res.status === 200) {
        setTeachers(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const modifyGroup = async (id, data) => {
    try {
      const res = await updateGroup(id, data);
      if (res.status === 200) {
        toast.success("Grupo actualizado exitosamente");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setErrors(error.response.data);
      toast.error("Error al actualizar el grupo", {
        duration: 3000,
      });
    }
  };

  const removeStudentFromGroup = async (id, student) => {
    try {
      const res = await deleteStudentFromGroup(id, student);
      if (res.status === 204) {
        toast.success("Estudiante eliminado exitosamente");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
      toast.error("Error al eliminar el estudiante", {
        duration: 3000,
      });
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
      setErrors(error.response.data);
    }
  };

  const getStudentList = async () => {
    try {
      const res = await getStudents();
      if (res.status === 200) {
        setUsers(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const generatePDF = async () => {
    const doc = new jsPDF();

    doc.text("Instituto Superior Tecnológico de la Vera Cruz", 50, 10);
    doc.setFontSize(16);
    doc.text("Hoja de Calificaciones", 10, 30);
    doc.setFontSize(10);
    doc.text(`Materia: ${group?.subject.subject_name}`, 10, 50);
    doc.text(`Grupo: ${group?.group_name}`, 10, 60);
    doc.text(`Periodo: ${group?.period.period_name}`, 150, 60);
    doc.text(
      `Docente: ${group?.teacher.user.user_name} ${group?.teacher.user.user_lastname}`,
      10,
      70
    );
    doc.text(`${selectedDegree === ""?``:`Carrera: ${selectedDegree}`}`, 10, 80);

    // crear una tabla
    doc.autoTable({
      head: [
        [
          {
            content: "",
            colSpan: 3,
            styles: { halign: "center", lineWidth: 0 },
          },
          {
            content: "1er\nHEMISEMESTRE",
            colSpan: 2,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "2do\nHEMISEMESTRE",
            colSpan: 2,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "RECUP.",
            colSpan: 1,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "PROMEDIO",
            colSpan: 2,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "ESTADO",
            colSpan: 1,
            rowSpan: 2,
            styles: { halign: "center", valign: "middle" },
          },
        ],
        [
          {
            content: "ID",
            colSpan: 1,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "CEDULA",
            colSpan: 1,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "NOMBRES",
            colSpan: 1,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "NOTA",
            colSpan: 1,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "ASIST",
            colSpan: 1,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "NOTA",
            colSpan: 1,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "ASIST",
            colSpan: 1,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "NOTA",
            colSpan: 1,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "NOTA",
            colSpan: 1,
            styles: { halign: "center", valign: "middle" },
          },
          {
            content: "ASIST",
            colSpan: 1,
            styles: { halign: "center", valign: "middle" },
          },
        ],
      ],
      body: selectedDegree === "" ?
        sortedGrades &&
        sortedGrades.map((grade) => {
          return [
            `${grade.student && grade.student.student_id}`,
            `${grade.student && grade.student.user.user_ci}`,

            {
              content: `${grade.student && grade.student.user.user_lastname} ${
                grade.student && grade.student.user.user_name
              }`,
              colSpan: 1,
              styles: { halign: "left", valign: "middle" },
            },
            `${grade && grade.prom_1 === null ? `0.00` : grade.prom_1}`,
            `${
              grade && grade.attendance_1 === null
                ? `0%`
                : `${grade.attendance_1}%`
            }`,
            `${grade && grade.prom_2 === null ? `0.00` : grade.prom_2}`,
            `${
              grade && grade.attendance_2 === null
                ? `0%`
                : `${grade.attendance_2}%`
            }`,
            `${grade && grade.resit === null ? `0.00` : grade.resit}`,
            `${
              grade && grade.final_grade === null ? `0.00` : grade.final_grade
            }`,
            `${
              grade && grade.total_attendance === null
                ? `0%`
                : `${grade.total_attendance}%`
            }`,
            `${
              grade && grade.final_grade > 7
                ? "APROBADO"
                : grade.total >= 6.5
                ? "APROBADO"
                : "REPROBADO"
            }`,
          ];
        }):sortedGrades &&
        sortedGrades.filter((grade)=> grade.student?.degree?.degree_name == selectedDegree).map((grade) => {
          return [
            `${grade.student && grade.student.student_id}`,
            `${grade.student && grade.student.user.user_ci}`,

            {
              content: `${grade.student && grade.student.user.user_lastname} ${
                grade.student && grade.student.user.user_name
              }`,
              colSpan: 1,
              styles: { halign: "left", valign: "middle" },
            },
            `${grade && grade.prom_1 === null ? `0.00` : grade.prom_1}`,
            `${
              grade && grade.attendance_1 === null
                ? `0%`
                : `${grade.attendance_1}%`
            }`,
            `${grade && grade.prom_2 === null ? `0.00` : grade.prom_2}`,
            `${
              grade && grade.attendance_2 === null
                ? `0%`
                : `${grade.attendance_2}%`
            }`,
            `${grade && grade.resit === null ? `0.00` : grade.resit}`,
            `${
              grade && grade.final_grade === null ? `0.00` : grade.final_grade
            }`,
            `${
              grade && grade.total_attendance === null
                ? `0%`
                : `${grade.total_attendance}%`
            }`,
            `${
              grade && grade.final_grade > 7
                ? "APROBADO"
                : grade.total >= 6.5
                ? "APROBADO"
                : "REPROBADO"
            }`,
          ];
        }),
      theme: "plain",
      startY: 85,
      headStyles: {
        lineWidth: 0.2,
        lineColor: [0, 0, 0],
        fontSize: 7,
      },
      bodyStyles: {
        halign: "center",
        fontSize: 7,
        lineWidth: 0.05,
        lineColor: [0, 0, 0],
      },
    });

    const tableY = doc.lastAutoTable.finalY;

    doc.setFontSize(8);
    doc.text("______________", 90, tableY + 30);
    doc.text("Docente", 96, tableY + 37);

    doc.save(
      `Reporte de Calificaciones ${
        group.subject && group.subject.subject_name
      } ${group && group.group_name} ${group && group.period.period_id}.pdf`
    );

    toast.success("Reporte de calificaciones descargado");
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const AddStudentToGroup = async (id, data) => {
    try {
      const res = await assignStudentToGroup(id, data);
      if (res.status === 200) {
        toast.success("Estudiante agregado exitosamente");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
      toast.error("Error al agregar estudiante", {
        duration: 3000,
      });
    }
  };

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

    console.log(sortedGrades);

    const careers = group && group?.student?.reduce((acc, student) => {
      if (!acc.includes(student.degree?.degree_name)) {
        acc.push(student.degree?.degree_name);
      }
      return acc;
    },[])

    console.log(careers);

  const sortedUsers =
    group &&
    group.student.sort((a, b) => {
      const lastNameA = a.user?.user_lastname || "";
      const lastNameB = b.user?.user_lastname || "";
      return lastNameA.localeCompare(lastNameB);
    });

  const sortedStudents =
    users &&
    users.sort((a, b) => {
      const lastNameA = a.user?.user_lastname || "";
      const lastNameB = b.user?.user_lastname || "";
      return lastNameA.localeCompare(lastNameB);
    });
  console.log(sortedStudents);

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};

    if (data.student_id == "") {
      toast.error("Por favor selecciona un estudiante");
    }

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }

    AddStudentToGroup(groupId2, modifiedData);
  });

  const onDelete = handleSubmit((data) => {
    removeStudentFromGroup(groupId2, data.student_id);
  });

  const onSubmit2 = handleSubmit((data) => {
    const modifiedData = {};

    if (data.modality_id === "1") {
      data.modality_id = 1;
    } else if (data.modality_id === "2") {
      data.modality_id = 2;
    } else {
      data.modality_id = "";
    }

    if (data.teacher_id == "Selecciona un docente") {
      data.teacher_id = "";
    }

    if (data.period_id == "Selecciona un periodo") {
      data.period_id = "";
    }

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }

    modifiedData.group_status = isChecked;

    modifyGroup(groupId2, modifiedData);
  });

  const estudiantesMatriculados =
    sortedUsers && sortedUsers.map((student) => student.student_id);

  const estudiantesDisponibles = sortedStudents.filter(
    (student) =>
      estudiantesMatriculados &&
      !estudiantesMatriculados.includes(student.student_id)
  );

  console.log(studentId);

  useEffect(() => {
    getAGroup(groupId2);
    getStudentList();
    getModalitiesList();
    getTeacherList();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

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
                ? ` ${group.teacher.user.user_name.split(" ")[0]} ${
                    group.teacher.user.user_lastname.split(" ")[0]
                  }`
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
        <div className=" font-bold text-base mt-5">
          <h1 className=" text-white text-base lg:text-xl ">
            Periodo:
            <span className=" font-normal">
              <span className=" font-normal">{` ${
                group && group.period_id
              }`}</span>
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
              <div className=" mt-10 flex justify-center items-center md:mt-20">
                <button
                  onClick={() => removeGroup(groupId2)}
                  className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#981426] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
                >
                  Eliminar Grupo
                </button>
              </div>
            </div>
          </div>
        )}
        {page === 2 && (
          <>
            <div className=" mt-7 flex">
              <button
                onClick={() => setPage(1)}
                className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
              >
                Regresar
              </button>
              <button
                onClick={() => setPage(5)}
                className=" ml-10 p-2 border border-white active:transform active:scale-90 bg-transparent rounded-lg hover:bg-[#f1ce2f] text-white hover:text-[#1C274C] text-sm lg:text-base duration-500"
              >
                Matricular alumno
              </button>
              <button
                onClick={() => setPage(6)}
                className=" ml-10 p-2 border border-white active:transform active:scale-90 bg-transparent rounded-lg hover:bg-[#981414] text-white text-sm lg:text-base duration-500"
              >
                Eliminar alumno
              </button>
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
                  {
                  sortedUsers &&
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
                            ? "Activo"
                            : "Inactivo"}
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
              <button
                onClick={() => setPage(1)}
                className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
              >
                Regresar
              </button>
            </div>
            <div className="  z-10 bg-[#151c31]">
              <div className=" py-10">
                <div className="  flex justify-center items-center ">
                  <div className=" block">
                    <div className=" w-full h-fit flex justify-center sm:justify-end py-10 items-center">
                      <select onChange={handleDegreeChange} className=" w-[180px] text-sm md:w-[230px]" id="">
                        <option value="">Todas las carreras</option>
                        {sortedGrades && careers?.map((career, index) => (
                          <option key={index} value={career}>
                            {career}
                          </option>
                        ))}
                      </select>
                    </div>
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
                          <th className=" bg-[#1C274C] border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                            Nota 1
                          </th>
                          <th className="bg-[#1C274C] border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                            Nota 2
                          </th>
                          <th className="bg-[#1C274C] border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                            Prueba
                          </th>
                          <th className="bg-[#1C274C] border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                            Examen
                          </th>
                          <th className=" border p-2 hidden bg-white	sm:table-cell border-slate-300 font-semibold lg:bg-[#1C274C] text-[#1C274C] lg:text-white">
                            Prom 1
                          </th>
                          <th className="bg-[#1C274C] border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                            Nota 1
                          </th>
                          <th className="bg-[#1C274C] border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                            Nota 2
                          </th>
                          <th className="bg-[#1C274C] border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                            Prueba
                          </th>
                          <th className="bg-[#1C274C] border p-2 hidden lg:table-cell border-slate-300 font-semibold text-white">
                            Examen
                          </th>
                          <th className=" border p-2 hidden bg-white	sm:table-cell border-slate-300 font-semibold lg:bg-[#1C274C] text-[#1C274C] lg:text-white">
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
                        { selectedDegree === "" ?
                        sortedGrades &&
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
                                <a
                                  href={`/admin/grupos/calificaciones/${grade.grade_id}`}
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
                          )):sortedGrades &&
                          sortedGrades.filter((grade)=> grade.student?.degree?.degree_name == selectedDegree).map((grade) => (
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
                                <a
                                  href={`/admin/grupos/calificaciones/${grade.grade_id}`}
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
                          )) }
                      </tbody>
                    </table>
                    <div className=" flex justify-center items-center mt-5">
                      <button
                        onClick={generatePDF}
                        className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#6e1498] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
                      >
                        Obtener Reporte
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {page === 4 && (
          <>
            <div>
              <button
                onClick={() => setPage(1)}
                className="font-medium mt-10 rounded bg-transparent px-3 py-1.5 text-[10px] sm:text-sm text-white border border-white w-28 hover:bg-[#146898] transition-all duration-300 "
              >
                Regresar
              </button>
            </div>
            <div className=" font-bold text-xl mt-6 md:mt-10">
              <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
                Modificar Grupo
              </h1>
            </div>

            <div className=" my-5 md:my-10 flex justify-center items-center ">
              <form action="">
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <div className=" mx-5 md:mx-10 my-5 h-fit ">
                    <p className=" text-sm md:text-base text-white">
                      Nombre del Grupo
                    </p>
                    <input
                      name="name"
                      type="text"
                      placeholder="Grupo X"
                      className=" w-36 sm:w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                      {...register("group_name", {
                        maxLength: 30,
                        required: false,
                      })}
                    />
                  </div>

                  <div className="mx-5 md:mx-10 my-5 h-fit ">
                    <p className=" text-sm md:text-base text-white">
                      Modalidades
                    </p>
                    <select
                      className=" w-36 sm:w-42 md:w-56 lg:w-full bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mt-3"
                      {...register("modality_id")}
                    >
                      <option>Selecciona la modalidad</option>
                      {modalities &&
                        modalities.map((modality) => (
                          <option
                            value={modality.modality_id}
                            key={modality.modality_id}
                          >
                            {modality.modality_id === 1
                              ? "Presencial"
                              : "En línea"}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mx-5 md:mx-10 my-5 h-fit ">
                    <p className=" text-sm md:text-base text-white">Docente</p>
                    <select
                      className=" w-36 sm:w-42 md:w-56 lg:w-full bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mt-3"
                      {...register("teacher_id")}
                    >
                      <option>Selecciona un docente</option>
                      {teachers &&
                        teachers.map((teacher) => (
                          <option
                            value={teacher.teacher_id}
                            key={teacher.teacher_id}
                          >
                            {`${teacher.user.user_name.split(" ")[0]} ${
                              teacher.user.user_lastname.split(" ")[0]
                            }`}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="mx-5 md:mx-10 flex justify-center items-center my-5 h-fit ">
                  <label className="themeSwitcherTwo relative py-5 inline-flex cursor-pointer select-none items-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="sr-only"
                    />
                    <span className="label flex items-center text-sm font-medium text-white">
                      Inactivo
                    </span>
                    <span
                      className={`slider mx-4 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                        isChecked ? "bg-[#3269a3]" : "bg-[#CCCCCE]"
                      }`}
                    >
                      <span
                        className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                          isChecked ? "translate-x-[28px]" : ""
                        }`}
                      ></span>
                    </span>
                    <span className="label flex items-center text-sm font-medium text-white">
                      Activo
                    </span>
                  </label>
                </div>
                <div className=" flex justify-center items-center">
                  <button
                    onClick={onSubmit2}
                    className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
                  >
                    Guardar Cambios
                  </button>
                </div>
                <div className=" mt-10 flex justify-center items-center">
                  <div className=" block">
                    {errors && errors.length > 0 && (
                      <div className=" bg-red-800 w-fit p-1 text-white text-center rounded">
                        {errors[0]}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
        {page === 5 && (
          <>
            <div className=" mt-7 flex">
              <button
                onClick={() => setPage(1)}
                className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
              >
                Regresar
              </button>
            </div>
            <div className=" font-bold mt-10 text-xl">
              <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
                Matricular Usuario
              </h1>
            </div>
            <form className=" mt-5 md:mt-10" action="">
              <select
                className=" w-36 sm:w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mt-3"
                {...register("student_id")}
              >
                <option>Selecciona un estudiante</option>
                {sortedStudents &&
                  estudiantesDisponibles.map((user) => (
                    <option value={user.user.user_id} key={user.user.user_id}>
                      {`${user.user.user_lastname} ${user.user.user_name}`}
                    </option>
                  ))}
              </select>
            </form>
            <button
              onClick={onSubmit}
              className=" p-2 mt-10 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
            >
              Matricular
            </button>

            <div className=" block mt-5 md:mt-10">
              {errors && errors.length > 0 && (
                <div className=" bg-red-800 w-fit p-1 text-white text-center rounded">
                  {errors[0]}
                </div>
              )}
            </div>
          </>
        )}
        {page === 6 && (
          <>
            <div className=" mt-7 flex">
              <button
                onClick={() => setPage(1)}
                className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
              >
                Regresar
              </button>
            </div>
            <div className=" font-bold mt-10 text-xl">
              <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
                Eliminar de la materia
              </h1>
            </div>
            <form className=" mt-5 md:mt-10" action="">
              <select
                onChange={(e) => setStudentId(e.target.value)}
                className=" w-36 sm:w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mt-3"
                {...register("student_id")}
              >
                <option>Selecciona un estudiante</option>
                {sortedUsers &&
                  sortedUsers.map((user) => (
                    <option value={user.user.user_id} key={user.user.user_id}>
                      {`${user.user.user_lastname} ${user.user.user_name}`}
                    </option>
                  ))}
              </select>
            </form>
            <button
              onClick={onDelete}
              className=" p-2 mt-10 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#981414] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
            >
              Eliminar estudiante
            </button>
            <div className=" block mt-5 md:mt-10">
              {errors && errors.length > 0 && (
                <div className=" bg-red-800 w-fit p-1 text-white text-center rounded">
                  {errors[0]}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default GroupInfo;
