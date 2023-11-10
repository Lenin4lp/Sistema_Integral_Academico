"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-check
require("dotenv/config");
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connection_1 = require("./connection/connection");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const academic_routes_1 = __importDefault(require("./routes/academic.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const roles_routes_1 = __importDefault(require("./routes/roles.routes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
app.use((0, express_1.urlencoded)({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api", auth_routes_1.default);
app.use("/api", academic_routes_1.default);
app.use("/api", book_routes_1.default);
app.use("/api", roles_routes_1.default);
app.get("/", (_req, res) => {
    res.send("Hola mundo");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
(0, connection_1.connectionDB)();
exports.default = app;
