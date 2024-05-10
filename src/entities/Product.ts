import { Ingredient } from "./Ingredient";

class Product {
  constructor(
    public name: string,
    public description: string,
    public ingredients: Ingredient[],
    public price: number
  ) {}
}

export { Product };
