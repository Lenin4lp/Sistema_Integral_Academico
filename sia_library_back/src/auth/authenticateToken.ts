import { Request, Response, NextFunction } from "express";
import log from "../libs/trace";
import validateToken from "./validateToken";
import {jwtUtils} from "./verify";

const verifyToken = jwtUtils.verifyAccessToken 

function authenticateToken(req: Request, res: Response, next: NextFunction){
    let token: string | null = null;
    log.info('headers', req.headers);
  
    try {
      token = validateToken(req.headers);
    } catch (error: any) {
      log.error(error.message);
  
      if (error.message === 'Token not provided') {
        return res.status(401).json({ error: 'Token no proporcionado' });
      }
  
      if (error.message === 'Token format invalid') {
        return res.status(401).json({ error: 'Token mal formado' });
      }
    }
  
    try {
      const decoded = verifyToken(token);
      req.user = { ...decoded.user };
      next();
    } catch (err: any) {
      console.log('6 Token inválido', token, err);
      return res.status(403).json({ error: 'Token inválido' });
    }
  }
  
  export default authenticateToken;