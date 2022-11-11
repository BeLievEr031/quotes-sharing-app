import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("connected to the db");
  } catch (err) {
    console.log(err);
  }
}

export default dbConnect;
