import jwt from "jsonwebtoken";
import "dotenv/config";
import { TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/config";

function sign(payload:any, isAccessToken:boolean): string{
    console.log('payload', payload);
    return jwt.sign(payload, isAccessToken? TOKEN_SECRET : REFRESH_TOKEN_SECRET,{
        expiresIn: 3600,
        algorithm: "HS256",
    });
    
}

function generateAccessToken(user:any): string {
    return sign({user}, true);
}
function generateRefreshToken(user:any): string {
    return sign({user}, false);
}
export const jwtUtils = {
    generateAccessToken,
    generateRefreshToken
}