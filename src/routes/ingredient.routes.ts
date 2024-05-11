import { Router } from "express";
import { IngredientRepositoryMongoose } from "../repositories/IngredientRepositoryMongoose";
import { IngredientController } from "../controllers/IngredientController";
import { IngredientUseCase } from "../useCases/IngredientUseCase";

class IngredientRoutes {
  public router: Router;
  private ingredientController: IngredientController;
  constructor() {
    this.router = Router();
    const ingredientRepository = new IngredientRepositoryMongoose();
    const ingredientUseCase = new IngredientUseCase(ingredientRepository);
    this.ingredientController = new IngredientController(ingredientUseCase);
    this.initRoutes();
  }
  initRoutes() {
    this.router.post(
      "/",
      this.ingredientController.create.bind(this.ingredientController)
    );
    this.router.patch(
      "/:id",
      this.ingredientController.update.bind(this.ingredientController)
    );
  }
}

export { IngredientRoutes };
