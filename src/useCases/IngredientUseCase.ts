import { Ingredient } from "../entities/Ingredient";
import { HttpException } from "../interfaces/HttpException";
import { IngredientRepository } from "../repositories/IngredientRepository";
import { ProductRepository } from "../repositories/ProductRepository";
import { ProductModel } from "../interfaces/ProductInterface";

class IngredientUseCase {
  constructor(
    private ingredientRepository: IngredientRepository,
    private productRepository: ProductRepository
  ) {}

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

  async findOne(id: string) {
    const result = await this.ingredientRepository.findById(id);

    if (!result) {
      throw new HttpException(404, "Ingrediente não encontrado");
    }

    return result;
  }

  async delete(id: string) {
    await this.ingredientRepository.deleteIngredient(id);
  }

  async update(id: string, ingredientData: Ingredient) {
    if (ingredientData.name) {
      if (ingredientData.name.length < 3) {
        throw new HttpException(
          400,
          "O nome do ingrediente não pode ter menos de 3 caracteres."
        );
      }
    }
    if (ingredientData.price) {
      if (ingredientData.price <= 0 || ingredientData.price.toString() === "") {
        throw new HttpException(
          400,
          "O preço do ingrediente não pode ser menor ou igual a 0."
        );
      }
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

    await this.updateRelatedProducts(id);
    return result;
  }

  async updateRelatedProducts(ingredientId: string) {
    const productsToUpdate = await this.productRepository.findByIngredientId(
      ingredientId
    );

    for (const product of productsToUpdate) {
      const productDocument = new ProductModel(product);
      const updatedProduct =
        await this.productRepository.calculateAndUpdateProductCost(
          productDocument
        );
    }
  }
}

export { IngredientUseCase };
