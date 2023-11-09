import { NextFunction, Request, Response } from "express";
export declare const validateSchema: (schema: {
    parse: (arg0: {}) => void;
}) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
