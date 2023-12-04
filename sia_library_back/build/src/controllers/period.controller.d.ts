import { Request, Response } from "express";
export declare const getPeriods: (req: Request, res: Response) => Promise<void>;
export declare const getPeriod: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createPeriod: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updatePeriod: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deletePeriod: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
