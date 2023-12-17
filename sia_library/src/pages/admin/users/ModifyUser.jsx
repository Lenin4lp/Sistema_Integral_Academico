import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getDegrees, getModalities, getGroups } from "../../../api/academic";
import {
  updateStudent,
  updateUser,
  getUser,
  getStudents,
  getUsers,
} from "../../../api/user";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ModifyUser() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [content, setContent] = useState(1);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const { userId } = useParams();

  console.log(user && user.user?.student.group[0].period?.period_id);

  const generatePDF = async () => {
    const doc = new jsPDF();

    doc.text("Instituto Superior Tecnologico de la Vera Cruz", 50, 10);
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
    doc.text(
      `Carrera: ${user && user.user.student.degree.degree_name}`,
      10,
      60
    );
    doc.text(
      `Periodo: ${user && user.user?.student.group[0].period?.period_name}`,
      150,
      60
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
        sortedSubjects &&
        sortedSubjects.map((grade) => {
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
            `100%`,
            `${grade && grade.prom_2 === null ? `0.00` : grade.prom_2}`,
            `100%`,
            `${grade && grade.resit === null ? `0.00` : grade.resit}`,
            `${
              grade && grade.final_grade === null ? `0.00` : grade.final_grade
            }`,
            `100%`,
            `${grade && grade.final_grade < 7 ? "REPROBADO" : "APROBADO"}`,
          ];
        }),
      theme: "plain",
      startY: 65,
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
      } - ${
        user?.user.student.group.subject &&
        user?.user.student.group.subject?.subject_name
      } ${user?.user.student.group && user?.user.student.group.group_name} ${
        user?.user.student.group && user?.user.student?.group?.period?.period_id
      }.pdf`
    );
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
    user.user.student.grades.sort((a, b) => {
      const subjectA = a.group?.subject.subject_name || "";
      const subjectB = b.group?.subject.subject_name || "";
      return subjectA.localeCompare(subjectB);
    });

  console.log(sortedSubjects);

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

    if (modifiedData.user_status === true) {
      modifiedData.user_status = false;
    } else if (modifiedData.user_status === false) {
      modifiedData.user_status = true;
    }

    ModifyUser(userId, modifiedData);
  });

  const editStudent = async (id, data) => {
    try {
      const res = await updateStudent(id, data);
      if (res.status === 200) {
        alert("Usuario actualizado exitosamente");
        navigate("/admin/usuarios");
      }
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response.data);
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
          alert("Usuario actualizado exitosamente");
          navigate("/admin/usuarios");
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

  console.log(user);

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
                  user && user.user.role_id === 3 ? "hidden" : ""
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
                            (group) =>
                              group.group_status === 1 ||
                              group.group_status === null
                          ).length}
                      </p>
                      <p className=" font-semibold mb-2">Modalidad</p>
                      <p className=" mb-5">
                        {user && user.user.student.group[0].modality_id === 1
                          ? "Presencial"
                          : "En línea"}
                      </p>
                    </div>
                  )}
                  {user && user.user.role_id === 3 && <></>}
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
                        .filter(
                          (group) =>
                            group.group_status === 1 ||
                            group.group_status === null
                        )
                        .map((group) => (
                          <div
                            key={group.group_id}
                            className=" my-2 hover:text-[#146898]"
                          >
                            <div className=" block">
                              <a href={`/cursos/${group.group_id}`}>
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
                      user.user.teacher.group.map((group) => (
                        <div
                          key={group.group_id}
                          className=" my-2 hover:text-[#146898]"
                        >
                          <div className=" block">
                            <a href={`/cursos/${group.group_id}`}>
                              <p>{group.subject.subject_name}</p>
                            </a>
                            <p className=" text-xs md:text-sm opacity-50">
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
                        (group) =>
                          group.group_status === 1 ||
                          group.group_status === null
                      ).length
                    }`}</span>
                  </h1>
                </>
              )}
              {user && user.user.role_id === 2 && (
                <>
                  <h1 className="text-white text-lg lg:text-xl">Docente</h1>
                  <h1 className=" text-white text-lg font-medium opacity-50 lg:text-xl">
                    {userId}
                  </h1>
                  <h1 className=" text-white mt-10 text-lg lg:text-xl">
                    No. de Materias:{" "}
                    <span className=" font-normal">{` ${
                      user &&
                      user.user.teacher.group.filter(
                        (group) =>
                          group.group_status === 1 ||
                          group.group_status === null
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
              <Link to={"/admin/usuarios"}>
                <button className=" mt-5 md:mt-10 p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500">
                  Regresar
                </button>
              </Link>
            </div>
          </div>
          <div className=" flex justify-center items-center my-10">
            <div className=" block">
              <h1 className=" text-lg underline underline-offset-4 decoration-2 decoration-[#146898] md:text-2xl lg:text-3xl mb-10 text-center font-bold text-white">
                Calificaciones
              </h1>
              <>
                <div className=" flex justify-center items-center ">
                  <table className=" border-collapse border border-slate-400 text-[10px] sm:text-sm">
                    <thead className=" rounded">
                      <tr>
                        <th className=" border border-[#151c31] font-semibold text-[#1C274C] "></th>
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
                        <th className=" border border-white font-semibold text-[#1C274C]"></th>
                      </tr>
                      <tr>
                        <th className=" border bg-white py-2 px-10 sm:px-24 border-slate-300 font-semibold text-[#1C274C]">
                          Materia
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
                        <th className="border p-2 hidden bg-white	sm:table-cell border-slate-300 font-semibold lg:bg-[#1C274C] text-[#1C274C] lg:text-white">
                          Prom 2
                        </th>
                        <th className=" border p-2 hidden sm:table-cell bg-white border-slate-300 font-semibold text-[#1C274C]">
                          Supletorio
                        </th>
                        <th className="border p-2 bg-white border-slate-300 font-semibold text-[#1C274C]">
                          Nota final
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedSubjects &&
                        sortedSubjects
                          .filter(
                            (grade) =>
                              grade.group.group_status === 1 ||
                              grade.group.group_status === null
                          )
                          .map((grade) => (
                            <tr key={grade.grade_id}>
                              <th className="border p-3 text-left border-slate-300 font-semibold text-white">
                                {grade.group.subject &&
                                  grade.group.subject.subject_name}
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
                          ))}
                    </tbody>
                  </table>
                </div>
                <div className=" flex justify-center items-center mt-5">
                  <button
                    onClick={generatePDF}
                    className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#6e1498] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
                  >
                    Obtener Reporte
                  </button>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModifyUser;
