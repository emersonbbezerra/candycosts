import request from "supertest";
import { App } from "../app";

const app = new App();
const express = app.app;

describe("Product test", () => {
  it("/POST Product", async () => {
    const product = {
      name: "Bolo de Chocolate",
      description: "Descrição do Bolo de Chocolate",
      ingredients: [],
      price: 29.9,
    };
    const response = await request(express)
      .post("/products")
      .field("name", product.name)
      .field("description", product.description)
      .field("ingredients", product.ingredients)
      .field("price", product.price);

    if (response.error) {
      console.log("file: Products.test.ts:22 ~ it ~ error:", response.error);
    }

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Produto criado com sucesso" });
  });
});
