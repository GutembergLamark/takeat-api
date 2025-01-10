import request from "supertest";
import app from "../../../app/express";
import { mockedSession, mockedRestaurant, mockedProduct } from "../../mocks";

beforeAll(async () => {
  await request(app).post("/public/restaurants").send(mockedRestaurant);
});

describe("POST - /restaurant/products", function () {
  test("Deve criar um produto com um token autenticado", async function () {
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

    expect(productCreated?.body).toHaveProperty("message");
    expect(productCreated?.body?.message).toBe("Product created successfully");

    expect(productCreated?.body).toHaveProperty("data");

    expect(productCreated?.body?.data).toHaveProperty("id");

    expect(productCreated?.body?.data).toHaveProperty("name");
    expect(productCreated?.body?.data?.name).toBe(mockedProduct?.name);

    expect(productCreated?.body?.data).toHaveProperty("description");
    expect(productCreated?.body?.data?.description).toBe(
      mockedProduct?.description,
    );

    expect(productCreated?.body?.data).toHaveProperty("value");
    expect(productCreated?.body?.data?.value).toBe(mockedProduct?.value);

    expect(productCreated?.body?.data).toHaveProperty("canceled_at");
    expect(productCreated?.body?.data).toHaveProperty("updatedAt");
    expect(productCreated?.body?.data).toHaveProperty("createdAt");

    expect(productCreated?.status).toBe(201);
  });
  test("Deve retornar um erro se um token não autenticado for passado", async function () {
    const productInvalidToken = await request(app)
      .post("/restaurant/products")
      .send(mockedProduct)
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlRha2VhdDJAZW1haWwuY29tIiwiaWF0IjoxNzM2MDI3MTQ3LCJleHAiOjE3MzYxMTM1NDcsInN1YiI6Ijg2Mjc0YWM3LTA3ZTYtNGMyYS1hYzhlLWNhODBlY2NlMWY4OSJ9.3KpiQFJIDzujFo3gI5YGn_dc8H1kAuP5Vy-AjIwEH88`,
      );

    expect(productInvalidToken?.body).toHaveProperty("message");
    expect(productInvalidToken?.body?.message).toBe("Invalid Token");

    expect(productInvalidToken?.status).toBe(401);
  });
  test("Deve retornar um erro se o token não for passado", async function () {
    const productWithOutToken = await request(app)
      .post("/restaurant/products")
      .send(mockedProduct);

    expect(productWithOutToken?.body).toHaveProperty("message");
    expect(productWithOutToken?.body?.message).toBe("Missing token");

    expect(productWithOutToken?.status).toBe(401);
  });
});
