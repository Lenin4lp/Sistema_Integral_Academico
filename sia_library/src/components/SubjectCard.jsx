import React from "react";

function SubjectCard({ cardTitle }) {
  return (
    <div className=" bg-gradient-to-br mx-6 my-4 from-[#1C274C] to-[#146898] hover:from-[#146898] hover:to-[#146898] rounded m-3 p-3 h-[20vh] w-[35vh] md:h-[20vh] md:w-[40vh] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-[#31444ead] dark:hover:shadow-[#090a0e] duration-300 active:transform active:scale-90 hover:z-10">
      <p className=" text-white text-center">{cardTitle}</p>
    </div>
  );
}

export default SubjectCard;
