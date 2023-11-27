import { Request, Response } from "express";
import { Period } from "../models/period.model";

// ? Obtener todos los periodos
export const getPeriods = async (req: Request, res: Response) => {
  const periods = await Period.findAll();
  res.json(periods);
};

// ? Obtener un solo periodo
export const getPeriod = async (req: Request, res: Response) => {
  const period = await Period.findByPk(req.params.id);
  if (!period) return res.status(404).json({ message: "Period not found" });
  res.json(period);
};

// ? Crear un nuevo periodo
export const createPeriod = async (req: Request, res: Response) => {
  const { period_id, period_name } = req.body;
  try {
    const periodFound = await Period.findOne({
      where: { period_name: period_name },
    });
    if (periodFound)
      return res.status(400).json({ message: "El periodo ya existe" });

    const newPeriod = await Period.create({
      period_name,
      period_id,
    });
    res.json(newPeriod);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

// ? Actualizar un periodo
export const updatePeriod = async (req: Request, res: Response) => {
  const { period_name } = req.body;
  const period = await Period.findByPk(req.params.id);
  if (period) {
    await period.update({
      period_name,
    });
  } else {
    return res.status(404).json({ message: "Periodo no encontrado" });
  }
  res.json(period);
};

// ? Eliminar un periodo
export const deletePeriod = async (req: Request, res: Response) => {
  const period = await Period.findByPk(req.params.id);
  if (period) {
    await period.destroy();
    return res.sendStatus(204);
  } else {
    return res.status(404).json({ message: "Periodo no encontrado" });
  }
};
