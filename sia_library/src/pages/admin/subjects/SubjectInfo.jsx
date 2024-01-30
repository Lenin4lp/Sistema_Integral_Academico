import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  getSubject,
  updateSubject,
  getPeriods,
  getModalities,
  registerGroup,
  deleteSubject
} from "../../../api/academic";
import { getTeachers } from "../../../api/user";
import SubjectCard from "../../../components/SubjectCard";
import { Toaster, toast } from "sonner";
import Modal from "../../../components/Modal";

function SubjectInfo() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const [subject, setSubject] = useState();
  const navigate = useNavigate();
  const { subjectId2 } = useParams();
  const [period, setPeriod] = useState();
  const [periods, setPeriods] = useState([]);
  const [content, setContent] = useState(1);
  const [modalities, setModalities] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [open, setOpen] = useState(false);


  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const removeSubject = async (id) => {
    try {
      const res = await deleteSubject(id);
      if (res.status === 204) {
        toast.success("Materia eliminada exitosamente");
        setTimeout(() => {
          window.history.go(-1);
        }, 2000);
      }
    } catch (error) {
      toast.error("Error al eliminar la materia", {
        duration: 3000,
      });
    }
  }

  const getModalityList = async () => {
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

  const getTeacherList = async () => {
    try {
      const res = await getTeachers();
      if (res.status === 200) {
        setTeachers(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createGroup = async (data) => {
    try {
      const res = await registerGroup(data);
      if (res.status === 200) {
        toast.success("Grupo registrado exitosamente");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
      toast.error("Error al registrar el grupo", {
        duration: 3000,
      });
    }
  };

  const updateASubject = async (id, data) => {
    try {
      const res = await updateSubject(id, data);
      if (res.status === 200) {
        toast.success("Materia actualizada exitosamente");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
      toast.error("Error al actualizar la materia", {
        duration: 3000,
      });
    }
  };

  const getPeriodList = async () => {
    try {
      const res = await getPeriods();
      if (res.status === 200) {
        setPeriods(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getASubject = async (id) => {
    try {
      const res = await getSubject(id);
      if (res.status === 200) {
        setSubject(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(teachers);

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }
    updateASubject(subjectId2, modifiedData);
  });

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    getASubject(subjectId2);
    getPeriodList();
    setContent(1);
    getModalityList();
    getTeacherList();
  }, []);

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
    modifiedData.subject_id = subjectId2;
    modifiedData.group_status = isChecked;

    createGroup(modifiedData);
  });

  console.log(periods);

  return (
    <div className="my-8 lg:my-14 mx-2 md:mx-10 w-full">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className=" block m-3">
          <div className=" flex justify-center items-center">
            <svg
              className="h-[100px] fill-[#ad2c2c]"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill=""
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
                  <path
                    className="st0"
                    d="M308.229,51.853C308,23.183,284.751,0.017,256,0c-28.734,0.017-52,23.183-52.228,51.853 c-63.821,9.2-109.796,33.323-109.796,49.845v16.718c0,20.784,72.538,37.625,162.024,37.625c89.486,0,162.024-16.841,162.024-37.625 v-16.718C418.024,85.176,372.049,61.053,308.229,51.853z M256,48.065c-6.245,0-12.376,0.196-18.433,0.498 c0.735-3.715,2.547-6.996,5.144-9.616c3.445-3.437,8.049-5.494,13.289-5.51c5.257,0.017,9.845,2.073,13.306,5.51 c2.595,2.62,4.408,5.902,5.135,9.616C268.384,48.261,262.245,48.065,256,48.065z"
                  ></path>{" "}
                  <path
                    className="st0"
                    d="M256,178.335c-89.486,0-162.024-16.841-162.024-37.625l18.53,316.253C112.506,478.506,167.233,512,256,512 c88.767,0,143.51-33.494,143.51-55.037l18.514-316.253C418.024,161.494,345.486,178.335,256,178.335z M158.588,421.682 l-6.661-195.134c4.465,1.02,9.249,1.878,14.269,2.743l6.752,197.878C167.763,425.436,162.988,423.567,158.588,421.682z M217.176,436.98l-3.609-202.278c4.637,0.318,9.339,0.629,14.123,0.784l3.608,202.98C226.433,438.074,221.722,437.6,217.176,436.98 z M294.824,436.98c-4.547,0.62-9.339,1.094-14.196,1.486l3.608-202.98c4.784-0.155,9.494-0.466,14.123-0.784L294.824,436.98z M353.412,421.682c-4.392,1.886-9.175,3.755-14.351,5.486l6.744-197.878c5.02-0.865,9.803-1.796,14.277-2.743L353.412,421.682z"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <div className=" my-3">
            <h1 className=" text-center text-lg font-bold">Confirmación</h1>
          </div>
          <div className=" my-3">
            <h1 className=" text-center text-base font-medium">
              ¿Estás seguro de eliminar esta materia?
            </h1>
          </div>
          <div className=" flex justify-center items-center">
            <div className=" my-2 grid grid-cols-2">
              <div className=" mx-4">
                <button onClick={()=> removeSubject(subjectId2)} className=" p-2 active:transform active:scale-90 border border-white bg-[#ad2c2c] rounded-lg hover:bg-[#b94d4d] text-white hover:text-white text-[12px] md:text-sm lg:text-base duration-500">
                  Eliminar
                </button>
              </div>
              <div className=" mx-4">
                <button onClick={() => setOpen(false)} className=" p-2 active:transform active:scale-90 border border-gray-400 rounded-lg hover:bg-[#146898] text-black hover:text-white text-[12px] md:text-sm lg:text-base duration-500">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className=" h-fit block ml-1 lg:ml-10">
        <div className=" font-bold text-xl">
          <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
            {subject && subject.subject_name}
          </h1>
        </div>
        <div className=" font-medium text-lg">
          <h1 className=" text-white opacity-60 text-lg lg:text-xl ">
            {subject && subject.subject_id}
          </h1>
        </div>
        {content === 1 && (
          <div>
            {" "}
            <div className=" font-semibold text-base mt-5 flexs">
              <a href={subject && subject.syllabus}>
                <button className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500">
                  Visualizar Syllabus
                </button>
              </a>
              <div className="mt-5 block sm:flex md:mt-10">
                <button
                  onClick={() => setContent(2)}
                  className="font-medium rounded bg-transparent px-3 py-1.5 text-[10px] sm:text-sm text-white border border-white w-28 hover:bg-[#146898] transition-all duration-300 "
                >
                  Modificar
                </button>
                <button
                  onClick={() => setOpen(true)}
                  className="font-medium rounded bg-[#ad2c2c] px-3 py-1.5 text-[10px] sm:text-sm text-white border border-white w-fit my-5 sm:my-0 sm:mx-10 hover:bg-[#b94d4d] transition-all duration-300 "
                >
                  Eliminar materia
                </button>
              </div>
            </div>
            <div className=" font-bold text-xl mt-8 md:mt-14">
              <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
                Grupos
              </h1>
            </div>
            <div className=" font-bold text-base mt-5">
              <h1 className=" text-white text-base lg:text-xl ">
                No. de Grupos:{" "}
                <span className=" font-thin">{`${
                  subject && subject.group.length
                }`}</span>
              </h1>
            </div>
            <div>
              <button
                onClick={() => setContent(3)}
                className="font-medium mt-10 rounded bg-transparent px-3 py-1.5 text-[10px] sm:text-sm text-white border border-white w-28 hover:bg-[#146898] transition-all duration-300 "
              >
                Crear Grupo
              </button>
            </div>
            <div className="  text-base mt-6">
              <p className=" text-base text-white mb-3">Escoge un periodo</p>
              <select
                name="period"
                value={period}
                id="period"
                className="h-6 md:h-7 rounded"
                onChange={handlePeriodChange}
              >
                <option className=" text-sm md:text-base p-2" value="">
                  Escoge un periodo
                </option>
                {periods &&
                  periods.map((period) => (
                    <option
                      className="text-sm md:text-base"
                      value={period.period_id}
                      key={period.period_id}
                    >
                      {period.period_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className=" mt-8 flex justify-center items-center">
              <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {subject &&
                  subject.group
                    .filter((group) => {
                      if (period === "") {
                        return true;
                      } else {
                        return group.period_id === period;
                      }
                    })
                    .map((group) => (
                      <a href={`/admin/grupos/${group.group_id}`}>
                        <SubjectCard
                          key={group.group_id}
                          cardTitle={group.group_name}
                          cardId={
                            group.modality_id === 1 ? "Presencial" : "En línea"
                          }
                        />
                      </a>
                    ))}
              </div>
            </div>
          </div>
        )}
        {content === 2 && (
          <>
            <div>
              <button
                onClick={() => setContent(1)}
                className="font-medium mt-10 rounded bg-transparent px-3 py-1.5 text-[10px] sm:text-sm text-white border border-white w-28 hover:bg-[#146898] transition-all duration-300 "
              >
                Regresar
              </button>
            </div>
            <div className=" my-5 md:my-10 flex justify-center items-center ">
              <form action="">
                <div className=" grid grid-cols-1 md:grid-cols-2 ">
                  <div className=" mx-5 md:mx-10 my-5 h-fit ">
                    <p className=" text-sm md:text-base text-white">
                      Nombre de la materia
                    </p>
                    <input
                      name="name"
                      type="text"
                      placeholder="Nombre"
                      className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                      {...register("subject_name", {
                        maxLength: 30,
                        required: false,
                      })}
                    />
                  </div>

                  <div className=" mx-5 md:mx-10 my-5 h-fit ">
                    <p className=" text-sm md:text-base text-white">Syllabus</p>
                    <input
                      name="name"
                      type="text"
                      placeholder="Syllabus"
                      className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                      {...register("syllabus", {
                        required: false,
                      })}
                    />
                  </div>
                </div>

                <div className=" flex justify-center items-center mt-10">
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
          </>
        )}
        {content === 3 && (
          <>
            <div>
              <button
                onClick={() => setContent(1)}
                className="font-medium mt-10 rounded bg-transparent px-3 py-1.5 text-[10px] sm:text-sm text-white border border-white w-28 hover:bg-[#146898] transition-all duration-300 "
              >
                Regresar
              </button>
            </div>
            <div className=" font-bold text-xl mt-6 md:mt-10">
              <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
                Añadir Grupo
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
                    <p className=" text-sm md:text-base text-white">Periodo</p>
                    <select
                      className=" w-36 sm:w-42 md:w-56 lg:w-full bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mt-3"
                      {...register("period_id")}
                    >
                      <option>Selecciona un periodo</option>
                      {periods &&
                        periods.map((periodd) => (
                          <option
                            key={periodd.period_id}
                            value={periodd.period_id}
                          >
                            {periodd.period_name}
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
                <div className="mx-5 md:mx-10 my-5 h-fit ">
                  <p className=" text-sm md:text-base text-white">Materia</p>
                  <input
                    name="subject"
                    type="text"
                    defaultValue={subjectId2}
                    placeholder={subjectId2}
                    disabled={true}
                    className=" w-36 sm:w-42 md:w-56 bg-gray-400 text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                    {...register("subject_id", { required: false })}
                  />
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
                    Registrar
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
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default SubjectInfo;
