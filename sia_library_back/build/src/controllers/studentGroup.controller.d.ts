import { Request, Response } from "express";
export declare const addStudentToGroup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const removeStudentFromGroup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
