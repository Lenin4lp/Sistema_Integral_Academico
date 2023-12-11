import { Request, Response } from "express";
export declare const getStudents: (req: Request, res: Response) => Promise<void>;
export declare const getStudent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateStudent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const assignStudentToSubject: (req: Request, res: Response) => Promise<void>;
export declare const removeStudentFromSubject: (req: Request, res: Response) => Promise<void>;
