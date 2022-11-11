import mongoose from "mongoose";

let quotesSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: true,
    },
    author: {
      name: { type: String, required: true },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
      },
    },
    likes: [
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

const QuotesModel = new mongoose.model("QuotesModel", quotesSchema);
export default QuotesModel;
