import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    speakers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema, "rooms");
