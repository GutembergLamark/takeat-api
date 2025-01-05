import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/DatabaseConnection";
import { Order } from "./order";

export class Buyer extends Model {
  declare id: string;
  declare name: string | null;
  declare phone: string;
}

Buyer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
  },
);

Buyer.hasMany(Order, {
  foreignKey: "buyer_id",
  as: "buyer_orders",
});
Order.belongsTo(Buyer, {
  foreignKey: "buyer_id",
  as: "buyer_orders",
});
