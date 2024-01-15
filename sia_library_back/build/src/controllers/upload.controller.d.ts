/// <reference types="qs" />
import { Request, Response } from "express";
export declare const uploaded: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export declare const uploadFile: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
