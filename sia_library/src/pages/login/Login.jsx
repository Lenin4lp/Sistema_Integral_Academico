import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/AuthProvider";
import { Navigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: SigninErrors, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <section className="h-fit lg:h-screen bg-neutral-200 dark:bg-[#19172e] lg:overflow-hidden flex justify-center items-center">
      <div className="container h-fit sm:p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-[#282454] dark:text-[#242142]">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-[#949494] pt-8 sm:pt-0">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <div className=" w-full flex justify-center items-center pb-4 sm:py-4">
                        {/* El componente Image de NextJs -> src hace referencia siempre a la carpeta de login */}
                        <img
                          className=" w-full h-20 object-contain"
                          src={"/images/logo-Istvc.webp"}
                          alt="istvc-logo"
                        />
                      </div>
                    </div>

                    <form onSubmit={onSubmit} className=" sm:p-5 md:p-0 mt-8">
                      <p className="mb-4 select-none">
                        Por favor ingrese su usuario y contraseña
                      </p>
                      {/* <!--Username input--> */}
                      <input
                        className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                        name="email"
                        type="email"
                        {...register("user_email", {
                          required: true,
                        })}
                        placeholder="Usuario"
                      />

                      {/* <!--Password input--> */}
                      <input
                        className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3"
                        name="password"
                        type="password"
                        {...register("user_password", {
                          required: true,
                        })}
                        placeholder="Contraseña"
                      />
                      {SigninErrors &&
                        SigninErrors.map((error, i) => (
                          <div
                            className=" bg-red-800 p-1 text-white text-center rounded"
                            key={i}
                          >
                            {error}
                          </div>
                        ))}
                      <div className="py-5 h-fit text-center grid grid-rows-2">
                        <button
                          type="submit"
                          className="rounded-xl w-36 justify-self-center bg-gradient-to-br from-[#282454] to-[#146898] px-5 py-3 text-base font-medium text-white transition duration-300 hover:shadow-lg hover:shadow-[#0464ac]/50 active:transform active:scale-90"
                        >
                          Ingresar
                        </button>

                        <a
                          className=" hover:text-blue-900 dark:hover:text-black transition duration-700 pt-5"
                          href="mailto:tics.plataforma@istvc.edu.ec"
                        >
                          ¿Olvidaste la contraseña?
                        </a>
                      </div>
                    </form>
                  </div>
                </div>

                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right,#146898, #0464ac, #14246c, #282454)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold text-center sm:text-left">
                      ¡Bienvenidos a la plataforma SIA!
                    </h4>
                    <p className="text-sm text-center sm:text-left">
                      Nuestra plataforma SIA es un lugar donde las ideas cobran
                      vida, las dudas se convierten en descubrimientos y el
                      aprendizaje se entrelaza con la emoción de descubrir un
                      mundo de posibilidades.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
