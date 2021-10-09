import express, { json } from "express";
import routes from "./routes";
import { PORT } from "./config";
import DbConnect from "./db";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));
app.use("/storage", express.static("storage"));

DbConnect();
app.use(express.json({ limit: "8mb" }));
app.use(routes);

app.listen(PORT, () => console.log(`App listenning on port ${PORT}`));
