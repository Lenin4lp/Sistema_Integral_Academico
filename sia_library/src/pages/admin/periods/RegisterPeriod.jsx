import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerPeriod } from "../../../api/academic";
import { useNavigate } from "react-router-dom";

function RegisterPeriod() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const createPeriod = async (data) => {
    try {
      const res = await registerPeriod(data);
      if (res.status === 200) {
        alert("Periodo creado exitosamente");
        navigate("/admin/materias");
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }

    createPeriod(modifiedData);
  });

  return (
    <div className="my-8 lg:my-14 mx-2 md:mx-10 w-full">
      <div className=" h-fit block ml-1 lg:ml-10">
        <div className=" font-bold text-xl">
          <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
            Registrar Periodos
          </h1>
        </div>
        <div className=" my-5 md:my-10 flex justify-center items-center ">
          <form action="">
            <div className=" grid grid-cols-1 md:grid-cols-2">
              <div className=" mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">Id Periodo</p>
                <input
                  name="id"
                  type="text"
                  placeholder="2023-2024"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("period_id", {
                    maxLength: 60,
                    required: false,
                  })}
                />
              </div>
              <div className="mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">
                  Nombre del Periodo
                </p>
                <input
                  name="name"
                  type="text"
                  placeholder="ABR2023-SEP2023"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("period_name", {
                    maxLength: 60,
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
                Registrar
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
      </div>
    </div>
  );
}

export default RegisterPeriod;
