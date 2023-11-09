//@ts-check
import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectionDB } from "./src/connection/connection";
import authRoutes from "./src/routes/auth.routes";
import academicRoutes from "./src/routes/academic.routes";
import bookRoutes from "./src/routes/book.routes";
import rolesRoutes from "./src/routes/roles.routes";

const app = express();

app.use(morgan("dev"));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", academicRoutes);
app.use("/api", bookRoutes);
app.use("/api", rolesRoutes);
app.get("/", (_req, res) => {
  res.send("Hola mundo");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
connectionDB();

export default app;
