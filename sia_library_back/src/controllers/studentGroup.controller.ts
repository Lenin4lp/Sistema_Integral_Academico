import { Request, Response } from "express";
import { StudentGroup } from "../models/studentGroup.model";
import { Student } from "../models/student.model";
import { Grade } from "../models/grades.model";

// ? Agregar estudiante a grupo
export const addStudentToGroup = async (req: Request, res: Response) => {
  const { id: group_id } = req.params;
  const { student_id } = req.body;
  try {
    const studentFound = await StudentGroup.findOne({
      where: { student_id: student_id, group_id: group_id },
    });
    if (studentFound)
      return res
        .status(400)
        .json({ message: "El estudiante ya se encuentra en el grupo" });
    const studentGroup = await StudentGroup.create({
      group_id,
      student_id,
    });
    res.json(studentGroup);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

// ? Retirar estudiante de grupo
export const removeStudentFromGroup = async (req: Request, res: Response) => {
  const { id: group_id, studentId: student_id } = req.params;

  console.log(student_id);

  try {
    const studentFound = await StudentGroup.findOne({
      where: { group_id: group_id, student_id: student_id },
    });
    if (!studentFound)
      return res
        .status(400)
        .json({ message: "El estudiante no se encuentra en el grupo" });
    await studentFound.destroy();
    await Grade.destroy({
      where: { group_id: group_id, student_id: student_id },
    });
    res.status(204).json({ message: "Estudiante eliminado del grupo" });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};
