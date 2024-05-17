import { ObjectId } from "mongoose";
import { Product } from "../entities/Product";
import { IProductDocument } from "../interfaces/ProductInterface";

interface ProductRepository {
  add(product: Product): Promise<Product | undefined>;

  getAllProducts(): Promise<Product[]>;

  updateProduct(id: string, productData: Product): Promise<Product | undefined>;

  deleteProduct(id: string): Promise<void>;

  findByName(name: string): Promise<IProductDocument | undefined>;

  findById(id: string): Promise<IProductDocument | undefined>;
}

export { ProductRepository };
