import { BASE_URL } from "../config";

class UserDtos {
  _id;
  phone;
  name;
  avatar;
  activated;
  createdAt;

  constructor(user) {
    this._id = user._id;
    this.phone = user.phone;
    this.activated = user.activated;
    this.createdAt = user.createdAt;
    this.name = user.name;
    this.avatar = user.avatar;
  }
}

export default UserDtos;
