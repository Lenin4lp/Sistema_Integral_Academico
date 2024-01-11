import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerSubject } from "../../../api/academic";
import { Toaster, toast } from "sonner";

function RegisterSubject() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);

  const createSubject = async (data) => {
    try {
      const res = await registerSubject(data);
      if (res.status === 200) {
        toast.success("Materia registrada exitosamente");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
      toast.error("Error al registrar la materia", {
        duration: 3000,
      });
    }
  };

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }
    createSubject(modifiedData);
  });

  return (
    <div className="my-8 lg:my-14 mx-1 sm:mx-2 md:mx-10 w-full overflow-x-hidden">
      <div className=" h-fit block ml-1 lg:ml-10">
        <div className=" font-bold text-xl">
          <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
            Registrar Materia
          </h1>
        </div>
        <>
          <div className=" my-5 md:my-10 flex justify-center items-center ">
            <form action="">
              <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                <div className=" mx-5 md:mx-10 my-5 h-fit ">
                  <p className=" text-sm md:text-base text-white">Acrónimo</p>
                  <input
                    name="name"
                    type="text"
                    placeholder="NBC"
                    className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                    {...register("subject_acronym", {
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
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default RegisterSubject;
