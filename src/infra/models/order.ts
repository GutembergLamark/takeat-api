import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/DatabaseConnection";

export class Order extends Model {
  declare id: string;
  declare amount: number;
  declare total_price: number;
  declare total_service_price: number;
  declare canceled_at: string | null;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_service_price: {
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
