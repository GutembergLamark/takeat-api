import { Model, ModelStatic, Sequelize } from "sequelize";
import { IDatabaseConnection } from "../../database/DatabaseConnection";
import { IOrderRepository } from "./OrderRepository.types";

export default class OrderRepository implements IOrderRepository {
  dbConnection: Sequelize;
  orderModel: ModelStatic<Model<any, any>>;

  constructor(private readonly connection: IDatabaseConnection) {
    this.dbConnection = this.connection.getConnection();
    this.orderModel = this.dbConnection.models.Order;
  }

  async create(
    order: any,
    productId: string,
    restaurantId: string,
    buyerId: string,
  ): Promise<any> {
    const orderObject = this.orderModel.build({
      ...order,
      product_id: productId,
      restaurant_id: restaurantId,
      buyer_id: buyerId,
    });

    return orderObject.save();
  }

  async existingInRepository(field: string) {
    throw new Error("Method not implemented.");
  }
}
