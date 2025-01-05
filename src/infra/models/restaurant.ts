import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../database/DatabaseConnection";
import { Product } from "./product";
import { Order } from "./order";

export class Restaurant extends Model<
  InferAttributes<Restaurant>,
  InferCreationAttributes<Restaurant>
> {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare phone: string;
  declare address: string;
  declare has_service_tax: boolean;
  declare canceled_at: string | null;
  declare products?: Product[];
}

Restaurant.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    has_service_tax: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    canceled_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize: sequelize,
    defaultScope: { attributes: { exclude: ["password"] } },
  },
);

Restaurant.hasMany(Product, {
  foreignKey: "restaurant_id",
  as: "products",
});
Product.belongsTo(Restaurant, {
  foreignKey: "restaurant_id",
  as: "products",
});

Restaurant.hasMany(Order, {
  foreignKey: "restaurant_id",
  as: "restaurant_orders",
});
Order.belongsTo(Restaurant, {
  foreignKey: "restaurant_id",
  as: "restaurant_orders",
});
