import "dotenv/config";
import app from "./express";
import { databaseConnection } from "../infra/database/DatabaseConnection";
import { syncDatabase } from "../infra/models";

const PORT = process.env.NODE_PORT;
const isDev = process.env.NODE_ENV === "development";

(async () => {
  try {
    await databaseConnection.isConnected();

    await syncDatabase({ alter: isDev })
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server running in port ${PORT}`);
        });
      })
      .catch((error: string) => {
        console.error("Unable to connect to the database:", error);
      });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
