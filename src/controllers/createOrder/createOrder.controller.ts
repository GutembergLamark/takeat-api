import { Request, Response } from "express";
import { ICreateOrderService } from "../../services/createOrder/createOrder.service.types";
import { IOrder } from "../../@types/models/Order";
import Order from "../../domain/order/Order";
import { catchError } from "../../shared/helpers/catchError";
import { ICreateOrderController } from "./createOrder.controller.types";

export default class CreateOrderController implements ICreateOrderController {
  constructor(private readonly createOrderService: ICreateOrderService) {}

  async execute(request: Request, response: Response) {
    const { amount, product, phone, name } = request.validatedBody as IOrder;

    const { id: restaurantId } = request.restaurant;

    const order = new Order(amount, product, phone, name);

    try {
      const data = await this.createOrderService.execute(order, restaurantId);

      return response
        .status(201)
        .json({ message: "Order created successfully", data });
    } catch (error) {
      console.log(error);

      return catchError(error, response);
    }
  }
}
