//@ts-check
import "dotenv/config";
import express, {urlencoded} from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectionDB } from "./connection/connection";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(morgan("dev"));

app.use(cors({origin: "http://localhost:5173", credentials: true}));

app.use(urlencoded({extended: false}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);

connectionDB();

export default app;


