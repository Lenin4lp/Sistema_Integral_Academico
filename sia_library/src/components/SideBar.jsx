import React, { useState } from "react";

function SideBar({ children }) {
  const [open, setOpen] = useState(false);
  const handleSideBar = () => {
    setOpen(!open);
  };

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
          src={"../../public/images/control.png"}
          height={28}
          width={28}
          alt=">"
          priority={true}
          onClick={handleSideBar}
        />
        <div className="flex gap-x-4 items-center">
          <img
            className={` duration-500  ${open && "rotate-[360deg]"}`}
            src={"../../public/images/logo-reducido.webp"}
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
        <ul className=" pt-6"></ul>
      </div>

      <div className=" flex justify-center">{children}</div>
    </div>
  );
}

export default SideBar;
