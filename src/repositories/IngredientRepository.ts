import { Ingredient } from "../entities/Ingredient";

interface IngredientRepository {
  add(ingredient: Ingredient): Promise<Ingredient>;
  findByName(name: string): Promise<Ingredient | undefined>;
}

export { IngredientRepository };
