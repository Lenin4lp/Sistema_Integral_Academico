import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { updateUser, updateTeacher } from "../../api/user";

function Modify() {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const updateATeacher = async (userId, data) => {
    try {
      const res = await updateTeacher(userId, data);
      if (res.status === 200) {
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const updateAnUser = async (userId, data) => {
    try {
      const res = await updateUser(userId, data);
      if (res.status === 200) {
        if (user.role_id === 1) {
          alert("Información actualizada");
          navigate("/perfil");
        } else {
          updateATeacher(user.user_id, data);
          alert("Información actualizada");
          navigate("/perfil");
        }
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
        modifiedData[key] = data[key];
      }
    }
    updateAnUser(user.user_id, modifiedData);
  });

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <div className=" overflow-x-hidden flex justify-center w-full">
      <div className=" block">
        <div className=" w-full pt-5 sm:pt-12 mb-3 md:mb-10 mx-7 flex items-center text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-left">
          {user && user.role_id === 1
            ? "Cambiar Contraseña"
            : "Actualizar información"}
        </div>
        <div className=" flex justify-center items-center">
          <div className=" block">
            {user && user.role_id === 1 ? (
              <div className=" mx-7">
                <p className=" my-5 text-white text-base  font-semibold">
                  Escribe tu nueva contraseña
                </p>
                <form>
                  <input
                    name="password"
                    type="password"
                    placeholder="**********************"
                    className=" w-[190px] sm:w-full bg-white text-[1rem] dark:bg-[#b4b4b4] font-normal placeholder-[#1c274cbb] text-white border border-gray-200 rounded py-2 px-1 mb-3"
                    {...register("user_password", {
                      maxLength: 20,
                      required: true,
                      minLength: 6,
                    })}
                  />
                </form>
              </div>
            ) : (
              <div className="">
                <form className=" ">
                  <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="m-3 sm:m-10 ">
                      <p className=" text-white">No. Cédula</p>
                      <input
                        name="ci"
                        type="text"
                        placeholder="1777777777"
                        className="  w-[180px] lg:w-[225px] bg-white text-[1rem] dark:bg-[#b4b4b4] font-normal placeholder-[#1c274cbb] text-white border border-gray-200 rounded py-2 px-1 mb-3"
                        {...register("user_ci", {
                          maxLength: 10,
                          required: false,
                          minLength: 9,
                          pattern: "[0-9]+",
                        })}
                      />
                    </div>
                    <div className="m-3 sm:m-10 ">
                      <p className=" text-white">Profesión</p>
                      <input
                        name="speciality"
                        type="text"
                        placeholder="Profesión"
                        className="  w-[180px] lg:w-[225px]  bg-white text-[1rem] dark:bg-[#b4b4b4] font-normal placeholder-[#1c274cbb] text-white border border-gray-200 rounded py-2 px-1 mb-3"
                        {...register("speciality", { required: false })}
                      />
                    </div>
                    <div className="m-3 sm:m-10">
                      <p className=" text-white">Teléfono</p>
                      <input
                        name="phone"
                        type="text"
                        placeholder="0999999999"
                        className="  w-[180px] lg:w-[225px]  bg-white text-[1rem] dark:bg-[#b4b4b4] font-normal placeholder-[#1c274cbb] text-white border border-gray-200 rounded py-2 px-1 mb-3"
                        {...register("user_phone", {
                          maxLength: 10,
                          required: false,
                          minLength: 9,
                          pattern: "[0-9]+",
                        })}
                      />
                    </div>
                    <div className="m-3 sm:m-10 ">
                      <p className=" text-white">Cambiar contraseña</p>
                      <input
                        name="password"
                        type="password"
                        placeholder="**********************"
                        className=" w-[180px] lg:w-[225px]  bg-white text-[1rem] dark:bg-[#b4b4b4] font-normal placeholder-[#1c274cbb] text-white border border-gray-200 rounded py-2 px-1 mb-3"
                        {...register("user_password", {
                          maxLength: 20,
                          required: false,
                          minLength: 6,
                        })}
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            <div className=" mx-7 mt-5 flex justify-left sm:justify-center">
              <button
                onClick={onSubmit}
                className=" p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#146898] text-white hover:text-white text-[13px] duration-500"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>

        <div className=" flex justify-center items-center">
          <div className=" block">
            {errors && errors.length > 0 && (
              <div className=" bg-red-800 w-fit p-1 mt-10 text-white text-center rounded">
                {errors[0]}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modify;
