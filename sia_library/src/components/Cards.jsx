import React from "react";

function Cards({ cardColor, cardTitle, cardDescription, cardFontColor }) {
  return (
    <div
      className={` w-[60vw] sm:w-[25vw] md:w-[25vw] m-3 p-3 h-[15vh] rounded-md ${cardColor} flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-[#31444ead] dark:hover:shadow-[#090a0e] duration-300 active:transform active:scale-90 hover:z-10`}
    >
      <div className=" block">
        <div
          className={` font-bold text-md md:text-lg text-center ${cardFontColor}`}
        >
          <h1>{cardTitle}</h1>
        </div>
        <div
          className={` text-sm md:text-md font-medium text-center ${cardFontColor}`}
        >
          <h3>{cardDescription}</h3>
        </div>
      </div>
    </div>
  );
}

export default Cards;
