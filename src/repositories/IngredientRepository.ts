import { Ingredient } from "../entities/Ingredient";

interface IngredientRepository {
  add(ingredient: Ingredient): Promise<Ingredient>;
  findByNameAndManufacturer(
    name: string,
    manufacturer: string
  ): Promise<Ingredient | undefined>;
  updateIngredient(
    id: string,
    ingredientData: Ingredient
  ): Promise<Ingredient | undefined>;
}

export { IngredientRepository };
