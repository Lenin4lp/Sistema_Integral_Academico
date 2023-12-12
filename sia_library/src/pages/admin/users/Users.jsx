import React, { useEffect, useState } from "react";
import { getUsers } from "../../../api/user";

function Users() {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  const getUsersList = async () => {
    try {
      const res = await getUsers();
      if (res.status === 200) {
        setUsers(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    getUsersList();
  },[])

  const sortedUsers = users && users.sort((a, b) => {
    const lastNameA = a.user_lastname || "";
    const lastNameB = b.user_lastname || "";
    return lastNameA.localeCompare(lastNameB);
  })

  console.log(sortedUsers);

  return (
    <div className="my-8 lg:my-14 mx-2 md:mx-10 w-full">
      <div className=" h-fit block ml-1 lg:ml-10">
        <div className=" font-bold text-xl">
          <h1 className=" text-white text-2xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
            Administrar Usuarios
          </h1>
        </div>
        <div className=" my-10">
          <button className=" p-3 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white duration-500">
            Crear Usuario
          </button>
        </div>
        <div className=" my-10 flex justify-center items-center">
          <table
            id="usersTable"
            className="border-collapse border border-slate-400 text-[10px] sm:text-sm"
          >
            <thead className=" rounded">
              <tr>
                <th className=" border border-white font-semibold py-2 px-10 sm:px-28 text-white bg-[#146898]">
                  Nombres
                </th>
                <th className=" border border-white font-semibold py-2 px-8 sm:px-20 text-white bg-[#146898]">
                  Correo
                </th>
                <th className=" border border-white font-semibold py-2 px-8 sm:px-14 text-white bg-[#146898]">
                  Rol
                </th>
                <th className=" border border-white font-semibold py-2 px-8 sm:px-14 text-white bg-[#146898]">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers && sortedUsers.map((user) => (
                <tr className=" hover:bg-[#202b52] duration-300" key={user.user_id}>
                  <th className="border p-3 text-left border-slate-300 font-semibold text-white">{`${user && user.user_lastname} ${user && user.user_name}`}</th>
                  <th className="border p-3 text-left border-slate-300 font-semibold text-white">{user && user.user_email}</th>
                  <th className="border p-3 text-center border-slate-300 font-semibold text-white">{user && user.role_id === 3? "Administrador" : user && user.role_id === 2? "Docente" : "Estudiante"  }</th>
                  <th className="border p-3 text-center border-slate-300 font-semibold text-white">{user && user.user_status === true? "Inactivo" : "Activo"}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
