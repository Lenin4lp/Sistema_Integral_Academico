import { Request, Response } from "express";
export declare const getGrades: (req: Request, res: Response) => Promise<void>;
export declare const getGrade: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createGrade: (req: Request, res: Response) => Promise<void>;
export declare const updateGrade: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteGrade: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
