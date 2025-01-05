import Buyer from "../../domain/buyer/Buyer";
import OrderDomain from "../../domain/order/Order";
import { Order } from "../../infra/models";
import { IBuyerRepository } from "../../infra/repository/buyer/BuyerRepository.types";
import { IOrderRepository } from "../../infra/repository/order/OrderRepository.types";
import { IProductRepository } from "../../infra/repository/product/ProductRepository.types";
import { IRestaurantRepository } from "../../infra/repository/restaurant/RestaurantRepository.types";
import { AppError } from "../../shared/errors/AppError";
import { ICreateOrderService } from "./createOrder.service.types";

export default class CreateOrderService implements ICreateOrderService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly buyerRepository: IBuyerRepository,
    private readonly productRepository: IProductRepository,
    private readonly restaurantRepository: IRestaurantRepository,
  ) {}

  async execute(order: OrderDomain, restaurantId: string): Promise<Order> {
    let buyerId;
    let productId;
    let servicePrice;
    let totalPrice;

    const buyer = await this.buyerRepository.findByPhone(order.phone);

    if (buyer) {
      buyerId = buyer?.id;
    }

    if (!buyer) {
      const buyerObject = new Buyer(order?.phone, order?.name);

      const buyerCreated = await this.buyerRepository.create(buyerObject);

      buyerId = buyerCreated?.id;
    }

    const product = await this.productRepository.findById(
      order.product,
      restaurantId,
    );

    if (!product) {
      throw new AppError("This product not found", 404);
    }

    productId = product?.id;
    totalPrice = order?.amount * product?.value;

    const restaurant = await this.restaurantRepository.findById(restaurantId);

    if (restaurant?.has_service_tax) {
      servicePrice = totalPrice + totalPrice * 0.1;
    }

    const formatObjectOrder = {
      amount: order?.amount,
      total_price: totalPrice,
      total_service_price: servicePrice,
    };

    const orderCreated = await this.orderRepository.create(
      formatObjectOrder,
      productId,
      restaurantId,
      buyerId,
    );

    return orderCreated;
  }
}
