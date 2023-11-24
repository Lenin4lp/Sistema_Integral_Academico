import { Request, Response } from "express";
import { Subject } from "../models/subject.model";
import { Teacher } from "../models/teacher.model";
import { User } from "../models/user.model";
import { Student } from "../models/student.model";
import { Group } from "../models/group.model";

// ? Obtener todas las materias
export const getSubjects = async (req: Request, res: Response) => {
  const subjects = await Subject.findAll();
  res.json(subjects);
};

// ? Obtener una sola materia
export const getSubject = async (req: Request, res: Response) => {
  const subject = await Subject.findByPk(req.params.id, {
    include: [
      {
        model: Group,
        include: [
          { model: Teacher, include: [{ model: User }] },
          { model: Student, include: [{ model: User }] },
        ],
      },
    ],
  });
  if (!subject) return res.status(404).json({ message: "Subject not found" });
  res.json(subject);
};

// ? Crear una materia
export const createSubject = async (req: Request, res: Response) => {
  const { subject_name, subject_acronym, syllabus } = req.body;
  try {
    const subjectFound = await Subject.findOne({
      where: { subject_name: subject_name },
    });
    if (subjectFound)
      return res.status(400).json({ message: "La materia ya existe" });

    const newSubject = await Subject.create({
      subject_name,
      syllabus,
      subject_acronym,
    });
    res.json(newSubject);
  } catch (error) {
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

//? Actualizar una materia
export const updateSubject = async (req: Request, res: Response) => {
  const { subject_name, syllabus, subject_acronym } = req.body;
  const subject = await Subject.findByPk(req.params.id);
  if (subject) {
    await subject.update({
      subject_name,
      syllabus,
      subject_acronym,
    });
  } else {
    return res.status(404).json({ message: "No se encontró la materia" });
  }
  res.json(subject);
};

//? Eliminar una materia
export const deleteSubject = async (req: Request, res: Response) => {
  const subject = await Subject.findByPk(req.params.id);
  if (subject) {
    await subject.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json({ message: "No se encontró la materia" });
  }
};
