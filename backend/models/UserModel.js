import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    quotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuotesModel",
      },
    ],

    likeQuotes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuotesModel",
      },
    ],
    follow: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
      },
    ],
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model("UserModel", userSchema);
export default UserModel;
