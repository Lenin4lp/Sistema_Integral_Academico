"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const authRequired = (req, res, next) => {
    // Req.headers es la ubicacion en donde se almacenan los cookies y por ende el token
    const { token } = req.cookies;
    if (!token)
        return res.status(401).json({ message: "No token, authorization denied" });
    jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ message: "Invalid token" });
        req.user = user;
    });
    next();
};
exports.authRequired = authRequired;
