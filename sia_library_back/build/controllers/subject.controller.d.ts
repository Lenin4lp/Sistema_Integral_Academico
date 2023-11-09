import { Request, Response } from "express";
export declare const getSubjects: (req: Request, res: Response) => Promise<void>;
export declare const getSubject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createSubject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateSubject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteSubject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
