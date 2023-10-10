import React from "react";
import Navbar from "../../components/navbar";

function Library() {
  return (
    <div className="font-[Poppins]">
      <div>
        <Navbar />
      </div>
      <div className=" mt-24 md:mt-32  mb-5 md:mb-10 mx-3 md:mx-10 flex items-center  text-2xl md:text-3xl font-bold text-[#1C274C] text-left">
        Biblioteca académica
      </div>
      <div className=" mt-5 mb-5 md:mb-10 mx-3 md:mx-10 flex items-center  text-xl md:text-2xl font-bold text-[#1C274C] text-left">
        Carrera:
      </div>
      <div className=" flex justify-center items-center">
        <div className=" grid grid-cols-3"></div>
      </div>
    </div>
  );
}

export default Library;
