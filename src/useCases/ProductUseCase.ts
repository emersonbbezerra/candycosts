import { Product } from "../entities/Product";
import { HttpException } from "../interfaces/HttpException";
import { ProductRepository } from "../repositories/ProductRepository";

class ProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async create(productData: Product) {
    if (!productData.name) {
      throw new HttpException(400, "O nome do produto é obrigatório.");
    }

    if (!productData.ingredients) {
      throw new HttpException(
        400,
        "Os ingredientes do produto são obrigatórios."
      );
    }

    const verifyName = await this.productRepository.findByName(
      productData.name
    );

    if (verifyName) {
      throw new HttpException(
        400,
        "Já existe um produto cadastrado com esse nome."
      );
    }

    const result = await this.productRepository.add(productData);
    return result;
  }
}

export { ProductUseCase };
