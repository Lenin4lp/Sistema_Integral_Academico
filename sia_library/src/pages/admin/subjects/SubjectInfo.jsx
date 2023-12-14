import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getSubject, updateSubject, getPeriods } from "../../../api/academic";
import SubjectCard from "../../../components/SubjectCard";
import { Link } from "react-router-dom";

function SubjectInfo() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const [subject, setSubject] = useState();
  const navigate = useNavigate();
  const [isOnEdit, setIsOnEdit] = useState(false);
  const { subjectId2 } = useParams();
  const [period, setPeriod] = useState();
  const [periods, setPeriods] = useState([]);

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value);
  };

  const updateASubject = async (id, data) => {
    try {
      const res = await updateSubject(id, data);
      if (res.status === 200) {
        alert("Materia actualizada exitosamente");
        navigate("/admin/materias");
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
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
    setIsOnEdit(false);
  }, []);

  console.log(periods, period);

  return (
    <div className="my-8 lg:my-14 mx-2 md:mx-10 w-full">
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
        {isOnEdit === false ? (
          <div>
            {" "}
            <div className=" font-semibold text-base mt-5 flexs">
              <a href={subject && subject.syllabus}>
                <button className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500">
                  Visualizar Syllabus
                </button>
              </a>
              <div className="mt-5 md:mt-10">
                <button
                  onClick={() => setIsOnEdit(!isOnEdit)}
                  className="font-medium rounded bg-transparent px-3 py-1.5 text-[10px] sm:text-sm text-white border border-white w-28 hover:bg-[#146898] transition-all duration-300 "
                >
                  Modificar
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
              <button className="font-medium mt-10 rounded bg-transparent px-3 py-1.5 text-[10px] sm:text-sm text-white border border-white w-28 hover:bg-[#146898] transition-all duration-300 ">
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
                      <Link to={`/admin/grupos/${group.group_id}`}>
                        <SubjectCard
                          key={group.group_id}
                          cardTitle={group.group_name}
                          cardId={
                            group.modality_id === 1 ? "Presencial" : "En línea"
                          }
                        />
                      </Link>
                    ))}
              </div>
            </div>
          </div>
        ) : (
          <>
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
      </div>
    </div>
  );
}

export default SubjectInfo;
