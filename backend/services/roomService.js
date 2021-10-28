import { getAllRooms } from "../../frontend/src/http";
import Room from "../model/roomModel";

const RoomService = {
  async create({ topic, roomType, userId }) {
    const room = await Room.create({
      topic,
      roomType,
      ownerId: userId,
      speakers: [userId],
    });

    return room;
  },
  async getAllRooms(roomTypes) {
    const rooms = await Room.find({
      roomType: { $in: roomTypes },
    })
      .populate("speakers")
      .populate("ownerId")
      .exec();

    return rooms;
  },
};

export default RoomService;
