//@ts-check
import "dotenv/config";
import express, {urlencoded} from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(morgan("dev"));

app.use(cors({origin: "http://localhost:5173", credentials: true}));

app.use(urlencoded({extended: false}));

app.use(express.json());
app.use(cookieParser());


