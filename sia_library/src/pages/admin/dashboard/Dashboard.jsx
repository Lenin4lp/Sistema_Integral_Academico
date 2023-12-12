import React from "react";
import Cards from "../../../components/Cards";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className=" my-8 lg:my-14 mx-2 md:mx-10 w-full">
      <div className=" h-fit block ml-1 lg:ml-10">
        <div className=" font-bold text-xl">
          <h1 className=" text-white text-2xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
            Bienvenid@ Administrador
          </h1>
        </div>
        <div className=" mt-10 ">
          <h1 className=" text-2xl font-bold text-white">
            ¿Qué vamos a hacer hoy?
          </h1>
        </div>
        <div className=" flex justify-center items-center w-fit m-3 md:m-10">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className=" text-white hover:z-10">
              <Link to="/admin/usuarios">
                <Cards
                  cardColor="bg-gradient-to-br from-[#297e66] to-[#2ea886] lg:h-32"
                  cardTitle="Administrar Usuarios"
                  cardDescription=""
                  cardFontColor={""}
                />
              </Link>
            </div>
            <div className=" text-white hover:z-10">
              <Link to="/admin/carreras">
                <Cards
                  cardColor="bg-gradient-to-br from-[#317f8d] to-[#2f9caf] lg:h-32"
                  cardTitle="Administrar Carreras"
                  cardDescription=""
                  cardFontColor={""}
                />
              </Link>
            </div>
            <div className=" text-white hover:z-10">
              <Link to="/admin/materias">
                <Cards
                  cardColor="bg-gradient-to-br from-[#a7b33f] to-[#b6c05a] lg:h-32"
                  cardTitle="Administrar Materias"
                  cardDescription=""
                  cardFontColor={""}
                />
              </Link>
            </div>
            <div className=" text-white hover:z-10">
              <Link to="/admin/biblioteca">
                <Cards
                  cardColor="bg-gradient-to-br from-[#c05a6b] to-[#c54258] lg:h-32"
                  cardTitle="Administrar biblioteca"
                  cardDescription=""
                  cardFontColor={""}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
