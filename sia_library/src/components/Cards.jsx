import React from "react";

function Cards({ cardColor, cardTitle, cardDescription, cardFontColor }) {
  return (
    <div
      className={` w-[30vw] sm:w-[25vw] md:w-[18vw] mt-3 sm:m-3 p-3 h-[15vh] rounded-md ${cardColor} flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-[#293041] hover:scale-[1.05] duration-300 active:transform active:scale-90 hover:z-10`}
    >
      <div className=" block">
        <div
          className={` font-bold text-[10px] lg:text-base text-center ${cardFontColor}`}
        >
          <h1>{cardTitle}</h1>
        </div>
        <div
          className={`  mt-2 opacity-50 text-[10px] lg:text-sm font-medium text-center ${cardFontColor}`}
        >
          <h3>{cardDescription}</h3>
        </div>
      </div>
    </div>
  );
}

export default Cards;
