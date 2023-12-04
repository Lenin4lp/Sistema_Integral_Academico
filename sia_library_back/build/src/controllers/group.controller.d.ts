import { Request, Response } from "express";
export declare const getGroups: (req: Request, res: Response) => Promise<void>;
export declare const getGroup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createGroup: (req: Request, res: Response) => Promise<void>;
export declare const updateGroup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteGroup: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addStudentToGroup: (req: Request, res: Response) => Promise<void>;
export declare const deleteStudentFromGroup: (req: Request, res: Response) => Promise<void>;
