import React, { useState, useEffect } from "react";
import { getGrade, updateGrade } from "../../../api/academic";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function UpdateGrades() {
  const { gradeId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [grade, setGrade] = useState();
  const [errors, setErrors] = useState([]);

  const getAGrade = async (id) => {
    try {
      const res = await getGrade(id);
      if (res.status === 200) {
        setGrade(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modifyGrades = async (id, data) => {
    try {
      const res = await updateGrade(id, data);
      if (res.status === 200) {
        alert("Calificaciones modificadas");
        navigate(`/admin/grupos/${grade.group.group_id}`);
      }
    } catch (error) {
      setErrors(error.response.data);
      console.log(error);
    }
  };

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};

    if (data.grade_1) {
      data.grade_1 = parseFloat(data.grade_1).toFixed(2);
    }
    if (data.grade_2) {
      data.grade_2 = parseFloat(data.grade_2).toFixed(2);
    }
    if (data.test_1) {
      data.test_1 = parseFloat(data.test_1).toFixed(2);
    }
    if (data.exam_1) {
      data.exam_1 = parseFloat(data.exam_1).toFixed(2);
    }
    if (data.grade_3) {
      data.grade_3 = parseFloat(data.grade_3).toFixed(2);
    }
    if (data.grade_4) {
      data.grade_4 = parseFloat(data.grade_4).toFixed(2);
    }
    if (data.test_2) {
      data.test_2 = parseFloat(data.test_2).toFixed(2);
    }
    if (data.exam_2) {
      data.exam_2 = parseFloat(data.exam_2).toFixed(2);
    }

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }

    modifyGrades(gradeId, modifiedData);
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
    getAGrade(gradeId);
  }, []);

  return (
    <div className="my-8 lg:my-14 mx-2 md:mx-10 w-full">
      <div className=" h-fit block ml-1 lg:ml-10">
        <div className=" font-bold text-xl">
          <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
            Modificar calificaciones
          </h1>
        </div>
        <div className=" font-medium text-lg mt-10">
          <h1 className=" text-white text-lg lg:text-xl ">
            Estudiante:{" "}
            <span className=" font-normal">{` ${
              grade && grade.student.user.user_name
            } ${grade && grade.student.user.user_lastname}`}</span>
          </h1>
        </div>
        <div className=" font-medium text-lg mt-7">
          <h1 className=" text-white text-lg lg:text-xl ">
            Materia:{" "}
            <span className=" font-normal">{` ${
              grade && grade.group.subject.subject_name
            }`}</span>
          </h1>
        </div>
        <div className=" mt-10 font-semibold text-sm lg:text-lg">
          <div className=" grid grid-cols-1 md:grid-cols-4 ">
            <div className="  flex justify-center items-center col-span-1 h-[50px] md:h-[150px] w-[175px] lg:w-[250px] rounded bg-[#1C274C] text-white">
              <p>1er Hemisemestre</p>
            </div>
            <div
              className=" col-span-3 rounded border-slate-300 border text-white"
              action=""
            >
              <div className=" grid grid-cols-2 md:grid-cols-4 pt-10">
                <div className=" text-center block">
                  <p>Nota 1</p>
                  <input
                    min={0}
                    max={10}
                    step={0.1}
                    className=" my-5 border rounded text-center text-[#1C274C] border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                    type="number"
                    placeholder={grade && grade.grade_1}
                    {...register("grade_1", {
                      required: false,
                    })}
                  />
                </div>
                <div className=" text-center block">
                  <p>Nota 2</p>
                  <input
                    min={0}
                    max={10}
                    step={0.1}
                    className=" my-5 border rounded text-center text-[#1C274C] border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                    type="number"
                    pattern="\d+(\.\d{1,2})?"
                    placeholder={grade && grade.grade_2}
                    {...register("grade_2", {
                      required: false,
                    })}
                  />
                </div>
                <div className=" text-center block">
                  <p>Prueba</p>
                  <input
                    min={0}
                    max={10}
                    step={0.1}
                    className=" my-5 border rounded text-center text-[#1C274C] border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                    type="number"
                    pattern="\d+(\.\d{1,2})?"
                    placeholder={grade && grade.test_1}
                    {...register("test_1", {
                      required: false,
                    })}
                  />
                </div>
                <div className=" text-center block">
                  <p>Examen</p>
                  <input
                    min={0}
                    max={10}
                    step={0.1}
                    className=" my-5 border rounded text-center text-[#1C274C] border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                    type="number"
                    pattern="\d+(\.\d{1,2})?"
                    placeholder={grade && grade.exam_1}
                    {...register("exam_1", {
                      required: false,
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-10 text-sm lg:text-lg font-semibold">
          <div className=" grid grid-cols-1 md:grid-cols-4 ">
            <div className="  flex justify-center items-center col-span-1 h-[50px] md:h-[150px] w-[175px] lg:w-[250px] rounded bg-[#1C274C] text-white">
              <p>2do Hemisemestre</p>
            </div>
            <div
              className=" col-span-3 rounded border-slate-300 border text-white"
              action=""
            >
              <div className=" grid grid-cols-2 md:grid-cols-4 pt-10">
                <div className=" text-center block">
                  <p>Nota 1</p>
                  <input
                    min={0}
                    max={10}
                    step={0.1}
                    className=" my-5 border rounded text-center text-[#1C274C] border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                    type="number"
                    pattern="\d+(\.\d{1,2})?"
                    placeholder={grade && grade.grade_3}
                    {...register("grade_3", {
                      required: false,
                    })}
                  />
                </div>
                <div className=" text-center block">
                  <p>Nota 2</p>
                  <input
                    min={0}
                    max={10}
                    step={0.1}
                    className=" my-5 border rounded text-center text-[#1C274C] border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                    type="number"
                    pattern="\d+(\.\d{1,2})?"
                    placeholder={grade && grade.grade_4}
                    {...register("grade_4", {
                      required: false,
                    })}
                  />
                </div>
                <div className=" text-center block">
                  <p>Prueba</p>
                  <input
                    min={0}
                    max={10}
                    step={0.1}
                    className=" my-5 border rounded text-center text-[#1C274C] border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                    type="number"
                    pattern="\d+(\.\d{1,2})?"
                    placeholder={grade && grade.test_2}
                    {...register("test_2", {
                      required: false,
                    })}
                  />
                </div>
                <div className=" text-center block">
                  <p>Examen</p>
                  <input
                    min={0}
                    max={10}
                    step={0.1}
                    pattern="\d+(\.\d{1,2})?"
                    className=" my-5 border rounded text-center text-[#1C274C] border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                    type="number"
                    placeholder={grade && grade.exam_2}
                    {...register("exam_2", {
                      required: false,
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center mt-10 mb-20">
            <button
              onClick={onSubmit}
              className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
            >
              Guardar cambios
            </button>
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
      </div>
    </div>
  );
}

export default UpdateGrades;
