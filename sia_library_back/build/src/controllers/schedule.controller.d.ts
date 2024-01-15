import { Request, Response } from "express";
export declare const getSchedules: (req: Request, res: Response) => Promise<void>;
export declare const getSchedule: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createSchedule: (req: Request, res: Response) => Promise<void>;
