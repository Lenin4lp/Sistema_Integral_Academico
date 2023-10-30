import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  let Links = [
    { name: "Inicio", link: "/home" },
    { name: "Cursos", link: "/cursos" },
    { name: "Biblioteca", link: "/biblioteca" },
    { name: "Soporte", link: "/soporte" },
  ];
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-50">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
        text-gray-800 w-fit"
        >
          <span className="text-3xl text-indigo-600 mr-1 pt-2"></span>
          <img
            className=" h-10 w-auto object-contain"
            src="/images/logo-reducido.webp"
            alt=""
          />
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {Links.map((link) => (
            <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                to={link.link}
                className="text-[#1C274C] hover:text-[#146898] duration-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <button className=" md:mx-10 p-2 rounded bg-gradient-to-br from-[#3bafc4] to-[#146898] text-white">
            Cerrar sesión
          </button>
        </ul>
      </div>
    </div>
  );
}

export default React.memo(Navbar);
