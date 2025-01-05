import { Request, Response } from "express";
import { catchError } from "../../shared/helpers/catchError";
import IReturnOrdersController from "./returnOrders.controller.types";
import { IReturnOrdersService } from "../../services/returnOrders/returnOrders.service.types";

export default class ReturnOrdersController implements IReturnOrdersController {
  constructor(private readonly returnOrdersService: IReturnOrdersService) {}

  async execute(request: Request, response: Response): Promise<Response> {
    const { id } = request.restaurant;

    try {
      const orders = await this.returnOrdersService.execute(id);

      return response.status(200).json({ orders });
    } catch (error) {
      return catchError(error, response);
    }
  }
}
