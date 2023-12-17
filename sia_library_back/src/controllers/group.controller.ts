import { Request, Response } from "express";
import { Group } from "../models/group.model";
import { Student } from "../models/student.model";
import User from "../models/user.model";
import { Subject } from "../models/subject.model";
import { Period } from "../models/period.model";
import { connection } from "../connection/connection";
import { Grade } from "../models/grades.model";
import { Teacher } from "../models/teacher.model";

// ? Obtener todos los grupos
export const getGroups = async (req: Request, res: Response) => {
  const groups = await Group.findAll({
    include: [
      { model: Student, include: [{ model: User }] },
      { model: Teacher, include: [{ model: User }] },
      { model: Subject },
      { model: Period },
      {
        model: Grade,
        include: [{ model: Student, include: [{ model: User }] }],
      },
    ],
  });
  res.json(groups);
};

// ? Obtener un grupo
export const getGroup = async (req: Request, res: Response) => {
  const group = await Group.findByPk(req.params.id, {
    include: [
      { model: Student, include: [{ model: User }] },
      { model: Teacher, include: [{ model: User }] },
      { model: Subject },
      { model: Period },
      {
        model: Grade,
        include: [{ model: Student, include: [{ model: User }] }],
      },
    ],
  });
  if (!group) return res.status(404).json({ message: "Group not found" });
  res.json(group);
};

// ? Crear un grupo
export const createGroup = async (req: Request, res: Response) => {
  const { group_name, subject_id, modality_id, period_id, teacher_id } =
    req.body;
  try {
    const newGroup = await Group.create({
      group_name,
      subject_id,
      modality_id,
      period_id,
      teacher_id,
      group_status: true,
    });
    res.json(newGroup);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

// ? Actualizar un grupo
export const updateGroup = async (req: Request, res: Response) => {
  const { group_name, teacher_id, group_status, modality_id } = req.body;
  const group = await Group.findByPk(req.params.id);
  if (group) {
    await group.update({
      group_name,
      teacher_id,
      group_status,
      modality_id,
    });
  } else {
    return res.status(404).json({ message: "Grupo no encontrado" });
  }
  res.json(group);
};

// ? Eliminar un grupo
export const deleteGroup = async (req: Request, res: Response) => {
  const group = await Group.findByPk(req.params.id);
  if (group) {
    await group.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json({ message: "Grupo no encontrado" });
  }
};

//? Agregar estudiantes a grupo

export const addStudentToGroup = async (req: Request, res: Response) => {
  const { id: group_id } = req.params;
  const { student_id } = req.body;

  try {
    const query = `INSERT INTO grupo_estudiante (id_grupo, id_estudiante) VALUES (?, ?)`;
    await connection.query(query, { replacements: [group_id, student_id] });
    res.status(200).json({ message: "Estudiante agregado al grupo" });

    if (res.statusCode === 200) {
      await Grade.create({
        grade_1: 0,
        grade_2: 0,
        test_1: 0,
        exam_1: 0,
        grade_3: 0,
        grade_4: 0,
        test_2: 0,
        exam_2: 0,
        final_grade: 0,
        student_id: student_id,
        group_id: group_id,
      });
    }
  } catch (error) {
    console.log("Algo malio sal: ", error);
    res.status(500).json({ message: "Error al agregar estudiante al grupo" });
  }
};

//? Eliminar estudiantes de grupo
export const deleteStudentFromGroup = async (req: Request, res: Response) => {
  const { id: group_id } = req.params;
  const { student_id } = req.body;

  try {
    const query = `DELETE FROM grupo_estudiante WHERE id_grupo = ? AND id_estudiante = ?`;
    await connection.query(query, { replacements: [group_id, student_id] });
    res.status(200).json({ message: "Estudiante eliminado del grupo" });
  } catch (error) {
    console.log("Algo malio sal: ", error);
    res.status(500).json({ message: "Error al eliminar estudiante del grupo" });
  }
};
