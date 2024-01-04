import React from "react";

function Degrees() {
  return (
    <div>
      <div className=" overflow-x-hidden relative ">
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
      <div className="  h-fit mt-10 md:mt-5 w-full flex justify-center items-center">
        <div className=" block">
          <div className=" flex justify-start items-start">
            <div className="  mt-8 md:mt-14 mx-2 md:mx-10 inline-flex items-center justify-center gap-3">
              <svg
                className="  h-[20px] w-[20px] sm:h-[30px] sm:w-[30px]"
                fill="#ffffff"
                viewBox="-5 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>university</title>{" "}
                  <path d="M0.84 12.96h20.52c0.48 0 0.84-0.36 0.84-0.84 0-0.36-0.2-0.64-0.52-0.76l-10.2-5.2c-0.24-0.12-0.52-0.12-0.76 0l-10.24 5.2c-0.36 0.16-0.52 0.56-0.44 0.96 0.12 0.36 0.4 0.64 0.8 0.64zM11.12 7.88l6.72 3.4h-13.44l6.72-3.4zM21.36 24.24h-1.64v-9.36c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v9.36h-3.52v-9.36c0-0.48-0.36-0.84-0.84-0.84-0.44 0-0.84 0.36-0.84 0.84v9.36h-3.52v-9.36c0-0.48-0.36-0.84-0.84-0.84s-0.84 0.36-0.84 0.84v9.36h-3.48v-9.36c0-0.48-0.36-0.84-0.84-0.84s-0.8 0.36-0.8 0.84v9.36h-1.64c-0.48 0-0.84 0.36-0.84 0.84s0.36 0.84 0.84 0.84h20.52c0.48 0 0.84-0.36 0.84-0.84s-0.4-0.84-0.88-0.84z"></path>{" "}
                </g>
              </svg>
              <h1 className=" text-white underline underline-offset-8 decoration-2 decoration-[#146898] duration-300 text-xl md:text-2xl lg:text-3xl font-semibold font-mono">
                CARRERAS
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Degrees;
