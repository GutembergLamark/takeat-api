import { clearDatabase } from "../models";
import orquestrator from "./orquestrator";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
  await clearDatabase();
});
