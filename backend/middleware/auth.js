import UserModel from "../models/UserModel.js";
import jwt from "jsonwebtoken";
const auth = async (req, res, next) => {
  let { token } = req.headers;
  try {
    if (!token) {
      return res.json({
        success: false,
        msg: "Invalid token",
      });
    }

    let { userID } = await jwt.verify(token, process.env.JWT_SECRET);

    if (!userID) {
      return res.json({
        success: false,
        msg: "Invalid token",
      });
    }

    let user = await UserModel.findById(userID);

    if (!user) {
      return res.json({
        success: false,
        msg: "Invalid token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.json({
      success: true,
      msg: error.message,
    });
  }
};

export default auth;
