import { Request, Response } from "express";
import { Schedule } from "../models/schedule.model";

// ? Obtener todos los horarios
export const getSchedules = async (req: Request, res: Response) => {
  const schedules = await Schedule.findAll();
  res.json(schedules);
};

//? Obtener un horario
export const getSchedule = async (req: Request, res: Response) => {
  const schedule = await Schedule.findByPk(req.params.id);
  if (!schedule) return res.status(404).json({ message: "Schedule not found" });
  res.json(schedule);
};

//? Crear un horario
export const createSchedule = async (req: Request, res: Response) => {
  const { monday, tuesday, wednesday, thursday, friday } = req.body;
  try {
    const newSchedule = await Schedule.create({
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
    });
    res.json(newSchedule);
  } catch (error) {
    console.log(error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};
