"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccesToken = void 0;
//@ts-check
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
function createAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, config_1.TOKEN_SECRET, { expiresIn: "2d" }, (err, token) => {
            if (err)
                reject(err);
            resolve(token);
        });
    });
}
exports.createAccesToken = createAccesToken;
