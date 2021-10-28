class RoomDtos {
  _id;
  topic;
  roomType;
  speakers;
  ownerId;
  createdAt;

  constructor(room) {
    this._id = room._id;
    this.topic = room.topic;
    this.roomType = room.roomType;
    this.speakers = room.speakers;
    this.ownerId = room.ownerId;
    this.createdAt = room.createdAt;
  }
}

export default RoomDtos;
