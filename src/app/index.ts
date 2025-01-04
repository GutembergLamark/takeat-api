import "dotenv/config";
import app from "./express";
import DatabaseConnection from "../infra/database/DatabaseConnection";

const PORT = process.env.NODE_PORT;

export const databaseConnection = new DatabaseConnection();

(async () => {
  try {
    await databaseConnection.isConnected();

    /* sequelize.sync({ force: true }).then(() => {
      app.listen(PORT, () => {
        console.log(`Server running in port ${PORT}`);
      });
    }); */
    app.listen(PORT, () => {
      console.log(`Server running in port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
