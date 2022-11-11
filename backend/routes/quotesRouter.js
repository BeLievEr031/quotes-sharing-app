import express from "express";
import {
  geAllQuotes,
  createQuotes,
  deleteQuote,
  updateQuote,
  likeAndUnlikeQuote,
} from "../controllers/quotesController.js";
import auth from "../middleware/auth.js";
const quotesRouter = express.Router();

quotesRouter.route("/").get(auth,geAllQuotes);
quotesRouter.route("/create").post(auth, createQuotes);
quotesRouter.route("/update/:quoteID").put(auth, updateQuote);
quotesRouter.route("/delete/:quoteID").delete(auth, deleteQuote);
quotesRouter.route("/like/:quoteID").post(auth, likeAndUnlikeQuote);

export default quotesRouter;
