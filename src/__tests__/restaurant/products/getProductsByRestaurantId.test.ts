import request from "supertest";
import { mockedProduct, mockedRestaurant, mockedSession } from "../../mocks";
import app from "../../../app/express";

beforeAll(async () => {
  await request(app).post("/public/restaurants").send(mockedRestaurant);

  const loggedRestaurant = await request(app)
    .post("/public/login")
    .send(mockedSession);

  await request(app)
    .post("/restaurant/products")
    .send(mockedProduct)
    .set(
      "Authorization",
      `Bearer ${loggedRestaurant?.body?.restaurant?.authorization}`,
    );
});

describe("GET - /restaurant/products/:id", function () {
  test("Deve retornar todos os produtos de um restaurante", async function () {
    const loggedRestaurant = await request(app)
      .post("/public/login")
      .send(mockedSession);

    const data = await request(app).get(
      `/restaurant/products/${loggedRestaurant?.body?.restaurant?.id}`,
    );

    expect(data?.body).toHaveProperty("products");
    expect(data?.body?.products?.length).toBe(1);

    expect(data?.body?.products[0]?.name).toBe("Café");

    expect(data?.status).toBe(200);
  });
});
