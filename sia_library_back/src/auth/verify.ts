import jwt from "jsonwebtoken";
import { TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/config";

function verifyAccessToken(token: any): any {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    return decoded;
  }
  
  function verifyRefreshToken(token: any): any {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);
    return decoded;
  }
  
  export const jwtUtils = { verifyAccessToken, verifyRefreshToken };