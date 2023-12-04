import { Request, Response } from "express";
export declare const getTeachers: (req: Request, res: Response) => Promise<void>;
export declare const getTeacher: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateTeacher: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
