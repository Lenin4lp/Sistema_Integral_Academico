import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { getPeriods, getDegrees } from "../../api/academic";
import Cards from "../../components/Cards";
import roundedButton from "../../components/roundedButton";

function Academic() {
  const { user } = useAuth();
  const [errors, setErrors] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const academicButtons = [
    {
      buttonName: "Carreras",
      buttonLink: "/carreras",
      buttonSVG: (
        <svg
          className=" h-[50px] sm:h-[60px] lg:h-[90px] w-[50px] sm:w-[60px] lg:w-[90px]"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <rect width="48" height="48" fill="" fillOpacity="0.01"></rect>{" "}
            <path
              d="M2 17.4L23.0222 9L44.0444 17.4L23.0222 25.8L2 17.4Z"
              fill=""
              stroke="#1C274C"
              strokeWidth="4"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              d="M44.0444 17.5101V26.7333"
              stroke="#1C274C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
            <path
              d="M11.5555 21.8253V34.2667C11.5555 34.2667 16.3656 39 23.0222 39C29.6788 39 34.4889 34.2667 34.4889 34.2667V21.8253"
              stroke="#1C274C"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
      ),
    },
    {
      buttonName: "Horarios",
      buttonLink: "/horarios",
      buttonSVG: (
        <svg
          className=" h-[40px] md:h-[50px] lg:h-[70px] w-[40px] md:w-[50px] lg:w-[70px]"
          version="1.1"
          id="_x32_"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          fill="#1C274C"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <style type="text/css"> </style>{" "}
            <g>
              {" "}
              <rect
                x="119.256"
                y="222.607"
                className="st0"
                width="50.881"
                height="50.885"
              ></rect>{" "}
              <rect
                x="341.863"
                y="222.607"
                className="st0"
                width="50.881"
                height="50.885"
              ></rect>{" "}
              <rect
                x="267.662"
                y="222.607"
                className="st0"
                width="50.881"
                height="50.885"
              ></rect>{" "}
              <rect
                x="119.256"
                y="302.11"
                className="st0"
                width="50.881"
                height="50.885"
              ></rect>{" "}
              <rect
                x="267.662"
                y="302.11"
                className="st0"
                width="50.881"
                height="50.885"
              ></rect>{" "}
              <rect
                x="193.46"
                y="302.11"
                className="st0"
                width="50.881"
                height="50.885"
              ></rect>{" "}
              <rect
                x="341.863"
                y="381.612"
                className="st0"
                width="50.881"
                height="50.885"
              ></rect>{" "}
              <rect
                x="267.662"
                y="381.612"
                className="st0"
                width="50.881"
                height="50.885"
              ></rect>{" "}
              <rect
                x="193.46"
                y="381.612"
                className="st0"
                width="50.881"
                height="50.885"
              ></rect>{" "}
              <path
                className="st0"
                d="M439.277,55.046h-41.376v39.67c0,14.802-12.195,26.84-27.183,26.84h-54.025 c-14.988,0-27.182-12.038-27.182-26.84v-39.67h-67.094v39.297c0,15.008-12.329,27.213-27.484,27.213h-53.424 c-15.155,0-27.484-12.205-27.484-27.213V55.046H72.649c-26.906,0-48.796,21.692-48.796,48.354v360.246 c0,26.661,21.89,48.354,48.796,48.354h366.628c26.947,0,48.87-21.692,48.87-48.354V103.4 C488.147,76.739,466.224,55.046,439.277,55.046z M453.167,462.707c0,8.56-5.751,14.309-14.311,14.309H73.144 c-8.56,0-14.311-5.749-14.311-14.309V178.089h394.334V462.707z"
              ></path>{" "}
              <path
                className="st0"
                d="M141.525,102.507h53.392c4.521,0,8.199-3.653,8.199-8.144v-73.87c0-11.3-9.27-20.493-20.666-20.493h-28.459 c-11.395,0-20.668,9.192-20.668,20.493v73.87C133.324,98.854,137.002,102.507,141.525,102.507z"
              ></path>{" "}
              <path
                className="st0"
                d="M316.693,102.507h54.025c4.348,0,7.884-3.513,7.884-7.826V20.178C378.602,9.053,369.474,0,358.251,0H329.16 c-11.221,0-20.349,9.053-20.349,20.178v74.503C308.81,98.994,312.347,102.507,316.693,102.507z"
              ></path>{" "}
            </g>{" "}
          </g>
        </svg>
      ),
    },
    {
      buttonName: "Calificaciones",
      buttonLink: "/grades",
      buttonSVG: (
        <svg
          className=" h-[60px] md:h-[70px] lg:h-[100px] w-[60px] md:w-[70px] lg:w-[100px]"
          viewBox="0 0 76 76"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          baseProfile="full"
          enableBackground="new 0 0 76.00 76.00"
          xmlSpace="preserve"
          fill="#1C274C"
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
              fill="#1C274C"
              fillOpacity="1"
              strokeWidth="0.2"
              strokeLinejoin="round"
              d="M 47.4578,53.8333L 39.4751,53.8333L 37.3851,47.3311L 25.4184,47.3311L 23.3502,53.8333L 15.4111,53.8333L 27.2327,21.3222L 35.9047,21.3222L 47.4578,53.8333 Z M 35.433,40.8289L 32.0223,30.0523C 31.7562,29.2347 31.5723,28.2599 31.4707,27.1278L 31.2893,27.1278C 31.2312,28.0809 31.0401,29.0243 30.716,29.958L 27.2399,40.8289L 35.433,40.8289 Z M 46.3125,34.8333L 52.25,34.8333L 52.25,28.8958L 58.5833,28.8958L 58.5833,34.8333L 64.5208,34.8333L 64.5208,41.1667L 58.5833,41.1667L 58.5833,47.1042L 52.25,47.1042L 52.25,41.1667L 46.3125,41.1667L 46.3125,34.8333 Z "
            ></path>{" "}
          </g>
        </svg>
      ),
    },
  ];

  const filteredGroups =
    user.roleTable &&
    user.roleTable.group.filter((group) => group.period_id === selectedPeriod);

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

  const getDegreeList = async () => {
    try {
      const res = await getDegrees();
      if (res.status === 200) {
        setDegrees(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    getPeriodsList();
    getDegreeList();
  }, []);

  console.log(user);

  return (
    <>
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
      <div className="  h-fit mt-5 w-full flex justify-center items-center">
        <div className=" block">
          <div className=" flex justify-start items-start">
            <div className="  mt-8 md:mt-14 mx-2 md:mx-10 inline-flex items-center justify-center gap-3">
              <svg
                className=" h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]"
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
                    d="M14.2172 3.49965C12.7962 2.83345 11.2037 2.83345 9.78272 3.49965L3.0916 6.63659C2.0156 7.14105 1.73507 8.56352 2.25 9.54666L2.25 14.5C2.25 14.9142 2.58579 15.25 3 15.25C3.41421 15.25 3.75 14.9142 3.75 14.5V10.672L9.78281 13.5003C11.2038 14.1665 12.7963 14.1665 14.2173 13.5003L20.9084 10.3634C22.3639 9.68105 22.3639 7.31899 20.9084 6.63664L14.2172 3.49965Z"
                    fill="#ffffff"
                  />{" "}
                  <path
                    d="M5 12.9147V16.6254C5 17.6334 5.5035 18.5772 6.38533 19.0656C7.8537 19.8787 10.204 21 12 21C13.796 21 16.1463 19.8787 17.6147 19.0656C18.4965 18.5772 19 17.6334 19 16.6254V12.9148L14.854 14.8585C13.0296 15.7138 10.9705 15.7138 9.14607 14.8585L5 12.9147Z"
                    fill="#ffffff"
                  />{" "}
                </g>
              </svg>
              <h1 className=" text-white underline underline-offset-8 decoration-2 decoration-[#146898] duration-300 text-xl md:text-2xl lg:text-3xl font-semibold font-mono">
                ACADÉMICO
              </h1>
            </div>
          </div>
          <div className=" flex justify-center items-start mt-5 md:mt-10 mx-10 my-10">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              <div className=" col-span-1 hidden md:flex justify-center items-start ">
                <div className=" w-[280px] h-fit bg-white rounded-lg flex justify-center items-start">
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
                              {user.roleTable &&
                                user.roleTable.degree.degree_name}
                            </span>
                          </p>
                          <p className="font-semibold my-3 text-sm text-[#1C274C]">
                            Modalidad:{" "}
                            <span className="font-medium">
                              {user.roleTable &&
                              user.roleTable.group[0].modality_id === 1
                                ? "Presencial"
                                : "En línea"}
                            </span>
                          </p>
                          <p className="font-semibold my-3 text-sm text-[#1C274C]">
                            Nº de Materias:{" "}
                            <span className="font-medium">
                              {user.roleTable &&
                                user.roleTable.group.filter(
                                  (group) =>
                                    group.group_status === 1 ||
                                    group.group_status === null
                                ).length}
                            </span>
                          </p>
                          <p className=" mt-5 font-semibold my-3 text-sm text-[#1C274C]">
                            Cursos:{" "}
                          </p>
                          {user.roleTable &&
                            user.roleTable.group
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
                        <div className=" block">
                          <p className=" font-semibold my-3 text-sm text-[#1C274C]">
                            Título:{" "}
                            <span className="font-medium">
                              {user.roleTable &&
                              user.roleTable.speciality === null
                                ? "--------"
                                : user.roleTable.speciality}
                            </span>
                          </p>
                          <p className="font-semibold my-3 text-sm text-[#1C274C]">
                            Nº de Materias:{" "}
                            <span className="font-medium">
                              {user.roleTable &&
                                user.roleTable.group.filter(
                                  (group) =>
                                    group.group_status === 1 ||
                                    group.group_status === null
                                ).length}
                            </span>
                          </p>
                          <p className=" mt-5 font-semibold my-3 text-sm text-[#1C274C]">
                            Cursos:{" "}
                          </p>
                          {user.roleTable &&
                            user.roleTable.group
                              .filter(
                                (group) =>
                                  group.group_status === 1 ||
                                  group.group_status === null
                              )
                              .map((group) => (
                                <a key={group.group_id} href={`/academico/curso/${group.group_id}`}>
                                  <div className="font-medium my-2 text-[14px] text-[#1C274C] hover:text-[#146898] duration-300">
                                    <p >
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
                        {user.roleTable && user.roleTable.createdAt}
                      </p>
                      <p className=" mt-5 font-semibold my-3 text-sm text-[#1C274C]">
                        Fecha de actualización:
                      </p>
                      <p className="  font-medium my-1 text-sm text-[#1C274C]">
                        {user.roleTable && user.roleTable.updatedAt}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-span-1 lg:col-span-3 flex justify-center items-start">
                
                  <div className=" block w-[750px] h-fit rounded-lg">
                    <div className="   flex justify-start items-start">
                      <div className=" m-2 md:m-5 flex justify-start items-start">
                        <p className=" text-left font-semibold text-xl lg:text-2xl text-white underline underline-offset-8 decoration-[#146898]">
                          Mis Cursos
                        </p>
                      </div>
                    </div>
                    <div className=" mt-3  md:mt-0 mx-5">
                      <select
                        className=" rounded h-[20px] md:h-[30px]"
                        name="periodos"
                        id=""
                        onChange={handlePeriodChange}
                      >
                        <option className=" px-2" value="">
                          Seleccione un periodo
                        </option>
                        {periods &&
                          periods.map((period) => (
                            <option key={period.period_id} value={period.period_id}>
                              {period.period_name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className=" mt-5 md:mt-10 flex justify-center items-center">
                      <div className=" grid grid-cols-2 lg:grid-cols-3">
                        {selectedPeriod === ""
                          ? user.roleTable &&
                            user.roleTable.group
                              .filter(
                                (group) =>
                                  group.group_status === 1 ||
                                  group.group_status === null
                              )
                              .map((group) => (
                                <div
                                  className=" mx-2 md:mx-5 "
                                  key={group.group_id}
                                >
                                  <Cards
                                    cardColor={
                                      "bg-gradient-to-br from-white to-[#e7e7e7]"
                                    }
                                    cardTitle={group.subject.subject_name}
                                    cardDescription={group.group_id}
                                    cardFontColor={"text-[#1C274C]"}
                                  />
                                </div>
                              ))
                          : user.roleTable &&
                            filteredGroups.map((group) => (
                              <div className=" mx-5 " key={group.group_id}>
                                <Cards
                                  cardColor={
                                    "bg-gradient-to-br from-white to-[#e7e7e7]"
                                  }
                                  cardTitle={group.subject.subject_name}
                                  cardDescription={group.group_id}
                                  cardFontColor={"text-[#1C274C]"}
                                />
                              </div>
                            ))}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-start">
                      <div className=" m-5 flex justify-start">
                        <p className="text-left font-semibold text-xl lg:text-2xl text-white underline underline-offset-8 decoration-[#146898]">
                          Información Académica
                        </p>
                      </div>
                    </div>
                    <div className=" mt-3 sm:mt-8 flex justify-center items-center">
                      <div className=" grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-10">
                        {academicButtons &&
                          academicButtons.map((button, index) => (
                            <div key={index} className=" group ">
                              <div className=" flex justify-center items-center">
                                <div className=" h-[70px] md:h-[90px] lg:h-[120px] group-hover:scale-110 duration-300 group-hover:cursor-pointer bg-white w-[70px] md:w-[90px] lg:w-[120px] flex justify-center items-center rounded-full">
                                  {button.buttonSVG}
                                </div>
                              </div>
                              <div className=" flex justify-center text-white items-center mt-3">
                                <p className=" text-[12px] text-center md:text-base">
                                  {button.buttonName}
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Academic;
