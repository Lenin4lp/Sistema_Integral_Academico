import React from "react";

import Cards from "../../components/Cards";

function Home() {
  return (
    <div>
      <div className=" mt-24 md:mt-32 mb-5 md:mb-10 mx-3 flex items-center justify-center text-2xl md:text-3xl font-bold text-[#1C274C] text-center">
        Bienvenid@ a la plataforma SIA
      </div>
      <div className=" grid grid-cols-1">
        <div className=" flex items-center justify-center">
          <a href="/cursos">
            <Cards
              cardColor="bg-gradient-to-br from-[#3bafc4] to-[#146898]"
              cardTitle="Accede a tus cursos"
              cardDescription=""
              cardFontColor={"text-white"}
            />
          </a>
        </div>

        <div className=" flex items-center justify-center">
          <a href="/biblioteca">
            <Cards
              cardColor="bg-gradient-to-br from-[#328d49] to-[#5cc09a]"
              cardTitle="Accede a la biblioteca académica"
              cardDescription=""
              cardFontColor={"text-white"}
            />
          </a>
        </div>
        <div className=" flex items-center justify-center">
          <a href="/soporte">
            <Cards
              cardColor="bg-gradient-to-br from-[#ff6739] to-[#d69f39]"
              cardTitle="Soporte SIA"
              cardDescription=""
              cardFontColor={"text-white"}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
