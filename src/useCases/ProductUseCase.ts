import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";

class ProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async create(productData: Product) {
    const result = await this.productRepository.add(productData);
    return result;
  }
}

export { ProductUseCase };
