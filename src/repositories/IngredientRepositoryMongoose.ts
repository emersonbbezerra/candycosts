import mongoose, { Types } from "mongoose";
import { Ingredient } from "../entities/Ingredient";
import { IngredientRepository } from "./IngredientRepository";
import { HttpException } from "../interfaces/HttpException";
import { IngredientModel } from "../interfaces/IngredientInterface";

class IngredientRepositoryMongoose implements IngredientRepository {
  async add(ingredient: Ingredient): Promise<Ingredient> {
    const ingredientModel = new IngredientModel(ingredient);
    await ingredientModel.save();
    return ingredient;
  }

  async getAllIngredients(): Promise<Ingredient[]> {
    const getAllIngredients = await IngredientModel.find<Ingredient>();
    return getAllIngredients;
  }

  async findById(id: string): Promise<Ingredient[] | undefined> {
    if (!Types.ObjectId.isValid(id)) {
      return undefined;
    }
    const findId = await IngredientModel.findById(id);
    return findId ? findId.toObject() : undefined;
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

  async deleteIngredient(id: string): Promise<void> {
    const ingredientId = await IngredientModel.findById(id);
    if (!ingredientId) {
      throw new HttpException(404, "Ingrediente não encontrado");
    } else {
      await IngredientModel.findByIdAndDelete(ingredientId);
    }
  }

  async findByNameAndManufacturer(
    name: string,
    manufacturer: string
  ): Promise<Ingredient | undefined> {
    const findNameAndManufacturer = await IngredientModel.findOne({
      name,
      manufacturer,
    });
    return findNameAndManufacturer
      ? findNameAndManufacturer.toObject()
      : undefined;
  }
}

export { IngredientRepositoryMongoose };
