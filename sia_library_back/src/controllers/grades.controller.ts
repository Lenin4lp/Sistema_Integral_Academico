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

// ? Crear una nota
export const createGrade = async (req: Request, res: Response) => {
  const { student_id, group_id } = req.body;
  try {
    const newGrade = await Grade.create({
      grade_1: 0,
      grade_2: 0,
      test_1: 0,
      exam_1: 0,
      grade_3: 0,
      grade_4: 0,
      test_2: 0,
      exam_2: 0,
      final_grade: 0,
      prom_1: 0,
      prom_2: 0,
      resit: 0,
      status: "En curso",
      student_id,
      group_id,
    });
    res.json(newGrade);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

// ? Actualizar una nota
export const updateGrade = async (req: Request, res: Response) => {
  const {
    grade_1,
    grade_2,
    test_1,
    exam_1,
    grade_3,
    grade_4,
    test_2,
    exam_2,
    prom_1,
    prom_2,
    status,
    resit,
    final_grade,
  } = req.body;
  const grade = await Grade.findByPk(req.params.id);
  if (grade) {
    await grade.update({
      grade_1,
      grade_2,
      test_1,
      exam_1,
      grade_3,
      grade_4,
      test_2,
      exam_2,
      prom_1,
      prom_2,
      status,
      resit,
      final_grade,
    });
  } else {
    return res
      .status(404)
      .json({ message: "No se encontró el reporte de notas" });
  }
  res.json(grade);
};

// ? Eliminar una nota
export const deleteGrade = async (req: Request, res: Response) => {
  const grade = await Grade.findByPk(req.params.id);
  if (grade) {
    await grade.destroy();
    return res.sendStatus(204);
  } else {
    return res
      .status(404)
      .json({ message: "No se encontró el reporte de notas" });
  }
};
