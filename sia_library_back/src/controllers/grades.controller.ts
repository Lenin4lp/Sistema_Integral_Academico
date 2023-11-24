import { Request, Response } from "express";
import { Grade } from "../models/grades.model";
import { Student } from "../models/student.model";
import User from "../models/user.model";
import { Group } from "../models/group.model";
import { Subject } from "../models/subject.model";

// ? Obtener todas las notas
export const getGrades = async (req: Request, res: Response) => {
  const grades = await Grade.findAll();
  res.json(grades);
};

// ? Obtener una sola nota
export const getGrade = async (req: Request, res: Response) => {
  const grade = await Grade.findByPk(req.params.id, {
    include: [
      { model: Student, include: [{ model: User }] },
      { model: Group, include: [{ model: Subject }] },
    ],
  });
  if (!grade) return res.status(404).json({ message: "Grade not found" });
  res.json(grade);
};
