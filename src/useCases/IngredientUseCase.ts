import { Ingredient } from "../entities/Ingredient";
import { HttpException } from "../interfaces/HttpException";
import { IngredientRepository } from "../repositories/IngredientRepository";

class IngredientUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  async create(ingredientData: Ingredient) {
    if (!ingredientData.name) {
      throw new HttpException(400, "O nome do ingrediente é obrigatório.");
    }

    if (!ingredientData.price) {
      throw new HttpException(400, "O preço do ingrediente é obrigatório.");
    }

    const verifyName = await this.ingredientRepository.findByName(
      ingredientData.name
    );

    if (verifyName) {
      throw new HttpException(
        400,
        "Já existe um ingrediente cadastrado com esse nome."
      );
    }

    const result = await this.ingredientRepository.add(ingredientData);
    return result;
  }
}

export { IngredientUseCase };
