import { Product } from "../entities/Product";

interface ProductRepository {
  add(product: Product): Promise<Product>;
  findByName(name: string): Promise<Product | undefined>;
}

export { ProductRepository };
