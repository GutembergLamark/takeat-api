import { col, Model, ModelStatic, Sequelize } from "sequelize";
import Restaurant from "../../../domain/restaurant/Restaurant";
import { IDatabaseConnection } from "../../database/DatabaseConnection";
import { FindType, IRestaurantRepository } from "./RestaurantRepository.types";
import { hash } from "bcrypt";

export default class RestaurantRepository implements IRestaurantRepository {
  dbConnection: Sequelize;
  restaurantModel: ModelStatic<Model<any, any>>;

  constructor(readonly connection: IDatabaseConnection) {
    this.dbConnection = this.connection.getConnection();
    this.restaurantModel = this.dbConnection.models.Restaurant;
  }

  async create(restaurant: Restaurant) {
    const restaurantObject = this.restaurantModel.build({
      ...restaurant.toJSON(),
      password: await hash(restaurant.password, 10),
    });

    return restaurantObject.save();
  }

  async existingInRepository(
    field: string,
    type: "email" | "username",
  ): Promise<boolean> {
    const findRestaurant = await this.restaurantModel.findOne({
      where: { [FindType[type]]: field },
    });

    return findRestaurant !== null;
  }

  async findById(id: string) {
    const findRestaurant = await this.restaurantModel.findOne({
      where: { id },
      attributes: [
        "id",
        "username",
        "email",
        "phone",
        "address",
        "has_service_tax",
        "canceled_at",
        [col("createdAt"), "created_at"],
        [col("updatedAt"), "updated_at"],
      ],
      raw: true,
    });

    return findRestaurant;
  }

  async findByEmail(email: string) {
    const findRestaurant = await this.restaurantModel.findOne({
      where: { email },
      attributes: [
        "id",
        "username",
        "email",
        "password",
        "phone",
        "address",
        "has_service_tax",
        "canceled_at",
        [col("createdAt"), "created_at"],
        [col("updatedAt"), "updated_at"],
      ],
      raw: true,
    });

    return findRestaurant;
  }

  async findProductsById(id: string) {
    const findRestaurantWithProducts = await this.restaurantModel.findOne({
      where: { id },
      attributes: ["id"],
      include: {
        model: this.dbConnection.models.Product,
        as: "products",
      },
    });

    return findRestaurantWithProducts;
  }

  async findOrdersById(id: string) {
    const findRestaurantWithProducts = await this.restaurantModel.findOne({
      where: { id },
      attributes: ["id"],
      include: {
        model: this.dbConnection.models.Order,
        as: "orders",
      },
    });

    return findRestaurantWithProducts;
  }

  async findAllRestaurants() {
    const findRestaurants = await this.restaurantModel.findAll();

    return findRestaurants;
  }
}
