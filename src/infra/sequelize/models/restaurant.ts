import { DataTypes, Model } from "sequelize";
import { databaseConnection } from "../../../app";

const sequelize = databaseConnection.getConnection();

class Restaurant extends Model {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare phone: string;
  declare address: string;
  declare has_service_tax: boolean;
  declare canceled_at: string | null;
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
  { sequelize, defaultScope: { attributes: { exclude: ["password"] } } }
);
