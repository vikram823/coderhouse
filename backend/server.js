import express, { json } from "express";
import routes from "./routes";
import { PORT } from "./config";
import DbConnect from "./db";
import cors from "cors";

const app = express();
const corsOption = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));


DbConnect();
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`App listenning on port ${PORT}`));
