export default interface IReturnProductsService {
  execute(restaurantId: string): Promise<any>;
}
