export interface IReturnOrdersService {
  execute(restaurantId: string): Promise<any>;
}
