import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/DatabaseConnection";
import { Order } from "./order";

export class Product extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare value: number;
  declare canceled_at: string | null;
}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
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
  },
);

Product.hasOne(Order, {
  foreignKey: "product_id",
  as: "product",
});
Order.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});
