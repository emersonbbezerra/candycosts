import { Product } from "../entities/Product";

interface ProductRepository {
  add(product: Product): Promise<Product>;
}

export { ProductRepository };
