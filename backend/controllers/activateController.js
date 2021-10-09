import Jimp from "jimp";
import path from "path";
import { userService } from "../services";
import UserDtos from "../dtos/userDtos";

const ActivateController = {
  async activate(req, res) {
    const { name, avatar } = req.body;

    if (!name || !avatar) {
      res.status(400).json({ message: "fields required" });
    }

    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );

    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    try {
      const jimResp = await Jimp.read(buffer);
      jimResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (err) {
      res.status(500).json({ message: "Could not process the image" });
    }

    const _id = req.user._id;

    try {
      const user = await userService.findUser({ _id });

      if (!user) {
        res.status(404).json({ message: "user not found" });
      }

      user.activated = true;
      user.name = name;
      user.avatar = `/storage/${imagePath}`;
      user.save();
      res.json({ user: new UserDtos(user), auth: true });
    } catch (err) {
      return res.status94(500).json({ message: "Something went wrong" });
    }
  },
};

export default ActivateController;
