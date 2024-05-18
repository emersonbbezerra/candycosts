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

    this.router.get(
      "/",
      this.ingredientController.getAllIngredients.bind(
        this.ingredientController
      )
    );

    this.router.get(
      "/:id",
      this.ingredientController.getById.bind(this.ingredientController)
    );

    this.router.patch("", (req, res) => {
      return res.status(400).json({ error: "ID do insumo não fornecido." });
    });
    this.router.patch(
      "/:id",
      this.ingredientController.update.bind(this.ingredientController)
    );

    this.router.delete("", (req, res) => {
      return res.status(400).json({ error: "ID do insumo não fornecido." });
    });
    this.router.delete(
      "/:id",
      this.ingredientController.delete.bind(this.ingredientController)
    );
  }
}

export { IngredientRoutes };
