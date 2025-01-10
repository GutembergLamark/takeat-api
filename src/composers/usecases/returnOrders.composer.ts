import { Request, Response } from "express";
import { databaseConnection } from "../../infra/database/DatabaseConnection";
import ReturnOrdersService from "../../services/returnOrders/returnOrders.service";
import ReturnOrdersController from "../../controllers/returnOrders/returnOrders.controller";
import OrderRepository from "../../infra/repository/order/OrderRepository";

export async function returnOrdersComposer(
  request: Request,
  response: Response,
) {
  const orderRepository = new OrderRepository(databaseConnection);
  const returnOrdersService = new ReturnOrdersService(orderRepository);
  const returnOrdersController = new ReturnOrdersController(
    returnOrdersService,
  );
  return returnOrdersController.execute(request, response);
}
