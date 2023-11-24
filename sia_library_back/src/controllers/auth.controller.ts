// @ts-check
import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt";
import { Student } from "../models/student.model";
import { Teacher } from "../models/teacher.model";
import { Admin } from "../models/admin.model";
import { TOKEN_SECRET } from "../config/config";
import jwt from "jsonwebtoken";
import { Degree } from "../models/degree.model";
import { Group } from "../models/group.model";

// ? Registro de usuario
export const register = async (req: Request, res: Response) => {
  type genre = "Masculino" | "Femenino" | "Otro";
  const {
    user_id,
    user_name,
    user_lastname,
    user_email,
    user_password,
    user_ci,
    user_direction,
    user_Citizenship,
    user_phone,
    user_genre: genre,
    birth_date,
    role_id,
  } = req.body;

  try {
    const userFound = await User.findOne({
      where: {
        user_email: user_email,
      },
    });
    if (userFound) return res.status(400).json(["El usuario ya existe"]);
    const passwordHash = await bcrypt.hash(user_password, 10);

    const newUser = await User.create({
      user_name,
      user_lastname,
      user_email,
      user_password: passwordHash,
      user_ci,
      user_direction: user_direction ?? "Pendiente",
      user_Citizenship,
      user_phone: user_phone ?? "Pendiente",
      user_genre: genre,
      birth_date: birth_date ?? "Pendiente",
      role_id,
    });

    if (newUser.role_id === 1) {
      // ! Ahorita no le voy a pedir un request pero lo voy a necesitar despues para la carrera y el grupo PILOTO!!!
      await Student.create({
        user_id: newUser.user_id,
        student_id: newUser.user_id,
      });
    } else if (newUser.role_id === 2) {
      await Teacher.create({
        user_id: newUser.user_id,
        teacher_id: newUser.user_id,
      });
    } else if (newUser.role_id === 3) {
      await Admin.create({
        user_id: newUser.user_id,
        admin_id: newUser.user_id,
      });
    }

    res.json({
      message: "Usuario registrado con exito",
      id: newUser.user_id,
      user_name: newUser.user_name,
      user_lastname: newUser.user_lastname,
      user_email: newUser.user_email,
      role_id: newUser.role_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

// ? Login de usuario
export const login = async (req: Request, res: Response) => {
  const { user_email, user_password } = req.body;
  try {
    const userFound = await User.findOne({
      where: {
        user_email: user_email,
      },
    });
    if (!userFound) return res.status(400).json(["El usuario no existe"]);

    const isMatch = await bcrypt.compare(
      user_password,
      userFound.user_password
    );
    if (!isMatch) return res.status(400).json(["Contraseña incorrecta"]);

    const token = await createAccesToken({
      id: userFound.user_id,
    });

    res.cookie("token", token);

    let roleTable;
    if (userFound.role_id === 1) {
      roleTable = await Student.findOne({
        where: {
          user_id: userFound.user_id,
        },
        include: [Degree, Group],
      });
    } else if (userFound.role_id === 2) {
      roleTable = await Teacher.findOne({
        where: {
          user_id: userFound.user_id,
        },
        include: [Group],
      });
    } else if (userFound.role_id === 3) {
      roleTable = await Admin.findOne({
        where: {
          user_id: userFound.user_id,
        },
      });
    }
    res.json({
      message: "Ingreso Exitoso",
      id: userFound.user_id,
      user_name: userFound.user_name,
      user_lastname: userFound.user_lastname,
      user_email: userFound.user_email,
      role_id: userFound.role_id,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

// ? Logout
export const logout = (req: Request, res: Response) => {
  if (!req.cookies.token) return res.status(401).json({ message: "No token" });
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.redirect("/");
  return res.sendStatus(200);
};

// ? Verificar Token
export const verifyToken = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (error: any, user: any) => {
    if (error) return res.status(401).json({ message: "Unauthorized" });

    const userFound = await User.findByPk(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    return res.json({
      user_id: userFound.user_id,
      user_name: userFound.user_name,
      role_id: userFound.role_id,
      user_email: userFound.user_email,
    });
  });
};
