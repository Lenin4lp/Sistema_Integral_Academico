import React from "react";
import Navbar from "../../components/navbar";
Navbar;

function Support() {
  return (
    <div >
      <div>
        <Navbar />
      </div>
      <div className=" mt-24 md:mt-32  mb-5 md:mb-10 mx-3 md:mx-10 flex items-center justify-center text-center text-xl">
        <div className=" block">
        <h3>Si presentas algún inconveniente con la plataforma, por favor comunícate a este correo:</h3>
        <h3 className=" mt-3 text-[#146898] hover:text-"><a href="mailto:tics.plataforma@istvc.edu.ec">tics.plataforma@istvc.edu.ec</a></h3>
        </div>
      </div>
    </div>
  );
}

export default Support;
