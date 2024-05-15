import { ProductRepository } from "./ProductRepository";
import { IngredientModel } from "./IngredientRepositoryMongoose";
import { ProductModel } from "../interfaces/ProductInterface";
import { Product } from "../entities/Product";

class ProductRepositoryMongoose implements ProductRepository {
  private async calculateProductCost(
    ingredients: { ingredientId: string; name: string; amount: number }[]
  ): Promise<number> {
    try {
      let totalCost = 0;
      for (const ingredient of ingredients) {
        const ingredientToCalculate = await IngredientModel.findById(
          ingredient.ingredientId
        );
        if (!ingredientToCalculate?.price) {
          throw new Error(
            `Insumo com ID ${ingredient.ingredientId} não encontrado.`
          );
        }
        totalCost += ingredientToCalculate.price * ingredient.amount;
      }
      return totalCost;
    } catch (error) {
      throw new Error(`Erro ao calcular o custo da receita: ${error}`);
    }
  }

  async add(product: Product): Promise<Product | undefined> {
    try {
      const cost = await this.calculateProductCost(product.ingredients);
      const newProduct = await ProductModel.create({ ...product, cost });
      return newProduct;
    } catch (error) {
      throw new Error(`Erro ao criar a receita: ${error}`);
    }
  }

  async getAllProducts(): Promise<Product[]> {
    const getAllProducts = await ProductModel.find<Product>();
    return getAllProducts;
  }

  async updateProduct(
    id: string,
    productData: Product
  ): Promise<Product | undefined> {
    throw new Error("Method not implemented.");
  }

  async deleteProduct(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findByName(name: string): Promise<Product | undefined> {
    const findName = await ProductModel.findOne({ name }).exec();
    return findName ? findName.toObject() : undefined;
  }
}

export { ProductRepositoryMongoose };
