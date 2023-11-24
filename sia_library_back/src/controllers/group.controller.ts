import { Request, Response } from "express";
import { Group } from "../models/group.model";
import { Student } from "../models/student.model";
import User from "../models/user.model";
import { Subject } from "../models/subject.model";
import { Period } from "../models/period.model";

// ? Obtener todos los grupos
export const getGroups = async (req: Request, res: Response) => {
  const groups = await Group.findAll();
  res.json(groups);
};

// ? Obtener un grupo
export const getGroup = async (req: Request, res: Response) => {
  const group = await Group.findByPk(req.params.id, {
    include: [
      { model: Student, include: [{ model: User }] },
      { model: Subject },
      { model: Period },
    ],
  });
  if (!group) return res.status(404).json({ message: "Group not found" });
  res.json(group);
};

// ? Crear un grupo
export const createGroup = async (req: Request, res: Response) => {
  const { group_name, group_acronym } = req.body;
  try {
    const groupFound = await Group.findOne({
      where: { group_name: group_name },
    });
    if (groupFound)
      return res.status(400).json({ message: "El grupo ya existe" });

    const newGroup = await Group.create({
      group_name,
      group_acronym,
    });
    res.json(newGroup);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

// ? Actualizar un grupo
export const updateGroup = async (req: Request, res: Response) => {
  const { group_name, group_acronym } = req.body;
  const group = await Group.findByPk(req.params.id);
  if (group) {
    await group.update({
      group_name,
      group_acronym,
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
