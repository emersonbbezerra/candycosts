import { Router } from "express";
import { ProductRepositoryMongoose } from "../repositories/ProductRepositoryMongoose";
import { ProductController } from "../controllers/ProductController";
import { ProductUseCase } from "../useCases/ProductUseCase";

class ProductRoutes {
  public router: Router;
  private productController: ProductController;
  constructor() {
    this.router = Router();
    const productRepository = new ProductRepositoryMongoose();
    const productUseCase = new ProductUseCase(productRepository);
    this.productController = new ProductController(productUseCase);
    this.initRoutes();
  }
  initRoutes() {
    this.router.post(
      "/",
      this.productController.create.bind(this.productController)
    );
  }
}

export { ProductRoutes };
