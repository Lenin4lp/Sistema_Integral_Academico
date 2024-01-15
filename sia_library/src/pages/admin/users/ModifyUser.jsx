import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getDegrees, getModalities } from "../../../api/academic";
import { updateStudent, updateUser, getUser } from "../../../api/user";
import { useNavigate } from "react-router-dom";
import { getPeriods } from "../../../api/academic";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Toaster, toast } from "sonner";

function ModifyUser() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("2023-2024");
  const [periods, setPeriods] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [content, setContent] = useState(1);
  const [user, setUser] = useState();
  const { userId } = useParams();

  const generatePDF = async () => {
    const doc = new jsPDF();

    doc.text("Instituto Superior Tecnológico de la Vera Cruz", 50, 10);
    doc.setFontSize(16);
    doc.text("Hoja de Calificaciones", 10, 30);
    doc.setFontSize(10);
    doc.text(
      `Estudiante: ${user && user.user.user_lastname} ${
        user && user.user.user_name
      }`,
      10,
      50
    );
    doc.text(`C.I: ${user && user.user.user_ci}`, 10, 60);
    doc.text(
      `Carrera: ${user && user.user.student.degree.degree_name}`,
      10,
      70
    );
    doc.text(
      `Periodo: ${
        periods &&
        periods.find((p) => p.period_id === selectedPeriod).period_name
      }`,
      150,
      70
    );

    doc.autoTable({
      head: [
        [
          {
            content: "",
            colSpan: 2,
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
            content: "MATERIA",
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
      body:
        filteredGrades &&
        filteredGrades.map((grade) => {
          return [
            `${grade.group.subject && grade.group.subject.subject_id}`,

            {
              content: `${
                grade.group.subject && grade.group.subject.subject_name
              }`,
              colSpan: 1,
              styles: { halign: "left", valign: "middle" },
            },
            `${grade && grade.prom_1 === null ? `0.00` : grade.prom_1}`,
            `${
              grade && grade.attendance_1 === null ? `0.00` : grade.attendance_1
            }%`,
            `${grade && grade.prom_2 === null ? `0.00` : grade.prom_2}`,
            `${
              grade && grade.attendance_2 === null ? `0.00` : grade.attendance_2
            }`,
            `${grade && grade.resit === null ? `0.00` : grade.resit}`,
            `${
              grade && grade.final_grade === null ? `0.00` : grade.final_grade
            }`,
            `${
              grade && grade.total_attendance === null
                ? `0.00`
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
      startY: 75,
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
    doc.text("MBA. Jorge Macías", 88.5, tableY + 37);
    doc.text("Vicerrector", 94, tableY + 44);

    doc.save(
      `Reporte de Calificaciones ${user?.user.user_lastname} ${
        user?.user.user_name
      } -  ${
        periods &&
        periods.find((p) => p.period_id === selectedPeriod).period_name
      }.pdf`
    );

    toast.success("Reporte de calificaciones descargado");
  };

  useEffect(() => {
    getAUser(userId);
    getDegreesList();
    getModalitiesList();
  }, []);

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const sortedSubjects =
    user &&
    user.user.role_id === 1 &&
    user.user.student.grades.sort((a, b) => {
      const subjectA = a.group?.subject.subject_name || "";
      const subjectB = b.group?.subject.subject_name || "";
      return subjectA.localeCompare(subjectB);
    });

  const filteredGrades =
    user &&
    user.user.role_id === 1 &&
    sortedSubjects &&
    sortedSubjects.filter((group) => group.group.period_id === selectedPeriod);

  const activeGrades =
    user &&
    user.user.role_id === 1 &&
    user.roleTable &&
    user.roleTable.grades
      .filter(
        (grade) =>
          grade.group.group_status === 1 || grade.group.group_status === null
      )
      .sort((a, b) => {
        const groupA = a.group?.subject?.subject_name;
        const groupB = b.group?.subject?.subject_name;
        return groupA.localeCompare(groupB);
      });

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

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};

    if (data.modality_id === "1") {
      data.modality_id = 1;
    } else if (data.modality_id === "2") {
      data.modality_id = 2;
    } else {
      data.modality_id = "";
    }

    if (data.degree_id == "Selecciona la Carrera") {
      data.degree_id = "";
    }

    if (
      data.user_genre === null ||
      data.user_genre === undefined ||
      data.user_genre === "Selecciona el género"
    ) {
      data.user_genre = "";
    }

    if (data.role_id === "1") {
      data.role_id = 1;
    } else if (data.role_id === "2") {
      data.role_id = 2;
    } else if (data.role_id === "3") {
      data.role_id = 3;
    } else {
      data.role_id = "";
    }

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }

    modifiedData.user_status = isChecked;

    ModifyUser(userId, modifiedData);
  });

  const editStudent = async (id, data) => {
    try {
      const res = await updateStudent(id, data);
      if (res.status === 200) {
        toast.success("Usuario actualizado exitosamente");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setErrors(error.response.data);
      toast.error("Error al registrar el usuario", {
        duration: 3000,
      });
    }
  };

  const getAUser = async (id) => {
    try {
      const res = await getUser(id);
      if (res.status === 200) {
        setUser(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ModifyUser = async (id, data) => {
    try {
      const res = await updateUser(id, data);
      if (res.status === 200) {
        if (res.data.role_id === 1) {
          editStudent(userId, data);
        } else {
          toast.success("Usuario actualizado exitosamente");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
        console.log(res.data);
      }
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response.data);
    }
  };

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

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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

  useEffect(() => {
    getPeriodsList();
    getModalitiesList();
  }, []);

  return (
    <div className="my-8 lg:my-14 mx-2 md:mx-10 w-full">
      {content === 1 && (
        <div className=" h-fit block ml-1 lg:ml-10">
          <div className=" font-bold text-xl">
            <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
              {`${user && user.user.user_name} ${
                user && user.user.user_lastname
              }`}
            </h1>
          </div>
          <div className=" font-bold text-xl">
            <div className=" block">
              {user && user.user.role_id === 1 && (
                <>
                  <h1 className=" text-white text-lg lg:text-xl">
                    Carrera:{" "}
                    <span className=" font-normal">{` ${
                      user && user.user.student.degree.degree_name
                    }`}</span>
                  </h1>
                  <h1 className=" text-white text-lg font-medium opacity-50 lg:text-xl">
                    {userId}
                  </h1>
                </>
              )}
              {user && user.user.role_id === 2 && (
                <>
                  <h1 className="text-white text-lg lg:text-xl">Docente</h1>
                  <h1 className=" text-white text-lg font-medium opacity-50 lg:text-xl">
                    {userId}
                  </h1>
                </>
              )}
              {user && user.user.role_id === 3 && (
                <>
                  <h1 className="text-white text-lg lg:text-xl">
                    Administrador
                  </h1>
                  <h1 className=" text-white text-lg font-medium opacity-50 lg:text-xl">
                    {userId}
                  </h1>
                </>
              )}
            </div>
          </div>
          <div className=" block md:inline-flex">
            <Link to={"/admin/usuarios"}>
              <button className=" mt-5 md:mt-10 p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500">
                Regresar
              </button>
            </Link>
            <button
              onClick={() => setContent(2)}
              className=" mt-5 md:mt-10 p-2 active:transform active:scale-90 border border-white bg-transparent mx-7 rounded-lg hover:bg-[#5db6b1] text-white hover:text-[#1C274C] text-sm lg:text-base duration-500"
            >
              Modificar
            </button>
            {user && user.user.role_id === 1 && (
              <button
                onClick={() => setContent(3)}
                className=" mt-5 md:mt-10 p-2 active:transform active:scale-90 border border-white bg-transparent rounded-lg hover:bg-[#4db679] text-white hover:text-[#1C274C] text-sm lg:text-base duration-500"
              >
                Calificaciones
              </button>
            )}
          </div>
          <div className=" mt-14 flex justify-center items-center">
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-sm sm:text-[15px] text-white gap-4">
              <div
                className={` ${
                  (user && user.user.role_id === 3) ||
                  (user && user.user.role_id === 2)
                    ? "hidden"
                    : ""
                } h-[318px] md:h-[400px] lg:h-[368px]   sm:w-[40vw] md:w-[28vw] lg:w-[20vw] border border-slate-300`}
              >
                <div>
                  {user && user.user.role_id === 1 && (
                    <div className="block m-3">
                      <p className=" font-semibold mb-2">Carrera</p>
                      <p className=" mb-3">
                        {user && user.user.student.degree.degree_name}
                      </p>
                      <p className=" font-semibold mb-2">Nivel</p>
                      <p className=" mb-3">-------</p>
                      <p className=" font-semibold mb-2">N° de Cursos</p>
                      <p className=" mb-3">
                        {user &&
                          user.user.student.group.filter(
                            (group) => group.group_status == 1
                          ).length}
                      </p>
                      <p className=" font-semibold mb-2">
                        Cédula de Identidad:
                      </p>
                      <p className=" mb-3">{user && user.user.user_ci}</p>
                      <p className=" font-semibold mb-2">Modalidad</p>
                      <p className=" mb-5">
                        {user && user.user.student.group[0].modality_id === 1
                          ? "Presencial"
                          : "En línea"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div
                className={` ${
                  user && user.user.role_id === 3 ? "hidden" : ""
                } h-[318px] md:h-[400px] lg:h-[368px]   sm:w-[40vw] md:w-[28vw] lg:w-[20vw] border border-slate-300`}
              >
                <div className=" m-3 block ">
                  <p className=" font-semibold mb-3">Cursos</p>
                  <div className=" mb-5">
                    {user &&
                      user.user.role_id === 1 &&
                      user.user.student.group &&
                      user.user.student.group
                        .filter((group) => group.group_status == 1)
                        .map((group) => (
                          <div
                            key={group.group_id}
                            className=" my-2 text-sm hover:text-[#146898]"
                          >
                            <div className=" block">
                              <a href={`/admin/grupos/${group.group_id}`}>
                                <p>{group && group.subject.subject_name}</p>
                              </a>
                              <p className=" text-xs md:text-sm opacity-50">
                                {group.group_id}
                              </p>
                            </div>
                          </div>
                        ))}{" "}
                    {user &&
                      user.user.role_id === 2 &&
                      user.user.teacher.group &&
                      user.user.teacher.group
                        .filter((group) => group.group_status == true)
                        .map((group) => (
                          <div
                            key={group.group_id}
                            className=" my-2 hover:text-[#146898]"
                          >
                            <div className=" block">
                              <a href={`/admin/grupos/${group.group_id}`}>
                                <p className=" text-[12px]">
                                  {group.subject.subject_name}
                                </p>
                              </a>
                              <p className=" text-[12px] opacity-50">
                                {group.group_id}
                              </p>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              </div>

              <div className=" h-[318px] md:h-[400px] lg:h-[368px]   sm:w-[40vw] md:w-[28vw] lg:w-[20vw] border border-slate-300">
                <div className=" m-3 block ">
                  <p className=" font-semibold">Correo institucional</p>
                  <p className=" text-[#146898]  mt-1 mb-4">
                    <a href={`mailto:${user && user.user.user_email}`}>
                      {user && user.user.user_email}
                    </a>
                  </p>
                  <p className=" font-semibold">Fecha de creación</p>
                  <p className=" text-slate-400">
                    {user && user.user.createdAt}
                  </p>
                  <p className=" font-semibold">Última actualizacion</p>
                  <p className=" text-slate-400">
                    {user && user.user.updatedAt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {content === 2 && (
        <div className=" h-fit block ml-1 lg:ml-10">
          <div className=" font-bold text-xl">
            <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
              {`${user && user.user.user_name} ${
                user && user.user.user_lastname
              }`}
            </h1>
          </div>
          <div className=" font-bold text-xl">
            <div className=" block">
              {user && user.user.role_id === 1 && (
                <>
                  <h1 className=" text-white text-lg lg:text-xl">
                    Carrera:{" "}
                    <span className=" font-normal">{` ${
                      user && user.user.student.degree.degree_name
                    }`}</span>
                  </h1>
                  <h1 className=" text-white text-lg font-medium opacity-50 lg:text-xl">
                    {userId}
                  </h1>
                  <h1 className=" text-white mt-10 text-lg lg:text-xl">
                    No. de Materias:{" "}
                    <span className=" font-normal">{` ${
                      user &&
                      user.user.student.group.filter(
                        (group) => group.group_status == 1
                      ).length
                    }`}</span>
                  </h1>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setContent(1)}
            className=" mt-5 md:mt-10 p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
          >
            Regresar
          </button>

          <div className=" my-5 md:my-10 flex justify-center items-center ">
            <form action="">
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className=" mx-5 md:mx-10 my-5 h-fit ">
                  <p className=" text-sm md:text-base text-white">Nombres</p>
                  <input
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                    {...register("user_name", {
                      maxLength: 30,
                      required: false,
                    })}
                  />
                </div>
                <div className="mx-5 md:mx-10 my-5 h-fit ">
                  <p className=" text-sm md:text-base text-white">Apellidos</p>
                  <input
                    name="last_name"
                    type="text"
                    placeholder="Apellidos"
                    className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                    {...register("user_lastname", { required: false })}
                  />
                </div>
                <div className="mx-5 md:mx-10 my-5 h-fit ">
                  <p className=" text-sm md:text-base text-white">
                    Cédula o Pasaporte
                  </p>
                  <input
                    name="ci"
                    type="number"
                    placeholder="1777777777"
                    className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                    {...register("user_ci", {
                      maxLength: 10,
                      required: false,
                      minLength: 9,
                      pattern: "[0-9]+",
                    })}
                  />
                </div>
                <div className="mx-5 md:mx-10 my-5 h-fit ">
                  <p className=" text-sm md:text-base text-white">
                    Correo Institucional
                  </p>
                  <input
                    name="email"
                    type="email"
                    placeholder="usuario@istvc.edu.ec"
                    className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                    {...register("user_email", { required: false })}
                  />
                </div>
                <div className="mx-5 md:mx-10 my-5 h-fit ">
                  <p className=" text-sm md:text-base text-white">
                    Nacionalidad
                  </p>
                  <input
                    name="citizenship"
                    type="text"
                    placeholder="ecuatoriana"
                    className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                    {...register("user_Citizenship", { required: false })}
                  />
                </div>
                <div className="mx-5 md:mx-10 my-5 h-fit ">
                  <p className=" text-sm md:text-base text-white">Teléfono</p>
                  <input
                    name="ci"
                    type="number"
                    placeholder="0999999999"
                    className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                    {...register("user_phone", {
                      maxLength: 10,
                      required: false,
                      minLength: 9,
                      pattern: "[0-9]+",
                    })}
                  />
                </div>
                <div className="mx-5 md:mx-10 my-5 h-fit ">
                  <p className=" text-sm md:text-base text-white">Género</p>
                  <select
                    className=" w-42 md:w-56 lg:w-full bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mt-3"
                    {...register("user_genre")}
                  >
                    <option>Selecciona el género</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>

                <div className="mx-5 md:mx-10 my-5 h-fit ">
                  <p className=" text-sm md:text-base text-white">Contraseña</p>
                  <input
                    name="password"
                    type="password"
                    placeholder="**********************"
                    className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                    {...register("user_password", {
                      maxLength: 20,
                      required: false,
                      minLength: 6,
                    })}
                  />
                </div>
              </div>
              <div className=" grid grid-cols-1">
                <div className="mx-5 md:mx-10 my-5 h-fit ">
                  <p className=" text-sm md:text-base text-white">Dirección</p>
                  <textarea
                    className="w-full lg:w-full bg-white text-[1rem] h-40 font-normal placeholder-[#1c274cbb] text-[#1C274C] border border-gray-200 rounded py-2 px-1 mt-3"
                    type="text"
                    cols={2}
                    placeholder="Dirección"
                    {...register("user_direction", { maxLength: 80 })}
                  />
                </div>
                {user && user.user.role_id === 1 && (
                  <div className=" mt-5 flex justify-center items-center">
                    <div className=" block">
                      <div className=" flex justify-center items-center">
                        <div className=" h-[3px] w-[50vw] bg-[#146898]"></div>
                      </div>
                      <div className="flex justify-center items-center">
                        <h1 className=" my-5 text-base md:text-lg text-white font-semibold">
                          Perfil Academico
                        </h1>
                      </div>

                      <div className=" grid grid-cols-1 md:grid-cols-2 m-1 md:m-14">
                        <div className="sm:mx-5 md:mx-10 my-5 h-fit ">
                          <p className=" text-white text-sm md:text-base">
                            Modalidad
                          </p>
                          <select
                            className=" w-42 md:w-56 lg:w-full bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mt-3"
                            {...register("modality_id")}
                            
                          >
                          <option value={""}>Seleccione una modalidad</option>
                            {modalities.map((modality) => (
                              <option
                                value={modality.modality_id}
                                key={modality.modality_id}
                              >
                                {modality.modality_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="sm:mx-5 md:mx-10 my-5 h-fit ">
                          <p className=" text-white text-sm md:text-base">
                            Carrera
                          </p>
                          <select
                            className=" w-44 md:w-56 lg:w-full bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mt-3"
                            {...register("degree_id")}
                          >
                            <option value={""}>Seleccione una carrera</option>
                            {degrees &&
                              degrees.map((degree) => (
                                <option
                                  value={degree.degree_id}
                                  key={degree.degree_id}
                                >
                                  {degree.degree_name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`${
                    user && user.user.role_id === 3 ? "hidden" : ""
                  } mx-5 md:mx-10 flex justify-center items-center my-5 h-fit `}
                >
                  <label className="themeSwitcherTwo relative py-5 inline-flex cursor-pointer select-none items-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      className="sr-only"
                      value={isChecked}
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
              </div>

              <div className=" flex justify-center items-center">
                <button
                  onClick={onSubmit}
                  className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
          <div className=" flex justify-center items-center">
            <div className=" block">
              {errors && errors.length > 0 && (
                <div className=" bg-red-800 w-fit p-1 text-white text-center rounded">
                  {errors[0]}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {content === 3 && (
        <div className=" h-fit block ml-1 lg:ml-10">
          <div className=" font-bold text-xl">
            <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
              {`${user && user.user.user_name} ${
                user && user.user.user_lastname
              }`}
            </h1>
          </div>
          <div className=" font-bold text-xl">
            <div className=" block">
              {user && user.user.role_id === 1 && (
                <>
                  <h1 className=" text-white text-lg lg:text-xl">
                    Carrera:{" "}
                    <span className=" font-normal">{` ${
                      user && user.user.student.degree.degree_name
                    }`}</span>
                  </h1>
                  <h1 className=" text-white text-lg font-medium opacity-50 lg:text-xl">
                    {userId}
                  </h1>
                </>
              )}
            </div>
            <div className=" block md:inline-flex">
              <button
                onClick={() => setContent(1)}
                className=" mt-5 md:mt-10 p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
              >
                Regresar
              </button>
            </div>
          </div>
          <div className=" flex justify-center items-start mt-5 my-5">
            <div className=" grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
              <div className=" col-span-1 block">
                <div className=" flex justify-center items-start">
                  <div className=" m-2 md:m-5 h-fit bg-white w-fit md:w-full rounded-lg">
                    <div className=" m-5 block">
                      <h1 className=" font-semibold text-[#1C274C]">
                        Periodos:
                      </h1>
                      <div className=" mt-5 flex-wrap sm:flex justify-center md:block">
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
              </div>
              <div className=" col-span-1 md:col-span-3 lg:col-span-4 flex justify-center items-start">
                <div className=" m-5 h-fit w-fit rounded-lg">
                  <div className=" flex justify-center items-start mb-10 mt-0 mx-5">
                    <div className=" block">
                      <h1 className=" text-center text-white mb-10 font-semibold text-xl md:text-2xl underline underline-offset-8 decoration-[#146898]">
                        Registro de calificaciones
                      </h1>
                      {user &&
                      user.user.role_id === 1 &&
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
                        user.user.role_id === 1 && (
                          <div className=" h-full py-24 w-full flex justify-center items-center">
                            <h1 className=" text-lg text-center text-white ">
                              Lo siento, no se encontraron resultados
                            </h1>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={generatePDF}
              className=" p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#146898] text-white hover:text-white text-[13px] duration-500"
            >
              Obtener reporte
            </button>
          </div>
        </div>
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default ModifyUser;
