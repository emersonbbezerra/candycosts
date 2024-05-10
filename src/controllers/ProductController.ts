import { NextFunction, Request, Response } from "express";
import { ProductUseCase } from "../useCases/ProductUseCase";
import { Product } from "../entities/Product";

class ProductController {
  constructor(private productUseCase: ProductUseCase) {}
  async create(request: Request, response: Response, next: NextFunction) {
    const productData: Product = request.body;
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
