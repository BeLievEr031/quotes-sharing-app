import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import userRouter from "./routes/userRouter.js";
import quotesRouter from "./routes/quotesRouter.js";
import cors from "cors"
dotenv.config();
const app = express();

app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/quote", quotesRouter);

app.listen(5000, () => {
  dbConnect();
  console.log("Connected to server");
});
