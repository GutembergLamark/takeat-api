import ProductDomain from "../../domain/product/Product";
import { Product } from "../../infra/models/product";

export interface ICreateProductService {
  execute(product: ProductDomain, restaurantId: string): Promise<Product>;
}
