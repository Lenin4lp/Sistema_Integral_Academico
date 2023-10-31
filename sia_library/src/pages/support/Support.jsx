import React from "react";
import Navbar from "../../components/navbar";
Navbar;

function Support() {
  return (
    <div>
      <div className=" mt-24 md:mt-32  mb-5 md:mb-10 mx-3 md:mx-10 flex items-center justify-center text-center text-lg md:text-xl">
        <div className=" block">
          <div className=" flex justify-center items-center mb-10">
            <svg className=" h-[100px] w-[100px] md:h-[150px] md:w-[150px]"
              
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="3"
              stroke="#000000"
              fill="none"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M12.91,31.8V26.1a19.09,19.09,0,0,1,38.18,0v5.7"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M12.06,31.8h4.7a0,0,0,0,1,0,0V45.18a0,0,0,0,1,0,0h-4.7a3,3,0,0,1-3-3V34.8A3,3,0,0,1,12.06,31.8Z"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M50.24,31.8h4.7a0,0,0,0,1,0,0V45.18a0,0,0,0,1,0,0h-4.7a3,3,0,0,1-3-3V34.8A3,3,0,0,1,50.24,31.8Z"
                  transform="translate(102.18 76.98) rotate(180)"
                  strokeLinecap="round"
                ></path>
                <path
                  d="M51.7,45.56v5a4,4,0,0,1-4,4H36.56"
                  strokeLinecap="round"
                ></path>
                <rect
                  x="28.45"
                  y="51.92"
                  width="8.1"
                  height="5.07"
                  rx="2"
                  strokeLinecap="round"
                ></rect>
              </g>
            </svg>
          </div>
          <h3>
            Si presentas algún inconveniente con la plataforma, por favor
            comunícate a este correo:
          </h3>
          <h3 className=" mt-3 text-[#146898] hover:text-">
            <a href="mailto:tics.plataforma@istvc.edu.ec">
              tics.plataforma@istvc.edu.ec
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Support;
