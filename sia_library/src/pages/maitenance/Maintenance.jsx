import React from "react";

function Maintenance() {
  return (
    <div className=" flex justify-center items-center w-screen h-screen bg-gradient-to-tl from-[#ffffff] to-[#a3a3a3]">
      <div className=" block">
        <div className=" flex justify-center items-center m-5">
          <img
            src="/images/logo-Istvc.webp"
            className=" h-[40px] md:h-[70px]"
            alt=""
          />
        </div>
        <div className=" flex justify-center items-center">
          <div className=" m-5">
            <div className=" block">
              <h1 className=" text-center text-xl font-semibold text-[#1C274C]">
                Lo siento, nos encontramos en mantenimiento
              </h1>
              <div className=" flex justify-center items-center my-7">
                <svg className=" w-auto h-[200px]"
                  fill="#1C274C"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 256 241"
                  enableBackground="new 0 0 256 241"
                  xmlSpace="preserve"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M254,188V2H2v186h111v29H75v22h106v-22h-38v-29H254z M19,19h217v151H19L19,19z M169.385,132.8 c0.131,1.179,0,2.575-0.306,3.885l-11.131-10.258l-10.04,10.957l11.262,10.214c-1.31,0.437-2.575,0.742-3.885,0.742 c-3.885,0.131-7.203-1.048-10.04-3.623c-2.837-2.706-4.365-5.849-4.496-9.734c0-1.353,0.131-2.881,0.437-4.191l-2.706-2.575 l-16.195-14.798l-27.413,30.207c-1.659,2.226-4.234,3.754-7.203,3.754c-4.802,0-8.687-3.885-8.687-8.687 c0-2.575,1.004-4.933,2.968-6.591l28.461-29.509L93.213,86.835c-1.353,0.611-2.881,0.917-4.191,0.917 c-3.885,0.131-7.203-1.048-10.04-3.623s-4.365-5.718-4.496-9.603c-0.131-1.179,0-2.575,0.306-3.885l11.262,10.214l9.953-10.913 L84.745,59.728c1.179-0.437,2.575-0.742,3.885-0.742c3.885-0.131,7.203,1.048,10.04,3.623c2.837,2.532,4.365,5.849,4.496,9.734 c0.131,1.31,0,2.575-0.306,3.885l17.723,16.238l12.965-14.012l-19.381-17.068l17.592-20.036l49.807,43.826l-17.592,20.036 l-19.905-17.548l-12.528,14.798l19.469,17.81c1.31-0.437,2.575-0.742,3.885-0.742c3.885-0.131,7.203,1.048,10.04,3.623 C167.77,125.685,169.298,128.828,169.385,132.8z"></path>{" "}
                  </g>
                </svg>
              </div>
              
              <div className=" flex justify-center my-5 items-center">
                <a href="/">
                  <button className=" p-2 active:transform active:scale-90 border border-[#1C274C] rounded-lg hover:bg-white text-[#1C274C] hover:text-[#5f0a1d] text-[13px] duration-500">
                    Intenta de nuevo
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Maintenance;
