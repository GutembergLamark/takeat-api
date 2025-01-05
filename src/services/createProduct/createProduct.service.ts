import ProductDomain from "../../domain/product/Product";
import { Product } from "../../infra/models/product";
import { IProductRepository } from "../../infra/repository/product/ProductRepository.types";
import { AppError } from "../../shared/errors/AppError";

export default class CreateProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(
    product: ProductDomain,
    restaurantId: string,
  ): Promise<Product> {
    const alreadyExists = await this.productRepository.existingInRepository(
      product.name,
      restaurantId,
    );

    if (alreadyExists) {
      throw new AppError("Product already exists", 400);
    }

    const productCreated = await this.productRepository.create(
      product,
      restaurantId,
    );

    return productCreated;
  }
}
