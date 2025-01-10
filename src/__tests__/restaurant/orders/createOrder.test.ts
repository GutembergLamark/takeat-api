import request from "supertest";
import app from "../../../app/express";
import {
  mockedProduct,
  mockedProductSecond,
  mockedRestaurant,
  mockedSession,
} from "../../mocks";
import Order from "../../../domain/order/Order";

beforeAll(async () => {
  await request(app).post("/public/restaurants").send(mockedRestaurant);
});

describe("POST - /restaurant/orders", function () {
  test("Deve criar uma ordem de serviço para um restaurante", async function () {
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

    const orderCreated = await request(app)
      .post("/restaurant/orders")
      .send({
        ...bodyOrder,
        restaurant_id: loggedRestaurant?.body?.restaurant?.id,
      });

    expect(orderCreated?.body).toHaveProperty("message");
    expect(orderCreated?.body?.message).toBe("Order created successfully");

    expect(orderCreated?.body).toHaveProperty("data");

    expect(orderCreated?.body?.data).toHaveProperty("id");

    expect(orderCreated?.body?.data).toHaveProperty("amount");
    expect(orderCreated?.body?.data?.amount).toBe(bodyOrder?.amount);

    expect(orderCreated?.body?.data).toHaveProperty("total_price");
    expect(orderCreated?.body?.data?.total_price).toBe(40);

    expect(orderCreated?.body?.data).toHaveProperty("total_service_price");
    expect(orderCreated?.body?.data?.total_service_price).toBe(44);

    expect(orderCreated?.body?.data).toHaveProperty("product_id");
    expect(orderCreated?.body?.data?.product_id).toBe(
      productCreated?.body?.data?.id,
    );

    expect(orderCreated?.body?.data).toHaveProperty("restaurant_id");
    expect(orderCreated?.body?.data?.restaurant_id).toBe(
      loggedRestaurant?.body?.restaurant?.id,
    );

    expect(orderCreated?.body?.data).toHaveProperty("buyer_id");

    expect(orderCreated?.body?.data).toHaveProperty("updatedAt");
    expect(orderCreated?.body?.data).toHaveProperty("createdAt");

    expect(orderCreated?.status).toBe(201);
  });

  test("Deve retornar um erro se o produto não existir", async function () {
    const loggedRestaurant = await request(app)
      .post("/public/login")
      .send(mockedSession);

    const productCreated = await request(app)
      .post("/restaurant/products")
      .send(mockedProductSecond)
      .set(
        "Authorization",
        `Bearer ${loggedRestaurant?.body?.restaurant?.authorization}`,
      );

    const bodyOrder = new Order(
      4,
      productCreated?.body?.data?.id,
      "+55 (083) 98235433455",
    );

    const orderCreated = await request(app)
      .post("/restaurant/orders")
      .send({
        ...bodyOrder,
        restaurant_id: "f5e01a56-1402-49e8-9e57-921d9a847107",
      });

    expect(orderCreated?.body).toHaveProperty("message");
    expect(orderCreated?.body?.message).toBe("This product not found");

    expect(orderCreated?.status).toBe(400);
  });
});
