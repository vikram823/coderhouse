import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema, "tokens");
