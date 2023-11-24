import { Request, Response } from "express";
import { Modality } from "../models/modality.model";

// ? Obtener todas las modalidades
export const getModalities = async (req: Request, res: Response) => {
  const modalities = await Modality.findAll();
  res.json(modalities);
};

// ? Obtener una sola modalidad
export const getModality = async (req: Request, res: Response) => {
  const modality = await Modality.findByPk(req.params.id);
  if (!modality) return res.status(404).json({ message: "Modality not found" });
  res.json(modality);
};

//? Crear una modalidad
export const createModality = async (req: Request, res: Response) => {
  const { modality_name, modality_schedule } = req.body;
  try {
    const modalityFound = await Modality.findOne({
      where: { modality_name: modality_name },
    });
    if (modalityFound)
      return res.status(400).json({ message: "La modalidad ya existe" });

    const newModality = await Modality.create({
      modality_name,
      modality_schedule,
    });
    res.json(newModality);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

// ? Actualizar una modalidad
export const updateModality = async (req: Request, res: Response) => {
  const { modality_name, modality_schedule } = req.body;
  const modality = await Modality.findByPk(req.params.id);
  if (modality) {
    await modality.update({
      modality_name,
      modality_schedule,
    });
  } else {
    return res.status(404).json({ message: "Modalidad no encontrada" });
  }
  res.json(modality);
};

// ? Eliminar una modalidad
export const deleteModality = async (req: Request, res: Response) => {
  const modality = await Modality.findByPk(req.params.id);
  if (modality) {
    await modality.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json({ message: "Modalidad no encontrada" });
  }
};
