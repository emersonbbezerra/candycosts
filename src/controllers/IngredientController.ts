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

  async getAllIngredients(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const ingredients = await this.ingredientUseCase.getAll();
      if (!ingredients) {
        return response
          .status(404)
          .json({ message: "Não existem ingredientes cadastrados." });
      }
      return response.status(200).json(ingredients);
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
          .status(404)
          .json({ message: "Ingrediente não localizado." });
      }
      return response
        .status(200)
        .json({ message: "Ingrediente atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  async delete(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    try {
      await this.ingredientUseCase.delete(id);
      return response
        .status(200)
        .json({ message: "Ingrediente deletado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export { IngredientController };
