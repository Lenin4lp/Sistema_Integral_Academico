import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { getUser } from "../../api/user";
import { getPeriods } from "../../api/academic";

function Academic() {
  const { user } = useAuth();
  const [errors, setErrors] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [periodIndex, setPeriodIndex] = useState(0);

  const getAUser = async (userId) => {
    try {
      const res = await getUser(userId);
      if (res.status === 200) {
        setUserProfile(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

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
  }

  useEffect(() => {
    getAUser(user.user_id);
    
  }, [user]);

  useEffect(() => {
    getPeriodsList(); 
  },[])

  console.log(user);
  console.log(userProfile);

  return (
    <>
      <div className=" overflow-x-hidden relative ">
        <div className=" fixed top-0 w-full h-fit bg-white">
          <div>
            <h1 className=" text-left text-[12px] md:text-base p-2 text-[#1C274C]">
              Bienvenid@ al <span className=" pl-1 font-bold">S</span>istema{" "}
              <span className=" pl-1 font-bold">I</span>ntegral{" "}
              <span className=" pl-1 font-bold">A</span>cadémico
            </h1>
          </div>
        </div>
      </div>
      <div className="  h-fit w-full flex justify-center items-center">
        <div className=" block">
          <div className=" flex justify-start items-start">
            <div className="  mt-8 md:mt-14 mx-10 inline-flex items-center justify-center gap-3">
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M14.2172 3.49965C12.7962 2.83345 11.2037 2.83345 9.78272 3.49965L3.0916 6.63659C2.0156 7.14105 1.73507 8.56352 2.25 9.54666L2.25 14.5C2.25 14.9142 2.58579 15.25 3 15.25C3.41421 15.25 3.75 14.9142 3.75 14.5V10.672L9.78281 13.5003C11.2038 14.1665 12.7963 14.1665 14.2173 13.5003L20.9084 10.3634C22.3639 9.68105 22.3639 7.31899 20.9084 6.63664L14.2172 3.49965Z"
                    fill="#ffffff"
                  />{" "}
                  <path
                    d="M5 12.9147V16.6254C5 17.6334 5.5035 18.5772 6.38533 19.0656C7.8537 19.8787 10.204 21 12 21C13.796 21 16.1463 19.8787 17.6147 19.0656C18.4965 18.5772 19 17.6334 19 16.6254V12.9148L14.854 14.8585C13.0296 15.7138 10.9705 15.7138 9.14607 14.8585L5 12.9147Z"
                    fill="#ffffff"
                  />{" "}
                </g>
              </svg>
              <h1 className=" text-white underline underline-offset-8 decoration-2 decoration-[#146898] duration-300 text-3xl font-semibold font-mono">
                ACADÉMICO
              </h1>
            </div>
          </div>
          <div className=" flex justify-center items-center mt-5 md:mt-10 mx-10 my-10">
            <div className=" grid grid-cols-4">
              <div className=" col-span-1  ">
                <div className=" w-[280px] h-fit bg-white rounded-lg flex justify-center">
                  <div className=" block">
                    <div className=" flex justify-center">
                      <svg
                        className=" w-[70px] h-[70px] md:w-[100px] md:h-[100px] pt-5"
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
                            fill="#1C274C"
                          />{" "}
                          <path
                            d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z"
                            fill="#1C274C"
                          />{" "}
                        </g>
                      </svg>
                    </div>
                    <div className=" mt-3 text-center text-sm font-semibold text-[#1C274C]">
                      <p>{`${user && user.user_name}`}</p>
                    </div>
                    <div className=" mt-1 text-center text-sm font-semibold text-[#1C274C]">
                      <p>{`${user && user.user_lastname}`}</p>
                    </div>
                    <div className=" mt-2 text-center font-medium text-[11px] text-[#1C274C]">
                      <p>{`${
                        user && user.role_id === 1 ? "Estudiante" : "Docente"
                      }`}</p>
                    </div>
                    <div className=" my-5 mb-10 mx-5 text-left">
                      {user && user.role_id === 1 && (
                        <div className=" block">
                          <p className="font-semibold my-3 text-sm text-[#1C274C]">
                            Carrera:{" "}
                            <span className="font-medium">
                              {userProfile.user &&
                                userProfile.user.student.degree.degree_name}
                            </span>
                          </p>
                          <p className="font-semibold my-3 text-sm text-[#1C274C]">
                            Modalidad:{" "}
                            <span className="font-medium">
                              {userProfile.user &&
                              userProfile.user.student.group[0].modality_id ===
                                1
                                ? "Presencial"
                                : "En línea"}
                            </span>
                          </p>
                          <p className="font-semibold my-3 text-sm text-[#1C274C]">
                            Nº de Materias:{" "}
                            <span className="font-medium">
                              {userProfile.user &&
                                userProfile.user.student.group.filter(
                                  (group) =>
                                    group.group_status === 1 ||
                                    group.group_status === null
                                ).length}
                            </span>
                          </p>
                          <p className=" mt-5 font-semibold my-3 text-sm text-[#1C274C]">
                            Cursos:{" "}
                          </p>
                          {userProfile.user &&
                            userProfile.user.student.group
                              .filter(
                                (group) =>
                                  group.group_status === 1 ||
                                  group.group_status === null
                              )
                              .map((group) => (
                                <a href={`/academico/curso/${group.group_id}`}>
                                  <div className="font-medium my-2 text-[14px] text-[#1C274C] hover:text-[#146898] duration-300">
                                    <p key={group.group_id}>
                                      {group.subject.subject_name}
                                    </p>
                                    <p className=" text-[12px] opacity-50">
                                      {group.group_id}
                                    </p>
                                  </div>
                                </a>
                              ))}
                        </div>
                      )}
                      {user && user.role_id === 2 && (
                        <div>
                          <p></p>
                        </div>
                      )}
                      <a href={`mailto:${user && user.user_email}`}>
                        <p className="font-semibold my-5 text-sm text-[#1C274C]">
                          Correo Institucional:{" "}
                          <span className="font-medium text-[#146898] underline underline-offset-4 decoration-[#146898]">
                            {user && user.user_email}
                          </span>
                        </p>
                      </a>
                      <p className=" mt-5 font-semibold my-3 text-sm text-[#1C274C]">
                        Fecha de creación:
                      </p>
                      <p className="  font-medium my-1 text-sm text-[#1C274C]">
                        {user && user.createdAt}
                      </p>
                      <p className=" mt-5 font-semibold my-3 text-sm text-[#1C274C]">
                        Fecha de actualización:
                      </p>
                      <p className="  font-medium my-1 text-sm text-[#1C274C]">
                        {user && user.updatedAt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-span-3 flex justify-center items-start">
                {user && user.role_id === 1 && (
                  <div className=" block w-[750px] h-screen rounded-lg">
                    <div className="   flex justify-start">
                      <div className=" m-5 flex justify-start">
                        <p className=" text-left font-semibold text-2xl text-white underline underline-offset-8 decoration-[#146898]">
                          Cursos
                        </p>
                      </div>
                    </div>
                    <div className=" mx-5">
                      <select className=" rounded h-[30px]" name="periodos" id="">
                        <option className=" px-2" value="">Seleccione un periodo</option>
                        {periods && periods.map((period) => <option>{period.period_name}</option>)}
                      </select>
                    </div>
                    <div className=" flex justify-center items-center"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Academic;
