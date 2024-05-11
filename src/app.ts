import express, { Application } from "express";
import { connect } from "./infra/database";
import { errorMiddleware } from "./middlewares/error.middleware";
import { ProductRoutes } from "./routes/product.routes";
import { IngredientRoutes } from "./routes/ingredient.routes";

class App {
  public app: Application;
  private productRoutes = new ProductRoutes();
  private ingredientRoutes = new IngredientRoutes();
  constructor() {
    this.app = express();
    this.middlewaresInitialize();
    this.initializeRoutes();
    this.interceptionError();
    connect();
  }

  private initializeRoutes() {
    this.app.use("/products", this.productRoutes.router);
    this.app.use("/ingredients", this.ingredientRoutes.router);
  }

  private interceptionError() {
    this.app.use(errorMiddleware);
  }

  private middlewaresInitialize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // text=Hello World >>> Hello%20World
  }
  listen() {
    this.app.listen(3000, () => console.log("Server is running"));
  }
}

export { App };
