import express from "express";
import auth from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  checkOtpAndSaveUserToDB,
  followUser,
  unFollowUser,
  profile,
} from "../controllers/userController.js";
const userRouter = express.Router();

userRouter.route("/signup").post(registerUser);
userRouter.route("/signup/otp").post(checkOtpAndSaveUserToDB);
userRouter.route("/login").post(loginUser);

userRouter.route("/follow/:userID").post(auth, followUser);
userRouter.route("/unfollow/:userID").post(auth, unFollowUser);

userRouter.route("/profile").get(auth,profile);

export default userRouter;
