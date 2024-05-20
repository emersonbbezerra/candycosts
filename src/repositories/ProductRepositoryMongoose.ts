import { ProductRepository } from "./ProductRepository";
import { IngredientModel } from "./IngredientRepositoryMongoose";
import { IProductDocument, ProductModel } from "../interfaces/ProductInterface";
import { Product } from "../entities/Product";
import { Types } from "mongoose";
import { HttpException } from "../interfaces/HttpException";

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
    const cost = await this.calculateProductCost(product.ingredients);
    const newProduct = await ProductModel.create({ ...product, cost });
    return newProduct;
  }

  async getAllProducts(): Promise<Product[]> {
    const getAllProducts = await ProductModel.find<Product>();
    return getAllProducts;
  }

  async updateProduct(
    id: string,
    productData: Product
  ): Promise<Product | undefined> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("ID do produto inválido.");
    }
    if (productData.ingredients) {
      const productCost = await this.calculateProductCost(
        productData.ingredients
      );
      const updateDataWithCost = { ...productData, cost: productCost };
      const productUpdate = await ProductModel.findByIdAndUpdate(
        id,
        updateDataWithCost,
        { new: true }
      );
      return productUpdate ? productUpdate.toObject() : undefined;
    } else if (!productData.ingredients) {
      const productWithoutChangingCost = await IngredientModel.findById(id);
      const updateDataWithoutChangingCost = {
        ...productData,
        igredients: productWithoutChangingCost,
      };
      const productUpdate = await ProductModel.findByIdAndUpdate(
        id,
        updateDataWithoutChangingCost,
        { new: true }
      );
      return productUpdate ? productUpdate.toObject() : undefined;
    } else {
      const productUpdate = await ProductModel.findByIdAndUpdate(
        id,
        productData,
        { new: true }
      );
      return productUpdate ? productUpdate.toObject() : undefined;
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      const productToDelete = await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Não foi possível deletar o produto");
    }
  }

  async findByName(name: string): Promise<IProductDocument | undefined> {
    const findName = await ProductModel.findOne({ name }).exec();
    return findName ? findName.toObject() : undefined;
  }

  async findById(id: string): Promise<IProductDocument | undefined> {
    if (!Types.ObjectId.isValid(id)) {
      return undefined;
    }
    const findId = await ProductModel.findById(id);
    return findId ? findId.toObject() : undefined;
  }
}

export { ProductRepositoryMongoose };
