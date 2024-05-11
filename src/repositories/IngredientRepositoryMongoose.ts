import mongoose from "mongoose";
import { Ingredient } from "../entities/Ingredient";
import { IngredientRepository } from "./IngredientRepository";

const ingredientSchema = new mongoose.Schema({
  name: String,
  description: String,
  manufacturer: String,
  price: Number,
  unit: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const IngredientModel = mongoose.model("ingredients", ingredientSchema);

class IngredientRepositoryMongoose implements IngredientRepository {
  async findByName(name: string): Promise<Ingredient | undefined> {
    const findName = await IngredientModel.findOne({ name }).exec();
    return findName ? findName.toObject() : undefined;
  }
  async add(ingredient: Ingredient): Promise<Ingredient> {
    const ingredientModel = new IngredientModel(ingredient);
    await ingredientModel.save();
    return ingredient;
  }
}

export { IngredientRepositoryMongoose };
