import { Request, Response } from "express";
import { databaseConnection } from "../../infra/database/DatabaseConnection";
import ProductRepository from "../../infra/repository/product/ProductRepository";
import CreateProductService from "../../services/createProduct/createProduct.service";
import CreateProductController from "../../controllers/createProduct/createProduct.controller";

export async function createProductComposer(
  request: Request,
  response: Response,
) {
  const productRepository = new ProductRepository(databaseConnection);
  const createProductService = new CreateProductService(productRepository);
  const createProductController = new CreateProductController(
    createProductService,
  );
  createProductController.execute(request, response);
}
