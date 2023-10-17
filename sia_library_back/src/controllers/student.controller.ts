import { Request, Response } from "express";
import { Student } from "../models/student.model";
import { Degree } from "../models/degree.model";
import { Subject } from "../models/subject.model";
import { User } from "../models/user.model";

//? Obtener todos los estudiantes
export const getStudents = async (req: Request, res: Response) => {
    const students = await Student.findAll();
    res.json(students);
  };
  
  //? Obtener un estudiante
  export const getStudent = async (req: Request, res: Response) => {
    const student = await Student.findByPk(req.params.id,{include: [{model: Degree}, {model: Subject}, {model: User}]});
    if (!student) return res.status(404).json(["No se encontró el estudiante"]);
    res.json(student);
  };
  
  //? Actualizar un estudiante
  export const updateStudent = async (req: Request, res: Response) => {
    const { degree_id, modality_id } = req.body;
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.update({
        degree_id,
        modality_id,
      });
    } else {
      return res.status(404).json({ message: "No se encontró el estudiante" });
    }
    res.json(student);
  };