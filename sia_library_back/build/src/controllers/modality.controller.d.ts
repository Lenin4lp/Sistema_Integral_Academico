import { Request, Response } from "express";
export declare const getModalities: (req: Request, res: Response) => Promise<void>;
export declare const getModality: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createModality: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateModality: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteModality: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
