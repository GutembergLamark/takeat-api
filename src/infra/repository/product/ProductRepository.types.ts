import Product from "../../../domain/product/Product";

export interface IProductRepository {
  create(product: Product, restaurantId: string): Promise<any>;
  existingInRepository(field: string, restaurantId: string): Promise<boolean>;
  findByName(name: string): Promise<any>;
}
