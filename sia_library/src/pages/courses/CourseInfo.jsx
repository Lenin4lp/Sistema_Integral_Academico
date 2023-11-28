import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroup } from "../../api/academic";

function CourseInfo() {
  const [group, setGroup] = useState([]);
  const [errors, setErrors] = useState([]);
  let { id } = useParams();

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

  useEffect(() => {
    getAGroup(id);
  }, []);

  


  return (
    <div className=" overflow-x-hidden">
      <div className=" block">
        <div className=" mt-24 md:mt-28 mb-3 mx-3 md:mx-10 flex items-center  text-2xl md:text-3xl font-bold text-[#1C274C] text-left">
          {group.subject && group.subject.subject_name}
        </div>
        <div className=" mx-3 md:mx-10 text-md md:text-lg font-bold text-slate-400">
          {id}
        </div>
        <div className=" w-screen h-fit mt-3 flex justify-center items-center">
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
                  fill="#1C274C"
                />{" "}
                <path
                  d="M12 6.92969C9.93 6.92969 8.25 8.60969 8.25 10.6797C8.25 12.7097 9.84 14.3597 11.95 14.4197C11.98 14.4197 12.02 14.4197 12.04 14.4197C12.06 14.4197 12.09 14.4197 12.11 14.4197C12.12 14.4197 12.13 14.4197 12.13 14.4197C14.15 14.3497 15.74 12.7097 15.75 10.6797C15.75 8.60969 14.07 6.92969 12 6.92969Z"
                  fill="#1C274C"
                />{" "}
              </g>
            </svg>
          </div>
        </div>
        <div className=" font-bold text-[#1C274C] mx-3 md:mx-10 text-sm md:text-md mb-3 flex justify-center items-center">
          Docente
        </div>
        <div className=" font-semibold text-[#1C274C] mx-3 md:mx-10 text-md md:text-lg flex justify-center items-center">
          {group.teacher
            ? group.teacher.user.user_name
            : "Docente no registrado"}
        </div>
        <div className=" font-semibold text-[#1C274C] mx-3 md:mx-10 text-md md:text-lg flex justify-center items-center">
          {group.teacher ? group.teacher.user.user_lastname : ""}
        </div>
        <div className=" flex justify-center items-center mt-3">
          <a
            href={`mailto:${
              group.teacher && group.teacher.user.user_email
            }`}
          >
            <button className=" m-3 p-2 bg-gradient-to-br from-[#ad2845] to-[#9e1264] hover:from-[#1C274C] hover:to-[#146898] transition hover:scale-105 duration-300 text-white rounded-lg">
              Contactar
            </button>
          </a>
        </div>
        <div className=" mt-10 md:mt-20 mb-12 mx-3 md:mx-10 flex justify-center items-center">
          <div className=" block">
            <div className=" font-extrabold text-[#1C274C] text-xl md:text-2xl text-center">
              Syllabus de {group.subject && group.subject.subject_name}
            </div>
            <div className=" mt-7 md:mt-10 flex justify-center items-center">
              <svg
                className=" w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
                viewBox="0 0 24 24"
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
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.27103 2.11151C5.46135 2.21816 5.03258 2.41324 4.72718 2.71244C4.42179 3.01165 4.22268 3.43172 4.11382 4.225C4.00176 5.04159 4 6.12387 4 7.67568V16.2442C4.38867 15.9781 4.82674 15.7756 5.29899 15.6517C5.82716 15.513 6.44305 15.5132 7.34563 15.5135L20 15.5135V7.67568C20 6.12387 19.9982 5.04159 19.8862 4.22499C19.7773 3.43172 19.5782 3.01165 19.2728 2.71244C18.9674 2.41324 18.5387 2.21816 17.729 2.11151C16.8955 2.00172 15.7908 2 14.2069 2H9.7931C8.2092 2 7.10452 2.00172 6.27103 2.11151ZM6.75862 6.59459C6.75862 6.1468 7.12914 5.78378 7.58621 5.78378H16.4138C16.8709 5.78378 17.2414 6.1468 17.2414 6.59459C17.2414 7.04239 16.8709 7.40541 16.4138 7.40541H7.58621C7.12914 7.40541 6.75862 7.04239 6.75862 6.59459ZM7.58621 9.56757C7.12914 9.56757 6.75862 9.93058 6.75862 10.3784C6.75862 10.8262 7.12914 11.1892 7.58621 11.1892H13.1034C13.5605 11.1892 13.931 10.8262 13.931 10.3784C13.931 9.93058 13.5605 9.56757 13.1034 9.56757H7.58621Z"
                    fill="#1C274D"
                  ></path>{" "}
                  <path
                    d="M8.68965 17.1351H7.47341C6.39395 17.1351 6.01657 17.1421 5.72738 17.218C4.93365 17.4264 4.30088 18.0044 4.02952 18.7558C4.0463 19.1382 4.07259 19.4746 4.11382 19.775C4.22268 20.5683 4.42179 20.9884 4.72718 21.2876C5.03258 21.5868 5.46135 21.7818 6.27103 21.8885C7.10452 21.9983 8.2092 22 9.7931 22H14.2069C15.7908 22 16.8955 21.9983 17.729 21.8885C18.5387 21.7818 18.9674 21.5868 19.2728 21.2876C19.5782 20.9884 19.7773 20.5683 19.8862 19.775C19.9776 19.1088 19.9956 18.2657 19.9991 17.1351H13.1034V20.1417C13.1034 20.4397 13.1034 20.5886 12.9988 20.6488C12.8941 20.709 12.751 20.6424 12.4647 20.5092L11.0939 19.8713C10.9971 19.8262 10.9486 19.8037 10.8966 19.8037C10.8445 19.8037 10.796 19.8262 10.6992 19.8713L9.32842 20.5092C9.04213 20.6424 8.89899 20.709 8.79432 20.6488C8.68965 20.5886 8.68965 20.4397 8.68965 20.1417V17.1351Z"
                    fill="#1C274D"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <div className=" mt-2 md:mt-5 p-5 lg:mx-48 text-center text-[#1C274C] font-medium">
              El syllabus del curso está disponible para descargar o visualizar
              en PDF. Este documento contiene información importante sobre el
              curso, como el programa, las fechas de evaluación, los requisitos
              de asistencia, y otros detalles relevantes.
            </div>
            <div className=" flex justify-center items-center">
              <button className=" w-fit my-8 mx-3 p-2 bg-gradient-to-br from-[#156436] to-[#55966e] hover:from-[#1C274C] hover:to-[#146898] transition hover:scale-105 duration-300 text-white rounded-lg">
                <a href={group.subject && group.subject.syllabus} target="_blank">
                  Visualizar PDF
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
