import mongoose from "mongoose";
import { Ingredient } from "../entities/Ingredient";
import { IngredientRepository } from "./IngredientRepository";

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

const IngredientModel = mongoose.model("ingredients", ingredientSchema);

class IngredientRepositoryMongoose implements IngredientRepository {
  async findByNameAndManufacturer(
    name: string,
    manufacturer: string
  ): Promise<Ingredient | undefined> {
    const findNameAndManufacturer = await IngredientModel.findOne({
      name,
      manufacturer,
    }).exec();
    return findNameAndManufacturer
      ? findNameAndManufacturer.toObject()
      : undefined;
  }

  async add(ingredient: Ingredient): Promise<Ingredient> {
    const ingredientModel = new IngredientModel(ingredient);
    await ingredientModel.save();
    return ingredient;
  }

  async updateIngredient(
    id: string,
    ingredientData: Ingredient
  ): Promise<Ingredient | undefined> {
    {
      const updateIngredient = await IngredientModel.findByIdAndUpdate(
        id,
        ingredientData,
        { new: true }
      );
      return updateIngredient ? updateIngredient.toObject() : undefined;
    }
  }
}

export { IngredientRepositoryMongoose };
