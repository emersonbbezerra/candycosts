import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://emersonbbezerra:QKo1XpHnoV0esJ0X@confeitaria2.qfq4q0q.mongodb.net/confeitaria"
    );
    console.log("Connect database success");
  } catch (error) {
    console.log("~ file: database.ts:5 ~ connect ~ error:", error);
  }
}
