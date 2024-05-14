import { Ingredient } from "../entities/Ingredient";

interface IngredientRepository {
  add(ingredient: Ingredient): Promise<Ingredient>;

  getAllIngredients(): Promise<Ingredient[]>;

  updateIngredient(
    id: string,
    ingredientData: Ingredient
  ): Promise<Ingredient | undefined>;

  deleteIngredient(id: string): Promise<void>;

  findByNameAndManufacturer(
    name: string,
    manufacturer: string
  ): Promise<Ingredient | undefined>;
}

export { IngredientRepository };
