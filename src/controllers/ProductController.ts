import { NextFunction, Request, Response } from "express";
import { ProductUseCase } from "../useCases/ProductUseCase";

class ProductController {
  constructor(private productUseCase: ProductUseCase) {}
  async create(request: Request, response: Response, next: NextFunction) {
    const productData = request.body;
    try {
      await this.productUseCase.create(productData);
      return response
        .status(201)
        .json({ message: "Produto criado com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
