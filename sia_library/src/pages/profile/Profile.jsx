import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { getStudent } from "../../api/user";
import { getTeacher } from "../../api/user";

function Profile() {
  const { user } = useAuth();
  const [errors, setErrors] = useState([]);
  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState([]);

  const getAStudent = async (userId) => {
    try {
      const res = await getStudent(userId);
      if (res.status === 200) {
        setStudent(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const getATeacher = async (userId) => {
    try {
      const res = await getTeacher(userId);
      if (res.status === 200) {
        setTeacher(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const sortedGrades =
    student.grades &&
    student.grades.sort((a, b) => {
      const groupA = a.group?.subject.subject_name;
      const groupB = b.group?.subject.subject_name;
      return groupA.localeCompare(groupB);
    });

  console.log(sortedGrades);

  useEffect(() => {
    if (user.role_id === 1) {
      getAStudent(user.user_id);
    } else {
      getATeacher(user.user_id);
    }
  }, []);

  if (user.role_id === 1) {
    console.log(student.grades);
  } else {
    console.log(teacher);
  }
  return (
    <div className="  overflow-x-hidden w-full relative">
      <div className=" fixed top-0 w-full h-fit bg-white z-30">
        <div>
          <h1 className=" text-left text-[12px] md:text-base p-2 text-[#1C274C]">
            Bienvenid@ al <span className=" pl-1 font-bold">S</span>istema{" "}
            <span className=" pl-1 font-bold">I</span>ntegral{" "}
            <span className=" pl-1 font-bold">A</span>cadémico
          </h1>
        </div>
      </div>
      <div className=" m-10 mx-1 sm:mx-3 md:mx-20 h-fit mt-5 w-full flex justify-center items-center">
        <div className=" block">
          <div className="  mb-5 md:mb-10  flex items-center text-xl md:text-3xl font-bold text-white text-left">
            <div className=" flex justify-start items-start">
              <div className="  mt-8 md:mt-14 inline-flex items-center justify-center gap-3">
                <h1 className=" text-white underline underline-offset-8 decoration-2 decoration-[#146898] duration-300 text-xl md:text-2xl lg:text-3xl font-semibold font-mono">
                  {`Hola ${
                    user && user.user_name.split(" ")[0]
                  }, ¿Qué hay de nuevo?`}
                </h1>
              </div>
            </div>
          </div>
          <div className=" overflow-x-hidden w-full h-fit mt-3 flex justify-center items-center">
            <div className="">
              <svg
                className=" w-[100px] h-[100px] md:w-[200px] md:h-[200px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#1C274C"
                strokeWidth="0.00024000000000000003"
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
                    d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z"
                    fill="#ffffff"
                  />{" "}
                  <path
                    d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z"
                    fill="#ffffff"
                  />{" "}
                </g>
              </svg>
            </div>
          </div>
          <div className=" font-semibold text-white mx-3 md:mx-10 text-md md:text-lg flex justify-center items-center">
            {user && user.user_name}
          </div>
          <div className=" font-semibold text-white mx-3 md:mx-10 text-md md:text-lg flex justify-center items-center">
            {user && user.user_lastname}
          </div>
          <div className=" font-bold text-white mx-3 md:mx-10 mt-2 text-sm md:text-md mb-3 flex justify-center items-center">
            {user.role_id === 1 ? "Estudiante" : "Docente"}
          </div>
          <div className=" mt-14 flex justify-center items-center">
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-sm sm:text-[15px] text-white gap-4">
              <div className=" h-[318px] md:h-[400px] lg:h-[368px] w-fit  sm:w-[40vw] md:w-[28vw] lg:w-[20vw] border border-slate-300">
                <div>
                  {user && user.role_id === 1 ? (
                    <div className="block m-3">
                      <p className=" font-semibold mb-2">Carrera</p>
                      <p className=" mb-3">
                        {student.degree && student.degree.degree_name}
                      </p>
                      <p className=" font-semibold mb-2">Nivel</p>
                      <p className=" mb-3">-------</p>
                      <p className=" font-semibold mb-2">N° de Cursos</p>
                      <p className=" mb-3">
                        {student.group && student.group.length}
                      </p>
                      <p className=" font-semibold mb-2">Modalidad</p>
                      <p className=" mb-5">
                        {student.group && student.group[0].modality_id === 1
                          ? "Presencial"
                          : "En línea"}
                      </p>
                    </div>
                  ) : (
                    <div className="block m-3">
                      <p className=" font-semibold mb-2">Profesión</p>
                      <p className=" mb-3">
                        {teacher && teacher.speciality
                          ? teacher.speciality
                          : "No se ha definido ninguna especialidad"}
                      </p>
                      <p className=" font-semibold mb-2">N° de horas</p>
                      <p className=" mb-3">-------</p>
                      <p className=" font-semibold mb-2">N° de Cursos</p>
                      <p className=" mb-3">
                        {teacher.group && teacher.group.length}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className=" h-fit sm:h-[318px] md:h-[400px] lg:h-[368px] w-fit  sm:w-[40vw] md:w-[28vw] lg:w-[20vw] border border-slate-300">
                <div className=" m-1 sm:m-3 block ">
                  <p className=" font-semibold mb-3">Cursos</p>
                  <div className=" mb-5">
                    {user && user.role_id === 1
                      ? student.group &&
                        student.group
                          .filter((group) => group.group_status == 1)
                          .map((group) => (
                            <div
                              key={group.group_id}
                              className=" my-3 hover:text-[#58c2ff]"
                            >
                              <div className=" block">
                                <a href={`/academico/cursos/${group.group_id}`}>
                                  <p className=" text-[12px] ">
                                    {group.subject.subject_name}
                                  </p>
                                </a>
                                <p className=" text-[10px]   opacity-50">
                                  {group.group_id}
                                </p>
                              </div>
                            </div>
                          ))
                      : teacher.group &&
                        teacher.group
                          .filter((group) => group.group_status == 1)
                          .map((group) => (
                            <div
                              key={group.group_id}
                              className=" my-3 hover:text-[#58c2ff]"
                            >
                              <div className=" block">
                                <a href={`/academico/cursos/${group.group_id}`}>
                                  <p className=" text-[12px] ">
                                    {group.subject.subject_name}
                                  </p>
                                </a>
                                <p className=" text-[10px] opacity-50">
                                  {group.group_id}
                                </p>
                              </div>
                            </div>
                          ))}
                  </div>
                </div>
              </div>

              <div className=" h-fit sm:h-[318px] md:h-[400px] lg:h-[368px] w-fit  sm:w-[40vw] md:w-[28vw] lg:w-[20vw] border border-slate-300">
                <div className=" m-3 block ">
                  <p className=" font-semibold">Correo institucional</p>
                  <p className=" text-[#58c2ff]  mt-1 mb-4">
                    <a href={`mailto:${user && user.user_email}`}>
                      {user && user.user_email}
                    </a>
                  </p>
                  <p className=" font-semibold">Fecha de creación</p>
                  <p className=" text-slate-400">{user && user.createdAt}</p>
                  <p className=" font-semibold">Última actualizacion</p>
                  <p className=" text-slate-400">{user && user.updatedAt}</p>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex justify-center items-center m-10">
            <a href="/perfil/modificar">
              <button className=" p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-white text-white hover:text-[#146898] text-[13px] duration-500">
                Actualizar información
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
