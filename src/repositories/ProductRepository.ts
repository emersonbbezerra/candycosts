import { Product } from "../entities/Product";

interface ProductRepository {
  add(product: Product): Promise<Product>;

  getAllProducts(): Promise<Product[]>;

  updateProduct(id: string, productData: Product): Promise<Product | undefined>;

  deleteProduct(id: string): Promise<void>;

  findByName(name: string): Promise<Product | undefined>;
}

export { ProductRepository };
