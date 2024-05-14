import mongoose from "mongoose";
import { Product } from "../entities/Product";
import { ProductRepository } from "./ProductRepository";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: {
    type: Array,
    ref: "ingredients",
  },
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("products", productSchema);

class ProductRepositoryMongoose implements ProductRepository {
  async add(product: Product): Promise<Product> {
    const productModel = new ProductModel(product);
    await productModel.save();
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    throw new Error("Method not implemented.");
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
