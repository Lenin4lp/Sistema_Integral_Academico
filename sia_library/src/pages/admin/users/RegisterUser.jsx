import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getDegrees, getModalities } from "../../../api/academic";
import { registerRequest } from "../../../api/auth";
import { updateStudent } from "../../../api/user";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterUser() {
  const { register, handleSubmit } = useForm();
  const [userRole, setUserRole] = useState();
  const [errors, setErrors] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getDegreesList();
    getModalitiesList();
  }, []);

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

    if (data.modality_id === "1") {
      data.modality_id = 1;
    } else if (data.modality_id === "2") {
      data.modality_id = 2;
    } else {
      data.modality_id = "";
    }

    if (data.degree_id == "Selecciona la Carrera") {
      data.degree_id = "";
    }

    if (
      data.user_genre === null ||
      data.user_genre === undefined ||
      data.user_genre === "Selecciona el género"
    ) {
      data.user_genre = "";
    }

    if (data.user_status === "true") {
      data.user_status = true;
    } else if (data.user_status === "false") {
      data.user_status = false;
    } else {
      data.user_status = false;
    }

    if (data.role_id === "1") {
      data.role_id = 1;
    } else if (data.role_id === "2") {
      data.role_id = 2;
    } else if (data.role_id === "3") {
      data.role_id = 3;
    } else {
      data.role_id = "";
    }

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }

    modifiedData.user_status = isChecked;

    if (modifiedData.user_status === true) {
      modifiedData.user_status = false;
    } else if (modifiedData.user_status === false) {
      modifiedData.user_status = true;
    }

    registerUser(modifiedData);
  });

  const editStudent = async (id, data) => {
    try {
      const res = await updateStudent(id, data);
      if (res.status === 200) {
        alert("Usuario creado exitosamente");
        navigate("/admin/usuarios");
      }
    } catch (error) {
      setErrors(error.response.data);
      console.log(error.response.data);
    }
  };

  const registerUser = async (data) => {
    try {
      const res = await registerRequest(data);
      if (res.status === 200) {
        if (res.data.role_id === 1) {
          editStudent(res.data.id, data);
        } else {
          alert("Usuario creado exitosamente");
          navigate("/admin/usuarios");
        }
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const getDegreesList = async () => {
    try {
      const res = await getDegrees();
      if (res.status === 200) {
        setDegrees(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const getModalitiesList = async () => {
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

  return (
    <div className="my-8 lg:my-14 mx-2 md:mx-10 w-full">
      <div className=" h-fit block ml-1 lg:ml-10">
        <div className=" font-bold text-xl">
          <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
            Registrar Usuario
          </h1>
        </div>
        <Link to={"/admin/usuarios"}>
          <button className=" mt-5 md:mt-10 p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500">
            Regresar
          </button>
        </Link>
        <div className=" my-5 md:my-10 flex justify-center items-center ">
          <form action="">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className=" mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">Nombres</p>
                <input
                  name="name"
                  type="text"
                  placeholder="Nombre"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("user_name", {
                    maxLength: 30,
                    required: false,
                  })}
                />
              </div>
              <div className="mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">Apellidos</p>
                <input
                  name="last_name"
                  type="text"
                  placeholder="Apellidos"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("user_lastname", { required: false })}
                />
              </div>
              <div className="mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">
                  Cédula o Pasaporte
                </p>
                <input
                  name="ci"
                  type="number"
                  placeholder="1777777777"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("user_ci", {
                    maxLength: 10,
                    required: false,
                    minLength: 9,
                    pattern: "[0-9]+",
                  })}
                />
              </div>
              <div className="mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">
                  Correo Institucional
                </p>
                <input
                  name="email"
                  type="email"
                  placeholder="usuario@istvc.edu.ec"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("user_email", { required: false })}
                />
              </div>
              <div className="mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">Nacionalidad</p>
                <input
                  name="citizenship"
                  type="text"
                  placeholder="ecuatoriana"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("user_Citizenship", { required: false })}
                />
              </div>
              <div className="mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">Teléfono</p>
                <input
                  name="ci"
                  type="number"
                  placeholder="0999999999"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("user_phone", {
                    maxLength: 10,
                    required: false,
                    minLength: 9,
                    pattern: "[0-9]+",
                  })}
                />
              </div>
              <div className="mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">Género</p>
                <select
                  className=" w-42 md:w-56 lg:w-full bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mt-3"
                  {...register("user_genre")}
                >
                  <option>Selecciona el género</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
              <div className="mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">Rol</p>
                <select
                  className=" w-42 md:w-56 lg:w-full bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mt-3"
                  {...register("role_id", {
                    onChange: (e) => setUserRole(e.target.value),
                  })}
                >
                  <option>Selecciona el rol</option>
                  <option value={1}>Estudiante</option>
                  <option value={2}>Docente</option>
                  <option value={3}>Administrador</option>
                </select>
              </div>
              <div className="mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">Contraseña</p>
                <input
                  name="password"
                  type="password"
                  placeholder="**********************"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("user_password", {
                    maxLength: 20,
                    required: false,
                    minLength: 6,
                  })}
                />
              </div>
            </div>
            <div className=" grid grid-cols-1">
              <div className="mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">Dirección</p>
                <textarea
                  className="w-full lg:w-full bg-white text-[1rem] h-40 font-normal placeholder-[#1c274cbb] text-[#1C274C] border border-gray-200 rounded py-2 px-1 mt-3"
                  type="text"
                  cols={2}
                  placeholder="Dirección"
                  {...register("user_direction", { maxLength: 80 })}
                />
              </div>

              <div className="mx-5 md:mx-10 flex justify-center items-center my-5 h-fit ">
                <label className="themeSwitcherTwo relative py-5 inline-flex cursor-pointer select-none items-center">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="sr-only"
                    value={isChecked}
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
            </div>

            {userRole === "1" && (
              <div className=" mt-5 flex justify-center items-center">
                <div className=" block">
                  <div className=" flex justify-center items-center">
                    <div className=" h-[3px] w-[50vw] bg-[#146898]"></div>
                  </div>
                  <div className="flex justify-center items-center">
                    <h1 className=" my-5 text-base md:text-lg text-white font-semibold">
                      Perfil Academico
                    </h1>
                  </div>

                  <div className=" grid grid-cols-1 md:grid-cols-2 m-1 md:m-14">
                    <div className="sm:mx-5 md:mx-10 my-5 h-fit ">
                      <p className=" text-white text-sm md:text-base">
                        Modalidad
                      </p>
                      <select
                        className=" w-42 md:w-56 lg:w-full bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mt-3"
                        {...register("modality_id")}
                      >
                        {modalities.map((modality) => (
                          <option
                            value={modality.modality_id}
                            key={modality.modality_id}
                          >
                            {modality.modality_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:mx-5 md:mx-10 my-5 h-fit ">
                      <p className=" text-white text-sm md:text-base">
                        Carrera
                      </p>
                      <select
                        className=" w-44 md:w-56 lg:w-full bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 px-1 mt-3"
                        {...register("degree_id")}
                      >
                        {degrees &&
                          degrees.map((degree) => (
                            <option
                              value={degree.degree_id}
                              key={degree.degree_id}
                            >
                              {degree.degree_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className=" flex justify-center items-center">
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

export default RegisterUser;
