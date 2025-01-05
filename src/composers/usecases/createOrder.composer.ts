import { Request, Response } from "express";
import ProductRepository from "../../infra/repository/product/ProductRepository";
import { databaseConnection } from "../../infra/database/DatabaseConnection";
import BuyerRepository from "../../infra/repository/buyer/BuyerRepository";
import RestaurantRepository from "../../infra/repository/restaurant/RestaurantRepository";
import CreateOrderService from "../../services/createOrder/createOrder.service";
import OrderRepository from "../../infra/repository/order/OrderRepository";
import CreateOrderController from "../../controllers/createOrder/createOrder.controller";

export async function createOrderComposer(
  request: Request,
  response: Response,
) {
  const orderRepository = new OrderRepository(databaseConnection);
  const buyerRepository = new BuyerRepository(databaseConnection);
  const productRepository = new ProductRepository(databaseConnection);
  const restaurantRepository = new RestaurantRepository(databaseConnection);
  const createOrderService = new CreateOrderService(
    orderRepository,
    buyerRepository,
    productRepository,
    restaurantRepository,
  );
  const createOrderController = new CreateOrderController(createOrderService);
  createOrderController.execute(request, response);
}
