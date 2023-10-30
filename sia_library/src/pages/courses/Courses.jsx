import React, { useEffect, useState } from "react";
import { getStudent, getTeacher } from "../../api/user";
import { useAuth } from "../../auth/AuthProvider";
import { Link } from "react-router-dom";
import SubjectCard from "../../components/SubjectCard";

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
    console.log(teacher.subject);
  }
  return (
    <div>
      <div className=" mt-24 md:mt-28  mb-5 md:mb-10 mx-3 md:mx-10 flex items-center  text-2xl md:text-3xl font-bold text-[#1C274C] text-left">
        Mis Cursos
      </div>
      <div className=" flex justify-center items-center overflow-y-auto">
        <div className=" grid sm:grid-cols-2 md:grid-cols-3 m-3">
          {role && role === 1
            ? student.subjects &&
              student.subjects.map((subject) => (
                <Link
                  key={subject.subject_id}
                  to={`/cursos/${subject.subject_id}`}
                >
                  <SubjectCard cardTitle={subject.subject_name} />
                </Link>
              ))
            : teacher.subject &&
            teacher.subject.map((subject) => (
              <Link
                key={subject.subject_id}
                to={`/cursos/${subject.subject_id}`}
              >
                <SubjectCard cardTitle={subject.subject_name} />
              </Link>))}
        </div>
      </div>
    </div>
  );
}

export default Courses;
