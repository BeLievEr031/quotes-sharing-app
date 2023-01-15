import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGen from "../utils/otpGen.js";
import nodemailer from "nodemailer";
let genOtp;

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      msg: "All fields required..",
    });
  }

  try {
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      return res.json({
        success: false,
        msg: "user Already Exists...",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({
      success: true,
      msg: "User Register",
      user,
    });
  } catch (error) {
    res.json({
      success: false,
      msg: error.message,
    });
  }
};

const checkOtpAndSaveUserToDB = async (req, res) => {
  let { otp } = req.body;

  if (genOtp !== otp) {
    return res.json({
      success: false,
      msg: "Invalid Otp",
    });
  }

  await user.save();

  res.status(200).json({
    success: true,
    msg: "User Register",
    user,
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      msg: "All fields required..",
    });
  }

  const isUser = await UserModel.findOne({ email }).select("+password");

  if (!isUser) {
    return res.json({
      success: false,
      msg: "Invalid Credentials..",
    });
  }

  let user = isUser;
  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.json({
      success: false,
      msg: "Invalid Credentials..",
    });
  }

  const token = jwt.sign(
    {
      userID: user._id,
    },
    process.env.JWT_SECRET
  );

  res.status(200).json({
    success: true,
    token,
    msg: "User Logged In..",
    user,
  });
};

const followUser = async (req, res) => {
  const user = req.user;

  const { userID } = req.params;

  if (!userID) {
    return res.json({
      success: false,
      msg: "Invalid User",
    });
  }

  const followUser = await UserModel.findById(userID);

  if (!followUser) {
    return res.json({
      success: false,
      msg: "Invalid User",
    });
  }

  followUser.follower.push(user._id);
  await followUser.save();
  user.follow.push(userID);

  await user.save();

  res.json({
    success: true,
    msg: "User Followed successfully...",
  });
};

const unFollowUser = async (req, res) => {
  const user = req.user;

  const { userID } = req.params;

  if (!userID) {
    return res.json({
      success: false,
      msg: "Invalid User",
    });
  }

  const unFollowUser = await UserModel.findById(userID);

  if (!unFollowUser) {
    return res.json({
      success: false,
      msg: "Invalid User",
    });
  }

  let idx = unFollowUser.follower.indexOf(user._id);
  unFollowUser.follower.splice(idx, 1);
  await unFollowUser.save();

  idx = user.follow.indexOf(userID);
  user.follow.splice(idx, 1);
  await user.save();

  res.json({
    success: true,
    msg: "User unfollowed successfully...",
  });
};

const profile = async (req, res) => {
  let user = req.user;

  try {
    user = await UserModel.findById(user._id)
      .populate("quotes")
      .populate("follow")
      .populate("follower")
      .populate("likeQuotes");

    res.json({
      success: true,
      msg: "User fetched..",
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};

const singleProfile = async (req, res) => {
  const { userID } = req.params;

  if (!userID) {
    res.json({
      success: false,
      msg: "User id required..",
    });
  }

  try {
    const user = await UserModel.findById(userID)
      .populate("quotes")
      .populate("follow")
      .populate("follower")
      .populate("likeQuotes");

    res.json({
      success: true,
      msg: "User fetched..",
      user,
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: error.message,
    });
  }
};
export {
  registerUser,
  loginUser,
  checkOtpAndSaveUserToDB,
  followUser,
  unFollowUser,
  profile,
  singleProfile,
};
