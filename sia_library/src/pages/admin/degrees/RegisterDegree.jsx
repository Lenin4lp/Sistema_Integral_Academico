import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { registerDegree } from "../../../api/academic";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterDegree() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const createDegree = async (data) => {
    try {
      const res = await registerDegree(data);
      if (res.status === 200) {
        alert("Carrera creada exitosamente");
        navigate("/admin/carreras");
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

    if (data.degree_duration === "1") {
      data.degree_duration = 1;
    } else if (data.degree_duration === "2") {
      data.degree_duration = 2;
    } else if (data.degree_duration === "3") {
      data.degree_duration = 3;
    } else if (data.degree_duration === "4") {
      data.degree_duration = 4;
    } else {
      data.degree_duration = "";
    }

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }

    createDegree(modifiedData);
  });

  return (
    <div className="my-8 lg:my-14 mx-2 md:mx-10 w-full">
      <div className=" h-fit block ml-1 lg:ml-10">
        <div className=" font-bold text-xl">
          <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
            Registrar Carrera
          </h1>
        </div>
        <Link to={"/admin/carreras"}>
          <button className=" mt-5 md:mt-10 p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500">
            Regresar
          </button>
        </Link>
        <div className=" my-5 md:my-10 flex justify-center items-center ">
          <form action="">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className=" mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">
                  Nombre de la carrera
                </p>
                <input
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("degree_name", {
                    maxLength: 60,
                    required: false,
                  })}
                />
              </div>
              <div className="mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">
                  Duración de la carrera
                </p>
                <input
                  name="number"
                  type="number"
                  placeholder="4"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("degree_duration", {
                    required: false,
                    max: 4,
                    maxLength: 1,
                  })}
                />
              </div>
              <div className=" mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">Acrónimo</p>
                <input
                  name="name"
                  type="text"
                  placeholder="AF"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("degree_acronym", {
                    maxLength: 3,
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

export default RegisterDegree;
