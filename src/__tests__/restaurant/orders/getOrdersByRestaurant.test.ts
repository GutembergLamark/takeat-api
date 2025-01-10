import request from "supertest";
import app from "../../../app/express";
import { mockedProduct, mockedRestaurant, mockedSession } from "../../mocks";
import Order from "../../../domain/order/Order";

beforeAll(async () => {
  await request(app).post("/public/restaurants").send(mockedRestaurant);

  const loggedRestaurant = await request(app)
    .post("/public/login")
    .send(mockedSession);

  const productCreated = await request(app)
    .post("/restaurant/products")
    .send(mockedProduct)
    .set(
      "Authorization",
      `Bearer ${loggedRestaurant?.body?.restaurant?.authorization}`,
    );

  const bodyOrder = new Order(
    4,
    productCreated?.body?.data?.id,
    "+55 (083) 98235433455",
  );

  await request(app)
    .post("/restaurant/orders")
    .send({
      ...bodyOrder,
      restaurant_id: loggedRestaurant?.body?.restaurant?.id,
    });
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

    expect(data?.body).toHaveProperty("orders");
    expect(data?.body?.orders?.length).toBe(1);

    expect(data?.status).toBe(200);
  });

  test("Deve retornar um erro se um token não autenticado for passado", async function () {
    const data = await request(app)
      .get("/restaurant/orders")
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlRha2VhdDJAZW1haWwuY29tIiwiaWF0IjoxNzM2MDI3MTQ3LCJleHAiOjE3MzYxMTM1NDcsInN1YiI6Ijg2Mjc0YWM3LTA3ZTYtNGMyYS1hYzhlLWNhODBlY2NlMWY4OSJ9.3KpiQFJIDzujFo3gI5YGn_dc8H1kAuP5Vy-AjIwEH88`,
      );

    expect(data?.body).toHaveProperty("message");
    expect(data?.body?.message).toBe("Invalid Token");

    expect(data?.status).toBe(401);
  });
  test("Deve retornar um erro se o token não for passado", async function () {
    const data = await request(app).get("/restaurant/orders");

    expect(data?.body).toHaveProperty("message");
    expect(data?.body?.message).toBe("Missing token");

    expect(data?.status).toBe(401);
  });
});
