import React, { useEffect, useState } from "react";
import { getDegrees } from "../../../api/academic";
import { Link } from "react-router-dom";
import SubjectCard from "../../../components/SubjectCard";

function Degrees() {
  const [degrees, setDegrees] = useState([]);
  const [errors, setErrors] = useState([]);

  const getDegreesList = async () => {
    try {
      const res = await getDegrees();
      if (res.status === 200) {
        setDegrees(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    getDegreesList();
  }, []);

  return (
    <div className="my-8 lg:my-14 mx-2 md:mx-10 w-full">
      <div className=" h-fit block ml-1 lg:ml-10">
        <div className=" font-bold text-xl">
          <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
            Administrar Carreras
          </h1>
        </div>
        <div className=" my-10">
          <Link to={`/admin/carreras/registrar`}>
            <button className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500">
              Crear Carrera
            </button>
          </Link>
        </div>
        <div className=" mt-10 flex justify-center items-center">
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {degrees &&
              degrees.map((degree) => (
                <div key={degree.degree_id}>
                  <Link to={`/admin/carreras/${degree.degree_id}`}>
                    <SubjectCard
                      cardTitle={degree.degree_name}
                      cardId={degree.degree_id}
                    />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Degrees;
