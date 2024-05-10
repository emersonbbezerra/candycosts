import request from "supertest";
import { App } from "../app";

const app = new App();
const express = app.app;

describe("Product test", () => {
  it("/POST Product", async () => {
    const product = {
      name: "Bolo de Chocolate",
      description: "Descrição do Bolo de Chocolate",
      ingredients: ["ingrediente1", "ingrediente2", "ingrediente3"],
      price: 29.9,
    };
    const response = await request(express).post("/products").send({
      name: product.name,
      description: product.description,
      ingredients: product.ingredients,
      price: product.price,
    });

    if (response.error) {
      console.log("file: Products.test.ts:23 ~ it ~ error:", response.error);
    }

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Produto criado com sucesso" });
  });
});
