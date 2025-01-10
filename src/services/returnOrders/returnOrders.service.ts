import { IOrderRepository } from "../../infra/repository/order/OrderRepository.types";
import { IReturnOrdersService } from "./returnOrders.service.types";

export default class ReturnOrdersService implements IReturnOrdersService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(restaurantId: string) {
    const orders = await this.orderRepository.findOrdersById(restaurantId);

    return orders;
  }
}
