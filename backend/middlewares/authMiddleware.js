import { tokenService } from "../services";

async function auth(req, res, next) {
  try {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken) {
      throw new Error();
    }

    const userData = await tokenService.verifyAccessToken(accessToken);

    if (!userData) {
      throw new Error();
    }

    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

export default auth;
