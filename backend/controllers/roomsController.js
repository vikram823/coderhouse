import RoomService from "../services/roomService";
import RoomDtos from "../dtos/roomDtos";

const RoomController = {
  async create(req, res) {
    const { topic, roomType } = req.body;

    if (!topic || !roomType) {
      return res.status(400).json({ message: "All fields are req" });
    }

    const room = await RoomService.create({
      topic,
      roomType,
      userId: req.user,
    });

    return res.json(new RoomDtos(room));
  },

  async index(req, res) {
    const rooms = await RoomService.getAllRooms(["open"]);

    const allRooms = rooms.map((room) => new RoomDtos(room));

    return res.json(allRooms);
  },
};

export default RoomController;
