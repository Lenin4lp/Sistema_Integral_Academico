import { Request, Response } from "express";
import { Teacher } from "../models/teacher.model";
import { Subject } from "../models/subject.model";
import { User } from "../models/user.model";

//? Obtener todos los docentes
export const getTeachers = async (req: Request, res: Response) => {
    const teachers = await Teacher.findAll();
    res.json(teachers);
  };
  
  //? Obtener un docente
  export const getTeacher = async (req: Request, res: Response) => {
    const teacher = await Teacher.findByPk(req.params.id, {include: [{model: Subject}, {model: User}]});
    if (!teacher) return res.status(404).json(["No se encontró el docente"]);
    res.json(teacher);
  };
  
  //? Actualizar un docente
  export const updateTeacher = async (req: Request, res: Response) => {
    const { speciality } = req.body;
    const teacher = await Teacher.findByPk(req.params.id);
    if (teacher) {
      await teacher.update({
        speciality: speciality ?? "Pendiente",
      });
    } else {
      return res.status(404).json({ message: "No se encontró el docente" });
    }
    res.json(teacher);
  };