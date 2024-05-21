import { ProductRepository } from "./ProductRepository";
import { IngredientModel } from "../interfaces/IngredientInterface";
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
    const mappedIngredients = product.ingredients.map((ingredient) => ({
      ingredientId: ingredient.ingredientId.toString(), // Convertendo ObjectId para string, se necessário
      name: ingredient.name,
      amount: ingredient.amount,
    }));
    const cost = await this.calculateProductCost(mappedIngredients);
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
      const mappedIngredients = productData.ingredients.map((ingredient) => ({
        ingredientId: ingredient.ingredientId.toString(), // Convertendo ObjectId para string, se necessário
        name: ingredient.name,
        amount: ingredient.amount,
      }));
      const productCost = await this.calculateProductCost(mappedIngredients);
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

  async findByIngredientId(ingredientId: string): Promise<Product[]> {
    if (!Types.ObjectId.isValid(ingredientId)) {
      throw new Error("ID do ingrediente inválido.");
    }
    const products = await ProductModel.find({
      "ingredients.ingredientId": ingredientId,
    }).exec();
    return products;
  }

  async updateProductsWithIngredientChange(
    ingredientId: string
  ): Promise<void> {
    // Encontre todos os produtos que contenham o ingrediente especificado
    const productsToUpdate = await ProductModel.find({
      "ingredients.ingredientId": ingredientId,
    });

    // Atualize os produtos individualmente
    for (const product of productsToUpdate) {
      const updatedProduct = await this.calculateAndUpdateProductCost(product);
      console.log(`Produto atualizado: ${updatedProduct.name}`);
    }
  }

  public async calculateAndUpdateProductCost(
    product: IProductDocument
  ): Promise<IProductDocument> {
    // Calcule o novo custo do produto com base nas informações atualizadas do ingrediente
    let totalCost = 0;
    for (const ingredient of product.ingredients) {
      // Consulte o ingrediente no banco de dados para obter o preço atualizado
      const ingredientData = await IngredientModel.findById(
        ingredient.ingredientId
      );
      if (ingredientData && ingredientData.price) {
        totalCost += ingredientData.price * ingredient.amount;
      }
    }

    // Atualize o custo do produto
    product.cost = totalCost;

    // Salve e retorne o produto atualizado
    return await product.save();
  }
}

export { ProductRepositoryMongoose };
