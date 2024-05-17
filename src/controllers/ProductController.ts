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
        .json({ message: "Produto cadastrado com sucesso." });
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const products = await this.productUseCase.getAll();
      if (!products) {
        return response
          .status(404)
          .json({ message: "Não existem produtos cadastrados." });
      }
      return response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const productData = request.body;
    try {
      const updateProduct = await this.productUseCase.update(id, productData);

      if (!updateProduct) {
        return response
          .status(404)
          .json({ message: "Produto não localizado." });
      }
      return response
        .status(200)
        .json({ message: "Produto atualizado com sucesso." });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
