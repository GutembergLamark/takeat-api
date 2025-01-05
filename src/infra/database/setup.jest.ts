import orquestrator from "./orquestrator";
import { clearDatabase } from "../models";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
  await clearDatabase();
});
