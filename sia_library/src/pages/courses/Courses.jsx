import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import { getStudent, getTeacher } from "../../api/user";
import { useAuth } from "../../auth/AuthProvider";

function Courses() {
  const { user } = useAuth();
  const [errors, setErrors] = useState([]);
  const [student, setStudent] = useState([]);
  const [teacher, setTeacher] = useState([]);

  const userId = user.user_id;
  const role = user.role_id;

  const getAStudent = async (userId) => {
    try {
      const res = await getStudent(userId);
      if (res.status === 200) {
        setStudent(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const getATeacher = async (userId) => {
    try {
      const res = await getTeacher(userId);
      if (res.status === 200) {
        setTeacher(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    if (role === 1) {
      getAStudent(userId);
    } else {
      getATeacher(userId);
    }
  }, []);

  if (role === 1) {
    console.log(student);
  } else {
    console.log(teacher);
  }

  console.log(role);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className=" mt-24 md:mt-32  mb-5 md:mb-10 mx-3 md:mx-10 flex items-center  text-2xl md:text-3xl font-bold text-[#1C274C] text-left">
        Mis Cursos
      </div>
      <div className=" flex justify-center items-center">
        <div className=" grid grid-cols-3 mt-3">
          <div className=" bg-gradient-to-br from-[#1C274C] to-[#146898] rounded m-3 p-3 h-[20vh] w-[40vh] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-[#31444ead] dark:hover:shadow-[#090a0e] duration-300 active:transform active:scale-90 hover:z-10">
            <p className=" text-white text-center">Prueba</p>
          </div>
          <div className=" bg-gradient-to-br from-[#1C274C] to-[#146898] rounded m-3 p-3 h-[20vh] w-[40vh] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-[#31444ead] dark:hover:shadow-[#090a0e] duration-300 active:transform active:scale-90 hover:z-10">
            <p className=" text-white text-center">Prueba</p>
          </div>
          <div className=" bg-gradient-to-br from-[#1C274C] to-[#146898] rounded m-3 p-3 h-[20vh] w-[40vh] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-[#31444ead] dark:hover:shadow-[#090a0e] duration-300 active:transform active:scale-90 hover:z-10">
            <p className=" text-white text-center">Prueba</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;
