import { Request, Response } from "express";
import { IProduct } from "../../@types/models/Product";
import { ICreateProductService } from "../../services/createProduct/createProduct.service.types";
import { AppError } from "../../shared/errors/AppError";
import Product from "../../domain/product/Product";
import { ICreateProductController } from "./createProduct.controller.types";
import { catchError } from "../../shared/helpers/catchError";

export default class CreateProductController
  implements ICreateProductController
{
  constructor(private readonly createProductService: ICreateProductService) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const { name, description, value } = request.validatedBody as IProduct;
    const { id: restaurantId } = request.restaurant;

    const product = new Product(name, description, value);

    try {
      const data = await this.createProductService.execute(
        product,
        restaurantId,
      );

      return response
        .status(201)
        .json({ message: "Product created successfully", data });
    } catch (error) {
      return catchError(error, response);
    }
  }
}
