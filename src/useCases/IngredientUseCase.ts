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

    const verifyNameAndManufacturer =
      await this.ingredientRepository.findByNameAndManufacturer(
        ingredientData.name,
        ingredientData.manufacturer
      );

    if (verifyNameAndManufacturer) {
      throw new HttpException(
        400,
        "Já existe um ingrediente similar cadastrado."
      );
    }

    const result = await this.ingredientRepository.add(ingredientData);
    return result;
  }

  async path(id: string, ingredientData: Ingredient) {
    if (!id) {
      throw new HttpException(404, "Ingrediente não encontrado.");
    }

    const result = await this.ingredientRepository.updateIngredient(
      id,
      ingredientData
    );
    return result;
  }
}

export { IngredientUseCase };
