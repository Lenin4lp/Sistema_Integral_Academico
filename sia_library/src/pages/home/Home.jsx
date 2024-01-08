import React, { useEffect, useState } from "react";

function Home() {
  return (
    <>
      <div className=" overflow-x-hidden relative">
        <div className=" fixed top-0 w-full h-fit bg-white z-30">
          <div>
            <h1 className=" text-left text-[12px] md:text-base p-2 text-[#1C274C]">
              Bienvenid@ al <span className=" pl-1 font-bold">S</span>istema{" "}
              <span className=" pl-1 font-bold">I</span>ntegral{" "}
              <span className=" pl-1 font-bold">A</span>cadémico
            </h1>
          </div>
        </div>
      </div>
      <div className=" overflow-x-hidden relative flex justify-center items-center">
        <div className=" flex justify-center items-center">
          <div className="  h-fit w-full mt-8 md:mt-14 flex justify-center">
            <div className=" block w-full lg:w-[80%]">
              <div className=" grid grid-cols-1 ">
                <div className=" flex justify-center items-center m-10">
                  {" "}
                  <img
                    src="/images/white-logo.png"
                    className=" h-[40px] md:h-[70px]"
                    alt=""
                  />
                </div>
                <div className=" flex justify-center items-center">
                  <div className="">
                    <h1 className=" text-center mx-10 text-[12px] sm:text-sm md:text-base text-white">
                      Somos más que una plataforma académica; somos tu socio en
                      el viaje del aprendizaje. En el Instituto Superior
                      Tecnológico de la Vera Cruz, creemos en el poder de la
                      educación para transformar vidas. Nuestra misión es
                      proporcionar a los estudiantes de todas partes acceso a
                      cursos de calidad, recursos innovadores y una comunidad de
                      aprendices apasionados.
                    </h1>
                  </div>
                </div>
              </div>
              <div className=" flex justify-center items-center">
                <div className=" mt-5 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-x-2 sm:gap-x-10 md:gap-x-20">
                  <div className=" flex justify-center items-center my-2">
                    <button className=" p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#146898] text-white hover:text-white text-[12px] md:text-sm lg:text-base duration-500">
                      Manual de uso
                    </button>
                  </div>
                  <div className=" flex justify-center items-center my-2">
                    <a href="mailto:tics.plataforma@istvc.edu.ec">
                      <button className=" p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#146898] text-white hover:text-white text-[12px] md:text-sm lg:text-base duration-500">
                        Soporte técnico
                      </button>
                    </a>
                  </div>
                  <div className=" flex justify-center items-center my-2">
                    <a href="/academico">
                      <button className=" p-2 px-4 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#146898] text-white hover:text-white text-[12px] md:text-sm lg:text-base duration-500">
                        Académico
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className=" flex justify-center items-center">
                <div className=" my-6 md:my-20 grid grid-cols-3 gap-x-5 md:gap-x-20">
                  <div className=" flex justify-center items-center">
                    <svg
                      className="h-[25px] md:h-[35px] hover:cursor-pointer hover:scale-110 duration-300"
                      fill="#ffffff"
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <title>facebook</title>{" "}
                        <path d="M30.996 16.091c-0.001-8.281-6.714-14.994-14.996-14.994s-14.996 6.714-14.996 14.996c0 7.455 5.44 13.639 12.566 14.8l0.086 0.012v-10.478h-3.808v-4.336h3.808v-3.302c-0.019-0.167-0.029-0.361-0.029-0.557 0-2.923 2.37-5.293 5.293-5.293 0.141 0 0.281 0.006 0.42 0.016l-0.018-0.001c1.199 0.017 2.359 0.123 3.491 0.312l-0.134-0.019v3.69h-1.892c-0.086-0.012-0.185-0.019-0.285-0.019-1.197 0-2.168 0.97-2.168 2.168 0 0.068 0.003 0.135 0.009 0.202l-0.001-0.009v2.812h4.159l-0.665 4.336h-3.494v10.478c7.213-1.174 12.653-7.359 12.654-14.814v-0z"></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div className=" flex justify-center items-center">
                    <svg
                      className="h-[25px] md:h-[35px] hover:cursor-pointer hover:scale-110 duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z"
                          fill="#ffffff"
                        />{" "}
                      </g>
                    </svg>
                  </div>
                  <div className=" flex justify-center items-center">
                    <svg
                      className="h-[25px] md:h-[35px] hover:cursor-pointer hover:scale-110 duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.982 19.61c.454-.7.909-1.6 1.236-2.755.755.29 1.273.636 1.591.909a8.182 8.182 0 0 1-2.864 1.845h.037v.001zm-8.8-1.855c.336-.273.845-.61 1.6-.91.336 1.164.773 2.064 1.236 2.764A8.2 8.2 0 0 1 6.2 17.755h-.018zm10.636-6.664c-.028-.81-.11-1.619-.245-2.418 1-.364 1.727-.8 2.236-1.2a8.136 8.136 0 0 1 1.282 3.618h-3.273zm-8.973-4.2a5.936 5.936 0 0 1-1.481-.8 8.2 8.2 0 0 1 2.654-1.7c-.427.636-.845 1.454-1.182 2.5h.01-.001zm7.137-2.5a8.145 8.145 0 0 1 2.654 1.7 6.01 6.01 0 0 1-1.481.8 9.58 9.58 0 0 0-1.182-2.5h.009zM14.8 9.118c.09.6.182 1.246.2 1.973H9c.027-.727.09-1.382.182-1.973 1.855.334 3.754.334 5.609 0h.009zM12 7.545c-.91 0-1.71-.072-2.39-.181.726-2.237 1.854-3.137 2.39-3.455.518.318 1.655 1.227 2.382 3.455A15.04 15.04 0 0 1 12 7.545zm-6.818-.072a8.03 8.03 0 0 0 2.245 1.2 18.368 18.368 0 0 0-.245 2.418h-3.31a8.13 8.13 0 0 1 1.319-3.618h-.01.001zm-1.3 5.436h3.3c.036.782.09 1.5.2 2.155a7.682 7.682 0 0 0-2.31 1.272 8.11 8.11 0 0 1-1.2-3.427h.01zM12 14.364c-1.09 0-2.027.09-2.845.236A16.91 16.91 0 0 1 9 12.91h6c-.027.608-.073 1.18-.145 1.69A15.388 15.388 0 0 0 12 14.355v.009zm0 5.727c-.545-.327-1.745-1.3-2.473-3.727A14.095 14.095 0 0 1 12 16.182c.955 0 1.773.063 2.482.182-.727 2.454-1.927 3.4-2.473 3.727H12zm6.927-3.764a7.634 7.634 0 0 0-2.309-1.272 17.95 17.95 0 0 0 .2-2.146h3.31a8.11 8.11 0 0 1-1.2 3.418h-.001zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
                          fill="#ffffff"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
