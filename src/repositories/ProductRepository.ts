import { Product } from "../entities/Product";

interface ProductRepository {
  add(product: Product): Promise<Product>;
  findByName(name: string): Promise<string | undefined>;
}

export { ProductRepository };
