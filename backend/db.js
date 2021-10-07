import mongoose from "mongoose";
import { DB_URL } from "./config";

function DbConnect() {

  // Database connection
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected...");
  });
}

export default DbConnect;
