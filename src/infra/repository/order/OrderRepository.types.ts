export interface IOrderRepository {
  create(
    order: any,
    productId: string,
    restaurantId: string,
    buyerId: string,
  ): Promise<any>;
  existingInRepository(field: string): Promise<void>;
  findOrdersById(id: string): Promise<any>;
}
