import request from "supertest";
import app from "../../../app/express";
import { mockedRestaurant, mockedSession } from "../../mocks";

beforeAll(async () => {
  await request(app).post("/public/restaurants").send(mockedRestaurant);
});

describe("GET - /restaurant/orders", function () {
  test("Deve retornar as ordens de serviço do restaurante", async function () {
    const loggedRestaurant = await request(app)
      .post("/public/login")
      .send(mockedSession);

    const data = await request(app)
      .get("/restaurant/orders")
      .set(
        "Authorization",
        `Bearer ${loggedRestaurant?.body?.restaurant?.authorization}`,
      );

    console.log(data?.body);
  });
});
