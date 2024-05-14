import { Ingredient } from "../entities/Ingredient";
import { HttpException } from "../interfaces/HttpException";
import { IngredientRepository } from "../repositories/IngredientRepository";

class IngredientUseCase {
  constructor(private ingredientRepository: IngredientRepository) {}

  async create(ingredientData: Ingredient) {
    if (!ingredientData.name) {
      throw new HttpException(400, "O nome do ingrediente é obrigatório.");
    }

    if (ingredientData.name.length < 3) {
      throw new HttpException(
        400,
        "O nome do ingrediente não pode ter menos de 3 caracteres."
      );
    }

    if (
      !ingredientData.price ||
      ingredientData.price <= 0 ||
      ingredientData.price.toString() === ""
    ) {
      throw new HttpException(
        400,
        "O preço do ingrediente é obrigatório e não pode ser menor ou igual a 0."
      );
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

  async getAll() {
    const result = await this.ingredientRepository.getAllIngredients();

    if (!result) {
      throw new HttpException(404, "Nenhum ingrediente encontrado.");
    }

    return result;
  }

  async path(id: string, ingredientData: Ingredient) {
    if (!ingredientData.name) {
      throw new HttpException(400, "O nome do ingrediente é obrigatório.");
    }
    if (ingredientData.name.length < 3) {
      throw new HttpException(
        400,
        "O nome do ingrediente não pode ter menos de 3 caracteres."
      );
    }
    if (
      !ingredientData.price ||
      ingredientData.price <= 0 ||
      ingredientData.price.toString() === ""
    ) {
      throw new HttpException(
        400,
        "O preço do ingrediente é obrigatório e não pode ser menor ou igual a 0."
      );
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

    const result = await this.ingredientRepository.updateIngredient(
      id,
      ingredientData
    );
    return result;
  }

  async delete(id: string) {
    await this.ingredientRepository.deleteIngredient(id);
  }
}

export { IngredientUseCase };
