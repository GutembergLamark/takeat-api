export default interface IRestaurantByIdService {
  execute(id: string): Promise<any>;
}
