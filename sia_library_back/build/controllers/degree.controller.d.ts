import { Request, Response } from "express";
export declare const getDegrees: (req: Request, res: Response) => Promise<void>;
export declare const getDegree: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createDegree: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateDegree: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteDegree: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
