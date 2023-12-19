import React, { useEffect, useState } from "react";

function Home() {
  return (
    <div className=" overflow-x-hidden relative">
      <div className=" fixed top-0 w-full h-fit bg-white">
        <div>
          <h1 className=" text-left p-2 text-[#1C274C]">
            Bienvenid@ al <span className=" pl-1 font-bold">S</span>istema{" "}
            <span className=" pl-1 font-bold">I</span>ntegral{" "}
            <span className=" pl-1 font-bold">A</span>cademico
          </h1>
        </div>
      </div>
      <div className=" m-5 h-fit w-full mt-14 flex justify-center">
        <div className=" block w-[80%]">
          <div className=" grid grid-cols-1 ">
            <div className=" flex justify-center m-10">
              {" "}
              <img src="/images/white-logo.png" className=" h-[70px]" alt="" />
            </div>
            <div className=" flex justify-center items-center">
              <div className=" m-5">
                <h1 className=" text-center mx-10 text-white">
                  Somos más que una plataforma académica; somos tu socio en el
                  viaje del aprendizaje. En el Instituto Superior Tecnológico de
                  la Vera Cruz, creemos en el poder de la educación para
                  transformar vidas. Nuestra misión es proporcionar a los
                  estudiantes de todas partes acceso a cursos de calidad,
                  recursos innovadores y una comunidad de aprendices
                  apasionados.
                </h1>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center">
            <div className=" mt-5 grid grid-cols-3 gap-x-20">
              <div>
                <button className=" p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#146898] text-white hover:text-white text-sm lg:text-base duration-500">
                  Manual de uso
                </button>
              </div>
              <div>
                <button className=" p-2 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#146898] text-white hover:text-white text-sm lg:text-base duration-500">
                  Soporte técnico
                </button>
              </div>
              <div>
                <button className=" p-2 px-4 active:transform active:scale-90 border border-white rounded-lg hover:bg-[#146898] text-white hover:text-white text-sm lg:text-base duration-500">
                  Academico
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
