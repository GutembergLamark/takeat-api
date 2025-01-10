import request from "supertest";
import app from "../../../app/express";
import { mockedRestaurant } from "../../mocks";

describe("POST - /public/restaurants", function () {
  test("Deve criar um restaurante", async function () {
    const response = await request(app)
      .post("/public/restaurants")
      .send(mockedRestaurant);

    expect(response?.body).toHaveProperty("message");
    expect(response?.body?.message).toBe("Restaurant created successfully");

    expect(response?.body).toHaveProperty("data");

    expect(response?.body?.data).toHaveProperty("id");

    expect(response?.body?.data).toHaveProperty("username");
    expect(response?.body?.data?.username).toBe(mockedRestaurant?.username);

    expect(response?.body?.data).toHaveProperty("email");
    expect(response?.body?.data?.email).toBe(mockedRestaurant?.email);

    expect(response?.body?.data).toHaveProperty("phone");
    expect(response?.body?.data?.phone).toBe(mockedRestaurant?.phone);

    expect(response?.body?.data).toHaveProperty("address");
    expect(response?.body?.data?.address).toBe(mockedRestaurant?.address);

    expect(response?.body?.data).toHaveProperty("has_service_tax");
    expect(response?.body?.data?.has_service_tax).toBe(
      mockedRestaurant?.has_service_tax,
    );

    expect(response?.body?.data).toHaveProperty("canceled_at");
    expect(response?.body?.data).toHaveProperty("created_at");
    expect(response?.body?.data).toHaveProperty("updated_at");

    expect(response?.body?.data).not.toHaveProperty("password");

    expect(response.status).toBe(201);
  });

  test("Deve retornar um erro se o restaurante já existe", async function () {
    const response = await request(app)
      .post("/public/restaurants")
      .send(mockedRestaurant);

    expect(response?.body).toHaveProperty("message");
    expect(response?.body?.message).toBe("Restaurant already exists");

    expect(response.status).toBe(400);
  });
});
