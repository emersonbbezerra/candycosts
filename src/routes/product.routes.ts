import { Router } from "express";
import { ProductRepositoryMongoose } from "../repositories/ProductRepositoryMongoose";
import { ProductController } from "../controllers/ProductController";
import { ProductUseCase } from "../useCases/ProductUseCase";
import multer from "multer";

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
    const multerBody = multer;
    this.router.post(
      "/",
      multerBody().fields([]),
      this.productController.create.bind(this.productController)
    );
  }
}

export { ProductRoutes };
