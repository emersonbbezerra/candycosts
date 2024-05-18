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

    this.router.get(
      "/",
      this.productController.getAllProducts.bind(this.productController)
    );

    this.router.get(
      "/:id",
      this.productController.getById.bind(this.productController)
    );

    this.router.patch("", (req, res) => {
      return res.status(400).json({ error: "ID do produto não fornecido." });
    });
    this.router.patch(
      "/:id",
      this.productController.update.bind(this.productController)
    );

    this.router.delete("", (req, res) => {
      return res.status(400).json({ error: "ID do produto não fornecido." });
    });
    this.router.delete(
      "/:id",
      this.productController.delete.bind(this.productController)
    );
  }
}

export { ProductRoutes };
