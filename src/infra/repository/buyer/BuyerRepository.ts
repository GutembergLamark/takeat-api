import { Model, ModelStatic, Sequelize } from "sequelize";
import { IDatabaseConnection } from "../../database/DatabaseConnection";
import Buyer from "../../../domain/buyer/Buyer";
import { IBuyerRepository } from "./BuyerRepository.types";

export default class BuyerRepository implements IBuyerRepository {
  dbConnection: Sequelize;
  buyerModel: ModelStatic<Model<any, any>>;

  constructor(private readonly connection: IDatabaseConnection) {
    this.dbConnection = this.connection.getConnection();
    this.buyerModel = this.dbConnection.models.Buyer;
  }

  async create(buyer: Buyer): Promise<any> {
    const buyerObject = this.buyerModel.build({
      ...buyer.toJSON(),
    });

    return buyerObject.save();
  }

  async existingInRepository(field: string | null = null) {
    const findBuyer = await this.buyerModel.findOne({
      where: { name: field },
    });

    return findBuyer !== null;
  }

  async findByPhone(phone: string): Promise<any> {
    const findBuyer = await this.buyerModel.findOne({
      where: { phone },
    });

    return findBuyer;
  }
}
