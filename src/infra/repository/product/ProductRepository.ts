import { Model, ModelStatic, Sequelize } from "sequelize";
import Product from "../../../domain/product/Product";
import { IDatabaseConnection } from "../../database/DatabaseConnection";
import { IProductRepository } from "./ProductRepository.types";

export default class ProductRepository implements IProductRepository {
  dbConnection: Sequelize;
  productModel: ModelStatic<Model<any, any>>;

  constructor(readonly connection: IDatabaseConnection) {
    this.dbConnection = this.connection.getConnection();
    this.productModel = this.dbConnection.models.Product;
  }

  async create(product: Product, restaurantId: string): Promise<any> {
    const productObject = this.productModel.build({
      ...product.toJSON(),
      restaurant_id: restaurantId,
    });

    return productObject.save();
  }

  async existingInRepository(
    field: string,
    restaurantId: string,
  ): Promise<boolean> {
    const findProduct = await this.productModel.findOne({
      where: { name: field, restaurant_id: restaurantId },
    });

    return findProduct !== null;
  }

  findByName(name: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
