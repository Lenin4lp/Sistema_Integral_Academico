import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { Admin } from "../models/admin.model";
import { Teacher } from "../models/teacher.model";
import { Subject } from "../models/subject.model";
import { Degree } from "../models/degree.model";
import { Student } from "../models/student.model";
import { Group } from "../models/group.model";
import { Grade } from "../models/grades.model";
import { Period } from "../models/period.model";

//? Visualizar usuarios
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json(users);
};
//? Obtener un solo usuario
export const getUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Student,
        include: [
          { model: Degree },
          {
            model: Grade,
            include: [
              {
                model: Group,
                include: [{ model: Subject }, { model: Period }],
              },
            ],
          },
          { model: Group, include: [{ model: Subject }, { model: Period }] },
        ],
      },
      { model: Teacher, include: [{ model: Group, include: [Subject] }] },
      { model: Admin },
    ],
  });
  if (!user) return res.status(404).json({ message: "User not found" });

  let roleTable;
  if (user.role_id === 1) {
    roleTable = await Student.findOne({
      where: {
        student_id: user.user_id,
      },
      include: [
        { model: Degree },
        { model: Group, include: [{ model: Subject }, { model: Period }] },
      ],
    });
  } else if (user.role_id === 2) {
    roleTable = await Teacher.findOne({
      where: {
        teacher_id: user.user_id,
      },
      include: [Group],
    });
  } else if (user.role_id === 3) {
    roleTable = await Admin.findOne({
      where: {
        admin_id: user.user_id,
      },
    });
  }
  res.json({ user, roleTable });
};
//? Modificar usuario
export const updateUser = async (req: Request, res: Response) => {
  const {
    user_name,
    user_lastname,
    user_email,
    user_password: user_password,
    user_ci,
    user_direction,
    user_Citizenship,
    user_phone,
    user_status,
    user_genre: genre,
    birth_date,
  } = req.body;
  const user = await User.findByPk(req.params.id);
  if (user) {
    if (user_password) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(user_password, salt);
      await user.update({
        user_name,
        user_lastname,
        user_email,
        user_password: passwordHash,
        user_ci,
        user_direction,
        user_Citizenship,
        user_phone,
        user_genre: genre,
        birth_date,
        updated_at: new Date(),
        user_status,
      });
    } else {
      // El password no se ha modificado, por lo que no es necesario actualizarlo
      await user.update({
        user_name,
        user_lastname,
        user_email,
        user_ci,
        user_direction,
        user_Citizenship,
        user_phone,
        user_genre: genre,
        birth_date,
        user_status,
        updated_at: new Date(),
      });
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

//? Eliminar usuario
export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};
