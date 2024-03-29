import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateGrade, getGrade } from "../../api/academic";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

function ModifyGrades() {
  const { gradeId } = useParams();
  const { handleSubmit, register } = useForm();
  const [errors, setErrors] = useState([]);
  const [grade, setGrade] = useState([]);

  useEffect(() => {
    getAGrade(gradeId);
  }, []);

  const updateAGrade = async (gradeId, grade) => {
    try {
      const res = await updateGrade(gradeId, grade);
      if (res.status === 200) {
        console.log(res.data);
        toast.success("Calificaciones modificadas");
        setTimeout(() => {
          window.location.href = "/calificaciones";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAGrade = async (gradeId) => {
    try {
      const res = await getGrade(gradeId);
      if (res.status === 200) {
        setGrade(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};

    if (data.resit) {
      data.resit = parseFloat(data.resit);
    }
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

    if (data.attendance_1) {
      data.attendance_1 = parseInt(data.attendance_1);
    }
    if (data.attendance_2) {
      data.attendance_2 = parseInt(data.attendance_2);
    }

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }

    updateAGrade(gradeId, modifiedData);
  });

  return (
    <div className=" flex justify-center items-center">
      <div className=" overflow-x-hidden">
        <form className=" block">
          <div className=" mt-10 mb-3 mx-3 md:mx-10 justify-center flex items-center text-xl sm:text-2xl md:text-3xl font-bold text-white text-left">
            Registro de calificaciones
          </div>
          <div className="mx-3 md:mx-10 mt-10 font-semibold text-white text-base lg:text-lg">
            Estudiante:{" "}
            <span className=" text-base font-normal">{`  ${
              grade.student && grade.student.user.user_name
            } ${grade.student && grade.student.user.user_lastname}`}</span>
          </div>
          <div className="mx-3 md:mx-10 mt-5 mb-8 md:mb-14 font-semibold text-white text-base lg:text-lg">
            Materia:{" "}
            <span className=" text-base font-normal">{`  ${
              grade.group && grade.group.subject.subject_name
            }`}</span>
          </div>
          <div className=" mx-3 md:mx-10 mt-10 font-semibold text-sm lg:text-lg">
            <div className=" grid grid-cols-1 md:grid-cols-4 ">
              <div className="  flex justify-center items-center col-span-1 h-[50px] md:h-[150px] w-[175px] lg:w-[250px] rounded bg-[#1C274C] text-white">
                <p>1er Hemisemestre</p>
              </div>
              <div
                className=" col-span-3 rounded border-slate-300 border text-[#1C274C]"
                action=""
              >
                <div className=" grid grid-cols-2 md:grid-cols-4 pt-10">
                  <div className=" text-center block">
                    <p className=" text-white">Nota 1</p>
                    <input
                      min={0}
                      max={10}
                      step={0.1}
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                      type="number"
                      placeholder={grade.grade_1}
                      {...register("grade_1", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p className=" text-white">Nota 2</p>
                    <input
                      min={0}
                      max={10}
                      step={0.1}
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                      type="number"
                      pattern="\d+(\.\d{1,2})?"
                      placeholder={grade.grade_2}
                      {...register("grade_2", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p className=" text-white">Prueba</p>
                    <input
                      min={0}
                      max={10}
                      step={0.1}
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                      type="number"
                      pattern="\d+(\.\d{1,2})?"
                      placeholder={grade.test_1}
                      {...register("test_1", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p className=" text-white">Examen</p>
                    <input
                      min={0}
                      max={10}
                      step={0.1}
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                      type="number"
                      pattern="\d+(\.\d{1,2})?"
                      placeholder={grade.exam_1}
                      {...register("exam_1", {
                        required: false,
                      })}
                    />
                  </div>

                  <div className=" text-center block">
                    <p className=" text-white">Asistencia</p>
                    <input
                      min={0}
                      max={10}
                      step={0.1}
                      pattern="\d+(\.\d{1,2})?"
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                      type="number"
                      placeholder={grade.attendance_1}
                      {...register("attendance_1", {
                        required: false,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-3 md:mx-10 mt-10 text-sm lg:text-lg font-semibold">
            <div className=" grid grid-cols-1 md:grid-cols-4 ">
              <div className="  flex justify-center items-center col-span-1 h-[50px] md:h-[150px] w-[175px] lg:w-[250px] rounded bg-[#1C274C] text-white">
                <p>2do Hemisemestre</p>
              </div>
              <div
                className=" col-span-3 rounded border-slate-300 border text-[#1C274C]"
                action=""
              >
                <div className=" grid grid-cols-2 md:grid-cols-4 pt-10">
                  <div className=" text-center block">
                    <p className=" text-white">Nota 1</p>
                    <input
                      min={0}
                      max={10}
                      step={0.1}
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                      type="number"
                      pattern="\d+(\.\d{1,2})?"
                      placeholder={grade.grade_3}
                      {...register("grade_3", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p className=" text-white">Nota 2</p>
                    <input
                      min={0}
                      max={10}
                      step={0.1}
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                      type="number"
                      pattern="\d+(\.\d{1,2})?"
                      placeholder={grade.grade_4}
                      {...register("grade_4", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p className=" text-white">Prueba</p>
                    <input
                      min={0}
                      max={10}
                      step={0.1}
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                      type="number"
                      pattern="\d+(\.\d{1,2})?"
                      placeholder={grade.test_2}
                      {...register("test_2", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p className=" text-white">Examen</p>
                    <input
                      min={0}
                      max={10}
                      step={0.1}
                      pattern="\d+(\.\d{1,2})?"
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                      type="number"
                      placeholder={grade.exam_2}
                      {...register("exam_2", {
                        required: false,
                      })}
                    />
                  </div>

                  <div className=" text-center block">
                    <p className=" text-white">Asistencia</p>
                    <input
                      min={0}
                      max={10}
                      step={0.1}
                      pattern="\d+(\.\d{1,2})?"
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                      type="number"
                      placeholder={grade.attendance_2}
                      {...register("attendance_2", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p className=" text-white">Recup.</p>
                    <input
                      min={0}
                      max={10}
                      step={0.1}
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-28 lg:w-40"
                      type="number"
                      placeholder={grade.resit}
                      {...register("resit", {
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
                className=" p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#1C274C] text-white hover:text-white text-[13px] duration-500"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </form>
        <Toaster position="top-center" richColors />
      </div>
    </div>
  );
}

export default ModifyGrades;
