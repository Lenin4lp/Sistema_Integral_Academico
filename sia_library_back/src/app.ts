//@ts-check
import "dotenv/config";
import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectionDB } from "./connection/connection";
import authRoutes from "./routes/auth.routes";
import academicRoutes from "./routes/academic.routes";
import bookRoutes from "./routes/book.routes";
import rolesRoutes from "./routes/roles.routes";
import userRoutes from "./routes/user.routes";
import groupRoutes from "./routes/group.routes";
import gradesRoutes from "./routes/grades.routes";
import modalityRoutes from "./routes/modality.routes";
import periodRoutes from "./routes/period.routes";

const app = express();

app.use(morgan("dev"));

app.use(cors({ origin: "https://sia.istvc.edu.ec", credentials: true }));

app.use(urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", academicRoutes);
app.use("/api", bookRoutes);
app.use("/api", rolesRoutes);
app.use("/api", userRoutes);
app.use("/api", groupRoutes);
app.use("/api", gradesRoutes);
app.use("/api", modalityRoutes);
app.use("/api", periodRoutes);
app.get("/", (_req, res) => {
  res.send("Hola mundo");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
connectionDB();

export default app;
