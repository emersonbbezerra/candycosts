import { IIngredient } from "../interfaces/ProductInterface";

class Product {
  constructor(
    public name: string,
    public description: string,
    public ingredients: IIngredient[],
    public cost: number
  ) {}
}

export { Product };
