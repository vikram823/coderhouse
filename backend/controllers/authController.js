import {
  otpService,
  hashService,
  userService,
  tokenService,
} from "../services";
import UserDtos from "../dtos/userDtos";

const AuthController = {
  async sendOtp(req, res) {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    const otp = await otpService.genrateOtp();

    // hash
    const ttl = 1000 * 60 * 2;
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hashedOtp = hashService.hashOtp(data);

    // otp sms
    try {
      // await otpService.sendBySms(phone, otp);
      return res.json({
        hash: `${hashedOtp}.${expires}`,
        phone,
        otp,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Sending otp failed!" });
    }
  },

  async verifyOtp(req, res) {
    const { phone, otp, hash } = req.body;

    if (!phone || !otp || !hash) {
      return res.status(400).json({ message: "Fields number is required" });
    }

    const [hashedOtp, expires] = hash.split(".");

    if (Date.now() > +expires) {
      return res.status(400).json({ message: "OTP has expired!" });
    }

    const data = `${phone}.${otp}.${expires}`;

    const isValid = otpService.verifyHashedOtp(hashedOtp, data);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user;

    try {
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }

    const { accessToken, refreshToken } = tokenService.genrateTokens({
      _id: user._id,
      activated: false,
    });

    await tokenService.storerRefToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDtos = new UserDtos(user);
    return res.json({ auth: true, user: userDtos });
  },

  async refresh(req, res) {
    const { refreshToken: refTokenFromCookies } = req.cookies;

    let userData;

    try {
      userData = await tokenService.verifyRefreshToken(refTokenFromCookies);
    } catch (err) {
      return res.status(401).json({ message: "Inavalid token" });
    }

    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refTokenFromCookies
      );

      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    const user = await userService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const { accessToken, refreshToken } = tokenService.genrateTokens({
      _id: userData._id,
    });

    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDtos = new UserDtos(user);
    return res.json({ auth: true, user: userDtos });
  },

  async logout(req, res) {
    const { refreshToken } = req.cookies;

    await tokenService.removeToken(refreshToken);

    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");

    res.json({ user: null, isAuth: false });
  },
};

export default AuthController;
