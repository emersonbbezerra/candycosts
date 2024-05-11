import { NextFunction, Request, Response } from "express";
import { Ingredient } from "../entities/Ingredient";

class IngredientController {
  constructor(private ingredientUseCase: IngredientUseCase) {}
  async create(request: Request, response: Response, next: NextFunction) {
    const ingredientData: Ingredient = request.body;
    try {
      await this.ingredientUseCase.create(ingredientData);
      return response
        .status(201)
        .json({ message: "Ingrediente cadastrado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export { IngredientController };
