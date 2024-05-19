import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connect() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("A variável de ambiente DATABASE_URL não está definida.");
  }
  try {
    await mongoose.connect(databaseUrl);
    console.log("Connect database success");
  } catch (error) {
    console.log("~ file: database.ts:5 ~ connect ~ error:", error);
  }
}
