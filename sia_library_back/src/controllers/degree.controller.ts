import { Request, Response } from "express";
import { Degree } from "../models/degree.model";
import { Student } from "../models/student.model";
import { User } from "../models/user.model";
import { Modality } from "../models/modality.model";
import { Group } from "../models/group.model";

//? Obtener todas las Carreras
export const getDegrees = async (req: Request, res: Response) => {
  const degrees = await Degree.findAll({
    include: [
      { model: Student, include: [{ model: User }, { model: Group }] },
      { model: Modality },
    ],
  });
  res.json(degrees);
};

//? Obtener una sola Carrera
export const getDegree = async (req: Request, res: Response) => {
  const degree = await Degree.findByPk(req.params.id, {
    include: [{ model: Student, include: [{ model: User }] }],
  });
  if (!degree) return res.status(404).json({ message: "Degree not found" });

  res.json({ degree });
};

//? Crear una Carrera
export const createDegree = async (req: Request, res: Response) => {
  const { degree_name, degree_duration, degree_acronym } = req.body;
  try {
    const degreeFound = await Degree.findOne({
      where: {
        degree_name: degree_name,
      },
    });
    if (degreeFound) {
      return res.status(409).json(["La carrera ya existe"]);
    }

    const newDegree = await Degree.create({
      degree_name,
      degree_duration: degree_duration ?? 4,
      degree_acronym,
      degree_status: true,
    });
    res.json(newDegree);
  } catch (error) {
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

//? Actualizar una Carrera
export const updateDegree = async (req: Request, res: Response) => {
  const { degree_name, degree_duration, degree_status } = req.body;
  const degree = await Degree.findByPk(req.params.id);
  if (degree) {
    await degree.update({
      degree_name,
      degree_duration,
      degree_status,
    });
  } else {
    return res.status(404).json({ message: "No se encontró la carrera" });
  }
  res.json(degree);
};

//? Eliminar una Carrera
export const deleteDegree = async (req: Request, res: Response) => {
  const degree = await Degree.findByPk(req.params.id);
  if (degree) {
    await degree.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json({ message: "No se encontró la carrera" });
  }
};
