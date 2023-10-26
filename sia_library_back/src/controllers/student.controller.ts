import { Request, Response } from "express";
import { Student } from "../models/student.model";
import { Degree } from "../models/degree.model";
import { Subject } from "../models/subject.model";
import { User } from "../models/user.model";
import { connection } from "../connection/connection";

//? Obtener todos los estudiantes
export const getStudents = async (req: Request, res: Response) => {
  const students = await Student.findAll();
  res.json(students);
};

//? Obtener un estudiante
export const getStudent = async (req: Request, res: Response) => {
  const student = await Student.findByPk(req.params.id, {
    include: [{ model: Degree }, { model: Subject }, { model: User }],
  });
  if (!student) return res.status(404).json(["No se encontró el estudiante"]);
  res.json(student);
};

//? Actualizar un estudiante
export const updateStudent = async (req: Request, res: Response) => {
  const { degree_id } = req.body;
  const student = await Student.findByPk(req.params.id);
  if (student) {
    await student.update({
      degree_id,
    });
  } else {
    return res.status(404).json({ message: "No se encontró el estudiante" });
  }
  res.json(student);
};

//? Asignar estudiante a materia
export const assignStudentToSubject = async (req: Request, res: Response) => {
  const { id: student_id } = req.params;
  const { subject_id } = req.body;

  try {
    const query = `INSERT INTO estudiante_materia (id_materia, id_estudiante) VALUES (?,?)`;
    await connection.query(query, { replacements: [subject_id, student_id] });
    res.status(200).json({ message: "Estudiante asignado a materia" });
  } catch (error) {
    console.log("Algo malio sal: ", error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

//? Eliminar estudiante de materia
export const removeStudentFromSubject = async (req: Request, res: Response) => {
  const { id: student_id } = req.params;
  const { subject_id } = req.body;

  try {
    const query = `DELETE FROM estudiante_materia WHERE id_materia = ? AND id_estudiante = ?`;
    await connection.query(query, { replacements: [subject_id, student_id] });
    res.status(200).json({ message: "Estudiante eliminado de materia" });
  } catch (error) {
    console.log("Algo malio sal: ", error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};
