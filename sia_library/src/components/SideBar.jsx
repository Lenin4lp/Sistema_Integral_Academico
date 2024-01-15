import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AdministrativeMenu } from "../utils/menuOptions";
import { useAuth } from "../auth/AuthProvider";

function SideBar({ MenuOption, children }) {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const handleSideBar = () => {
    setOpen(!open);
  };

  const Menus = MenuOption;

  return (
    <div className="flex">
      <div
        className={`w-[18vw] sm:w-20
         p-2 pt-5 sm:p-5 sm:pt-8 duration-300 h-screen bg-white sticky top-0 z-10`}
      >
        <div className="flex gap-x-4 items-center">
          <img
            className={` duration-500 hover:rotate-[360deg]`}
            src={"/images/logo-reducido.webp"}
            height={40}
            width={40}
            alt="Istvc-logo"

            //! Toca hacer pruebas porque al parecer priority hace que la imagen se demore en cargar
          />
          <h1
            className={`text-[#1C274C] origin-left font-bold text-lg sm:text-xl duration-300 
              scale-0
            `}
          >
            ISTVC
          </h1>
        </div>
        <ul className=" mt-8 pt-6">
          {Menus.map((menu, index) =>
            menu &&
            menu.title !== "Calificaciones" &&
            menu.title !== "Perfil" ? (
              <div key={index} className=" group relative">
                <span className="absolute top-0 left-14 hidden lg:flex scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                  {menu.title}
                </span>

                <Link
                  to={`${menu.linkRef}`}
                  className={`text-[#1C274C] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-[#838383] rounded-md ${
                    menu.gap ? "mt-7 lg:mt-9" : "mt-2"
                  }`}
                >
                  <img src={`${menu.src}`} alt="" height={24} width={24} />
                </Link>
              </div>
            ) : (
              <div key={index} className=" group relative">
                <span className="absolute top-0 left-14 hidden lg:flex scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                  {menu.title}
                </span>

                <a
                  href={`${menu.linkRef}`}
                  className={`text-[#1C274C] text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-[#838383] rounded-md ${
                    menu.gap ? "mt-7 lg:mt-9" : "mt-2"
                  }`}
                >
                  <img src={`${menu.src}`} alt="" height={24} width={24} />
                </a>
              </div>
            )
          )}
          <div className="text-[#1C274C] mt-6 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-[#838383] rounded-md">
            <img
              onClick={() => logout()}
              src="/images/logout.svg"
              alt=""
              height={24}
              width={24}
            />
          </div>
        </ul>
      </div>

      <div className=" flex justify-center">{children}</div>
    </div>
  );
}

export default SideBar;
