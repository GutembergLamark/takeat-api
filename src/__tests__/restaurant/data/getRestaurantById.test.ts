import request from "supertest";
import app from "../../../app/express";
import { mockedRestaurant } from "../../mocks";

describe("GET - /restaurant/data/:id", function () {
  test("Deve retornar um restaurante passando o id como parâmetro", async function () {
    const restaurantCreated = await request(app)
      .post("/public/restaurants")
      .send(mockedRestaurant);

    const data = await request(app).get(
      `/restaurant/data/${restaurantCreated?.body?.data?.id}`,
    );

    expect(data?.body?.restaurant).toHaveProperty("id");

    expect(data?.body?.restaurant).toHaveProperty("username");
    expect(data?.body?.restaurant?.username).toBe(mockedRestaurant?.username);

    expect(data?.body?.restaurant).toHaveProperty("email");
    expect(data?.body?.restaurant?.email).toBe(mockedRestaurant?.email);

    expect(data?.body?.restaurant).toHaveProperty("phone");
    expect(data?.body?.restaurant?.phone).toBe(mockedRestaurant?.phone);

    expect(data?.body?.restaurant).toHaveProperty("address");
    expect(data?.body?.restaurant?.address).toBe(mockedRestaurant?.address);

    expect(data?.body?.restaurant).toHaveProperty("has_service_tax");
    expect(data?.body?.restaurant?.has_service_tax).toBe(
      mockedRestaurant?.has_service_tax,
    );

    expect(data?.body?.restaurant).toHaveProperty("canceled_at");
    expect(data?.body?.restaurant).toHaveProperty("created_at");
    expect(data?.body?.restaurant).toHaveProperty("updated_at");

    expect(data?.body?.restaurant).not.toHaveProperty("password");

    expect(data?.status).toBe(200);
  });

  test("Deve retornar um erro se um id incorreto for passado", async function () {
    const data = await request(app).get(
      `/restaurant/data/b42f67b7-0dc3-4748-b924-cd62978ab8b1`,
    );

    expect(data?.body).toHaveProperty("message");
    expect(data?.body?.message).toBe("Restaurant not found");

    expect(data?.status).toBe(400);
  });
});
