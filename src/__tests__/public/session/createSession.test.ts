import request from "supertest";
import app from "../../../app/express";
import {
  mockedSession,
  mockedSessionIcorretPassword,
  mockedRestaurant,
} from "../../mocks";

beforeAll(async () => {
  await request(app).post("/public/restaurants").send(mockedRestaurant);
});

describe("POST - /public/login", function () {
  test("Deve fazer autenticação com a conta do restaurante", async function () {
    const response = await request(app)
      .post("/public/login")
      .send(mockedSession);

    expect(response?.body).toHaveProperty("message");
    expect(response?.body?.message).toBe("Login feito com sucesso");

    expect(response?.body).toHaveProperty("restaurant");

    expect(response?.body?.restaurant).toHaveProperty("id");

    expect(response?.body?.restaurant).toHaveProperty("username");
    expect(response?.body?.restaurant?.username).toBe(
      mockedRestaurant?.username,
    );

    expect(response?.body?.restaurant).toHaveProperty("email");
    expect(response?.body?.restaurant?.email).toBe(mockedRestaurant?.email);

    expect(response?.body?.restaurant).toHaveProperty("phone");
    expect(response?.body?.restaurant?.phone).toBe(mockedRestaurant?.phone);

    expect(response?.body?.restaurant).toHaveProperty("address");
    expect(response?.body?.restaurant?.address).toBe(mockedRestaurant?.address);

    expect(response?.body?.restaurant).toHaveProperty("has_service_tax");
    expect(response?.body?.restaurant?.has_service_tax).toBe(
      mockedRestaurant?.has_service_tax,
    );

    expect(response?.body?.restaurant).toHaveProperty("canceled_at");
    expect(response?.body?.restaurant).toHaveProperty("created_at");
    expect(response?.body?.restaurant).toHaveProperty("updated_at");
    expect(response?.body?.restaurant).toHaveProperty("authorization");

    expect(response.status).toBe(200);
  });
  test("Deve retornar um erro ao autenticar com uma senha incorreta", async function () {
    const response = await request(app)
      .post("/public/login")
      .send(mockedSessionIcorretPassword);

    expect(response?.body).toHaveProperty("message");
    expect(response?.body?.message).toBe("Invalid restaurant or password");

    expect(response.status).toBe(403);
  });
});
