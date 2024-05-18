import { Product } from "../entities/Product";
import { HttpException } from "../interfaces/HttpException";
import { ProductRepository } from "../repositories/ProductRepository";
import { IProductDocument } from "../interfaces/ProductInterface";

class ProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async create(productData: Product) {
    if (!productData.name) {
      throw new HttpException(400, "O nome do produto é obrigatório.");
    }

    if (productData.name.length < 3) {
      throw new HttpException(
        400,
        "O nome do produto não pode ter menos de 3 caracteres."
      );
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

  async getAll() {
    const result = await this.productRepository.getAllProducts();

    if (!result) {
      throw new HttpException(404, "Nenhum produto encontrado.");
    }

    return result;
  }

  async findOne(id: string) {
    const result = await this.productRepository.findById(id);

    if (!result) {
      throw new HttpException(404, "Nenhum produto encontrado.");
    }

    return result;
  }

  async update(id: string, productData: IProductDocument) {
    if (!productData) {
      throw new HttpException(400, "O nome do produto é obrigatório.");
    }
    if (productData.name.length < 3) {
      throw new HttpException(
        400,
        "O nome do ingrediente não pode ter menos de 3 caracteres."
      );
    }

    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new HttpException(404, "Produto não encontrado.");
    }

    const productByName = await this.productRepository.findByName(
      productData.name
    );
    if (productByName && productByName._id.toString() !== id) {
      throw new HttpException(
        400,
        `Já existe um produto cadastrado com esse nome. O id dele é ${productByName._id}`
      );
    }

    const result = await this.productRepository.updateProduct(id, productData);
    return result;
  }

  async delete(id: string) {
    const existingProduct = await this.productRepository.findById(id);
    if (!existingProduct) {
      throw new HttpException(404, "Produto não localizado.");
    }
    const result = await this.productRepository.deleteProduct(id);
    return result;
  }
}

export { ProductUseCase };
