import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updatePeriod, getPeriod, deletePeriod } from "../../../api/academic";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Modal from "../../../components/Modal";

function ModifyPeriod() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const [period, setPeriod] = useState();
  const navigate = useNavigate();
  const { periodId } = useParams();
  const [open, setOpen] = useState(false);

  const removePeriod = async (id) => {
    try {
      const res = await deletePeriod(id);
      if (res.status === 204) {
        toast.success("Periodo eliminado exitosamente");
        setTimeout(() => {
          window.location.href = "/admin/materias";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
      toast.error("Error al eliminar el periodo", {
        duration: 3000,
      });
    }
  };
  const editPeriod = async (id, data) => {
    try {
      const res = await updatePeriod(id, data);
      if (res.status === 200) {
        toast.success("Periodo modificado exitosamente");
        setTimeout(() => {
          window.history.go(-1);
        }, 2000);
      }
    } catch (error) {
      setErrors(error.response.data);
      toast.error("Error al modificar el periodo", {
        duration: 3000,
      });
    }
  };

  const getAPeriod = async (id) => {
    try {
      const res = await getPeriod(id);
      if (res.status === 200) {
        setPeriod(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const onSubmit = handleSubmit((data) => {
    const modifiedData = {};

    for (const key in data) {
      if (data[key] !== "") {
        modifiedData[key] = data[key];
      }
    }
    editPeriod(periodId, modifiedData);
  });

  useEffect(() => {
    getAPeriod(periodId);
  }, []);

  return (
    <div className="my-8 lg:my-14 mx-2 md:mx-10 w-full">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className=" block m-3">
          <div className=" flex justify-center items-center">
            <svg
              className="h-[100px] fill-[#ad2c2c]"
              version="1.1"
              id="_x32_"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill=""
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g>
                  {" "}
                  <path
                    className="st0"
                    d="M308.229,51.853C308,23.183,284.751,0.017,256,0c-28.734,0.017-52,23.183-52.228,51.853 c-63.821,9.2-109.796,33.323-109.796,49.845v16.718c0,20.784,72.538,37.625,162.024,37.625c89.486,0,162.024-16.841,162.024-37.625 v-16.718C418.024,85.176,372.049,61.053,308.229,51.853z M256,48.065c-6.245,0-12.376,0.196-18.433,0.498 c0.735-3.715,2.547-6.996,5.144-9.616c3.445-3.437,8.049-5.494,13.289-5.51c5.257,0.017,9.845,2.073,13.306,5.51 c2.595,2.62,4.408,5.902,5.135,9.616C268.384,48.261,262.245,48.065,256,48.065z"
                  ></path>{" "}
                  <path
                    className="st0"
                    d="M256,178.335c-89.486,0-162.024-16.841-162.024-37.625l18.53,316.253C112.506,478.506,167.233,512,256,512 c88.767,0,143.51-33.494,143.51-55.037l18.514-316.253C418.024,161.494,345.486,178.335,256,178.335z M158.588,421.682 l-6.661-195.134c4.465,1.02,9.249,1.878,14.269,2.743l6.752,197.878C167.763,425.436,162.988,423.567,158.588,421.682z M217.176,436.98l-3.609-202.278c4.637,0.318,9.339,0.629,14.123,0.784l3.608,202.98C226.433,438.074,221.722,437.6,217.176,436.98 z M294.824,436.98c-4.547,0.62-9.339,1.094-14.196,1.486l3.608-202.98c4.784-0.155,9.494-0.466,14.123-0.784L294.824,436.98z M353.412,421.682c-4.392,1.886-9.175,3.755-14.351,5.486l6.744-197.878c5.02-0.865,9.803-1.796,14.277-2.743L353.412,421.682z"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <div className=" my-3">
            <h1 className=" text-center text-lg font-bold">Confirmación</h1>
          </div>
          <div className=" my-3">
            <h1 className=" text-center text-base font-medium">
              ¿Estás seguro de eliminar este periodo?
            </h1>
          </div>
          <div className=" flex justify-center items-center">
            <div className=" my-2 grid grid-cols-2">
              <div className=" mx-4">
                <button onClick={()=> removePeriod(periodId)} className=" p-2 active:transform active:scale-90 border border-white bg-[#ad2c2c] rounded-lg hover:bg-[#b94d4d] text-white hover:text-white text-[12px] md:text-sm lg:text-base duration-500">
                  Eliminar
                </button>
              </div>
              <div className=" mx-4">
                <button onClick={() => setOpen(false)} className=" p-2 active:transform active:scale-90 border border-gray-400 rounded-lg hover:bg-[#146898] text-black hover:text-white text-[12px] md:text-sm lg:text-base duration-500">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className=" h-fit block ml-1 lg:ml-10">
        <div className=" font-bold text-xl">
          <h1 className=" text-white text-xl lg:text-3xl underline underline-offset-4 decoration-2 decoration-[#146898]">
            Modificar Periodo
          </h1>
        </div>
        <div className=" font-normal text-lg">
          <h1 className=" text-white mt-10 text-lg lg:text-xl ">
            {`Periodo ${period && period.period_name}`}
          </h1>
        </div>
        <div className=" font-normal text-lg">
          <h1 className=" text-white mt-5 text-lg lg:text-xl ">
            {`No. de Grupos: ${period && period.group.length}`}
          </h1>
        </div>
        <div className=" my-5 md:my-10 flex justify-center items-center ">
          <form action="">
            <div className=" grid grid-cols-1">
              <div className="mx-5 md:mx-10 my-5 h-fit ">
                <p className=" text-sm md:text-base text-white">
                  Nombre del Periodo
                </p>
                <input
                  name="name"
                  type="text"
                  placeholder="ABR2023-SEP2023"
                  className=" w-42 md:w-56  bg-white text-[1rem] font-normal placeholder-[#1c274cbb] text-[#1c274c] border border-gray-200 rounded py-2 mt-3 px-1"
                  {...register("period_name", {
                    maxLength: 60,
                    required: false,
                  })}
                />
              </div>
            </div>

            <div className=" flex justify-center items-center mt-10">
              <button
                onClick={onSubmit}
                className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#146898] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
              >
                Guardar cambios
              </button>
            </div>
            <div className=" flex justify-center items-center mt-10">
              
            </div>
          </form>
        </div>
        <div className=" flex justify-center items-center">
        <button
                onClick={() => setOpen(true)}
                className=" p-2 active:transform active:scale-90 bg-white rounded-lg hover:bg-[#981426] text-[#1C274C] hover:text-white text-sm lg:text-base duration-500"
              >
                Eliminar Periodo
              </button>
              </div>
        <div className=" flex justify-center items-center">
          <div className=" block">
            {errors && errors.length > 0 && (
              <div className=" bg-red-800 w-fit p-1 text-white text-center rounded">
                {errors[0]}
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default ModifyPeriod;
