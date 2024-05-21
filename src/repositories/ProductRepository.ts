import { Product } from "../entities/Product";
import { IProductDocument } from "../interfaces/ProductInterface";

interface ProductRepository {
  add(product: Product): Promise<Product | undefined>;

  getAllProducts(): Promise<Product[]>;

  findById(id: string): Promise<IProductDocument | undefined>;

  updateProduct(id: string, productData: Product): Promise<Product | undefined>;

  deleteProduct(id: string): Promise<void>;

  findByName(name: string): Promise<IProductDocument | undefined>;

  findByIngredientId(ingredientId: string): Promise<Product[]>;

  updateProductsWithIngredientChange(ingredientId: string): Promise<void>;

  calculateAndUpdateProductCost(
    product: IProductDocument
  ): Promise<IProductDocument>;
}

export { ProductRepository };
