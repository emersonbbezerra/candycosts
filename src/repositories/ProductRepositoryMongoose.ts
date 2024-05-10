import mongoose from "mongoose";
import { Product } from "../entities/Product";
import { ProductRepository } from "./ProductRepository";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: {
    type: Array,
    ref: "Ingredients",
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
}

export { ProductRepositoryMongoose };
