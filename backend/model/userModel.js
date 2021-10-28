import mongoose from "mongoose";
import { BASE_URL } from "../config";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    activated: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
      get: (avatar) => {
        if (!avatar) return;
        return `${BASE_URL}${avatar}`;
      },
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

export default mongoose.model("User", userSchema, "users");
