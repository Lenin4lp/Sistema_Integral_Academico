import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateGrade, getGrade } from "../../api/academic";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function ModifyGrades() {
  const { gradeId } = useParams();
  const { handleSubmit, register } = useForm();
  const [errors, setErrors] = useState([]);
  const [grade, setGrade] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAGrade(gradeId);
  }, []);

  const updateAGrade = async (gradeId, grade) => {
    try {
      const res = await updateGrade(gradeId, grade);
      if (res.status === 200) {
        alert("Calificaciones modificadas");
        navigate(`/cursos`);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
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
      setErrors(error.response.data);
    }
  };

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};
    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = parseFloat(data[key]).toFixed(2);
      }
    }
    updateAGrade(gradeId, modifiedData);
  });

  return (
    <div>
      <div className=" overflow-x-hidden">
        <form className=" block">
          <div className=" mt-24 md:mt-28 mb-3 mx-3 md:mx-10 flex items-center  text-2xl md:text-3xl font-bold text-[#1C274C] text-left">
            Registro de calificaciones
          </div>
          <div className="mx-3 md:mx-10 mt-10 font-semibold text-[#1C274C] md:text-xl">
            Estudiante:{" "}
            <span className=" font-normal">{`  ${
              grade.student && grade.student.user.user_name
            } ${grade.student && grade.student.user.user_lastname}`}</span>
          </div>
          <div className="mx-3 md:mx-10 mt-5 mb-14 font-semibold text-[#1C274C] md:text-xl">
            Materia:{" "}
            <span className=" font-normal">{`  ${
              grade.group && grade.group.subject.subject_name
            }`}</span>
          </div>
          <div className=" mx-3 md:mx-10 mt-10 font-semibold md:text-xl">
            <div className=" grid grid-cols-4 ">
              <div className="  flex justify-center items-center col-span-1 h-[150px] w-[250px] rounded bg-[#1C274C] text-white">
                <p>1er Hemisemestre</p>
              </div>
              <div
                className=" col-span-3 rounded border-slate-300 border text-[#1C274C]"
                action=""
              >
                <div className=" grid grid-cols-4 pt-10">
                  <div className=" text-center block">
                    <p>Nota 1</p>
                    <input
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-40"
                      type="number"
                      placeholder={grade.grade_1}
                      {...register("grade_1", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p>Nota 2</p>
                    <input
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-40"
                      type="number"
                      placeholder={grade.grade_2}
                      {...register("grade_2", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p>Prueba</p>
                    <input
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-40"
                      type="number"
                      placeholder={grade.test_1}
                      {...register("test_1", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p>Examen</p>
                    <input
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-40"
                      type="number"
                      placeholder={grade.exam_1}
                      {...register("exam_1", {
                        required: false,
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" mx-3 md:mx-10 mt-10 font-semibold md:text-xl">
            <div className=" grid grid-cols-4 ">
              <div className="  flex justify-center items-center col-span-1 h-[150px] w-[250px] rounded bg-[#1C274C] text-white">
                <p>2do Hemisemestre</p>
              </div>
              <div
                className=" col-span-3 rounded border-slate-300 border text-[#1C274C]"
                action=""
              >
                <div className=" grid grid-cols-4 pt-10">
                  <div className=" text-center block">
                    <p>Nota 1</p>
                    <input
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-40"
                      type="number"
                      placeholder={grade.grade_3}
                      {...register("grade_3", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p>Nota 2</p>
                    <input
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-40"
                      type="number"
                      placeholder={grade.grade_4}
                      {...register("grade_4", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p>Prueba</p>
                    <input
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-40"
                      type="number"
                      placeholder={grade.test_2}
                      {...register("test_2", {
                        required: false,
                      })}
                    />
                  </div>
                  <div className=" text-center block">
                    <p>Examen</p>
                    <input
                      className=" my-5 border rounded text-center border-slate-300 focus:border-slate-400 w-40"
                      type="number"
                      placeholder={grade.exam_2}
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
                className="mt-10 p-2 bg-gradient-to-br from-[#3a9161] text-base font-medium to-[#1ce09f] hover:from-[#1C274C] hover:to-[#146898] transition duration-300 text-white rounded-lg"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifyGrades;
