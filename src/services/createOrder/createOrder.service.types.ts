import OrderDomain from "../../domain/order/Order";
import { Order } from "../../infra/models";

export interface ICreateOrderService {
  execute(order: OrderDomain, restaurantId: string): Promise<Order>;
}
