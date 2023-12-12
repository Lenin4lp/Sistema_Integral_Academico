import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AdministrativeMenu } from "../utils/menuOptions";

function SideBar({ MenuOption, children }) {
  const [open, setOpen] = useState(false);
  const handleSideBar = () => {
    setOpen(!open);
  };

  const Menus = MenuOption;

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-[50vw] sm:w-56 md:w-72" : " w-[18vw] sm:w-20"
        } p-2 pt-5 sm:p-5 sm:pt-8 duration-300 h-screen bg-white sticky top-0 z-10`}
      >
        <img
          className={`absolute cursor-pointer hidden lg:flex rounded-full -right-3 top-8 w-7 border-2 border-[#d6d6d6] dark:border-[#19172e]  ${
            !open && "rotate-180"
          }`}
          src={"/images/control.png"}
          height={28}
          width={28}
          alt=">"
          
          onClick={handleSideBar}
        />
        <div className="flex gap-x-4 items-center">
          <img
            className={` duration-500  ${open && "rotate-[360deg]"}`}
            src={"/images/logo-reducido.webp"}
            height={40}
            width={40}
            alt="Istvc-logo"

            //! Toca hacer pruebas porque al parecer priority hace que la imagen se demore en cargar
          />
          <h1
            className={`text-[#1C274C] origin-left font-bold text-lg sm:text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            ISTVC
          </h1>
        </div>
        <ul className=" mt-8 pt-6">
          {AdministrativeMenu.map((menu, index) => (
            <Link
              to={`${menu.linkRef}`}
              key={index}
              className={`text-[#1C274C] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-[#838383] rounded-md ${
                menu.gap ? "mt-7 lg:mt-9" : "mt-2"
              }`}
            >
              <img src={`${menu.src}`} alt="" height={24} width={24} />
              <span
                className={`${
                  !open && "scale-0"
                } origin-left transition duration-300 text-[11px] sm:text-md md:text-lg lg:text-xl`}
              >
                {menu.title}
              </span>
            </Link>
          ))}
          <div className="text-[#1C274C] mt-6 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-[#838383] rounded-md">
                <img src="/images/logout.svg" alt="" height={24} width={24}/>
                <span
                className={`${
                  !open && "scale-0"
                } origin-left transition duration-300 text-[11px] sm:text-md md:text-lg lg:text-xl`}
              >
                Cerrar Sesión
              </span>
          </div>
        </ul>
      </div>

      <div className=" flex justify-center">{children}</div>
    </div>
  );
}

export default SideBar;
