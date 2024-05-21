import mongoose, { Schema } from "mongoose";

export interface IIngredient {
  ingredientId: Schema.Types.ObjectId;
  name: string;
  amount: number;
}

const ingredientSchema = new mongoose.Schema({
  name: String,
  manufacturer: String,
  price: Number,
  unit: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const IngredientModel = mongoose.model("ingredients", ingredientSchema);
