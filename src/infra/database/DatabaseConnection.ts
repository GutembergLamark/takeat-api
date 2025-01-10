import "dotenv/config";
import { Sequelize } from "sequelize";

export interface IDatabaseConnection {
  getConnection(): Sequelize;
  isConnected(): Promise<void>;
  close(): Promise<void>;
}

export default class DatabaseConnection implements IDatabaseConnection {
  connection: any;
  DATABASE_URL = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

  constructor() {
    this.connection = new Sequelize(this.DATABASE_URL, {
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      /* logging: false, */
    });
  }

  getConnection() {
    if (this.connection) return this.connection;

    if (!this.connection) {
      this.connection = new Sequelize(this.DATABASE_URL, {
        dialect: "postgres",
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
        username: process.env.POSTGRES_USER,
        /* logging: false, */
      });

      return this.connection;
    }
  }

  async isConnected() {
    if (this.connection) await this.connection.authenticate();
  }

  async close() {
    if (this.connection) await this.connection.close();
  }

  async clearDatabase() {
    if (this.connection)
      await this.connection.query(
        "drop schema public cascade; create schema public;",
      );
  }
}

export const databaseConnection = new DatabaseConnection();
export const sequelize = databaseConnection.getConnection();
