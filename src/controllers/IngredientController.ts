import { NextFunction, Request, Response } from "express";
import { Ingredient } from "../entities/Ingredient";
import { IngredientUseCase } from "../useCases/IngredientUseCase";

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

  async update(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const ingredientData = request.body;
    try {
      const updateIngredient = await this.ingredientUseCase.path(
        id,
        ingredientData
      );

      if (!updateIngredient) {
        return response
          .status(400)
          .json({ message: "Ingrediente não localizado." });
      }
      return response
        .status(201)
        .json({ message: "Ingrediente atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export { IngredientController };
