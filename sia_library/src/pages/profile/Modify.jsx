import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/user";

function Modify() {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const updateAnUser = async (userId, data) => {
    try {
      const res = await updateUser(userId, data);
      if (res.status === 200) {
        alert("Contraseña modificada");
        navigate("/perfil");
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const onSubmit = handleSubmit((data) => {
    updateAnUser(user.user_id, data);
  });

  return (
    <div className=" overflow-x-hidden">
      <div className=" block">
        <div className=" mt-24 md:mt-28 mb-14 md:mb-10 mx-7 flex items-center text-xl md:text-2xl lg:text-3xl font-bold text-[#1C274C] text-left">
          Modificar Contraseña
        </div>
        <div className=" flex justify-center items-center">
          <div className=" block">
            <p className=" my-5 text-[#1C274C] text-base  font-semibold">
              Escribe tu nueva contraseña
            </p>
            <form>
              <input
                name="password"
                type="password"
                placeholder="**********************"
                className=" w-56 lg:w-full bg-white text-[1rem] dark:bg-[#b4b4b4] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mb-3"
                {...register("user_password", {
                  maxLength: 20,
                  required: true,
                  minLength: 6,
                })}
              />
            </form>
            <div className=" flex justify-center">
              <button
                onClick={onSubmit}
                className=" mt-10 p-2 bg-gradient-to-br from-[#3a9161] to-[#1ce09f] hover:from-[#1C274C] hover:to-[#146898] transition duration-300 text-white rounded-lg"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modify;
