import { Request, Response } from "express";
import IReturnProductsService from "../../services/returnProducts/returnProducts.service.types";
import IReturnProductsController from "./returnProducts.controller.types";
import { catchError } from "../../shared/helpers/catchError";

export default class ReturnProductsController
  implements IReturnProductsController
{
  constructor(private readonly returnProductsService: IReturnProductsService) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const { id } = request.restaurant;

    try {
      const products = await this.returnProductsService.execute(id);

      return response.status(200).json({ products });
    } catch (error) {
      return catchError(error, response);
    }
  }
}
