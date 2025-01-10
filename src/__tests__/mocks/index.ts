import Order from "../../domain/order/Order";
import Product from "../../domain/product/Product";
import Restaurant from "../../domain/restaurant/Restaurant";

export const mockedRestaurant: Restaurant = new Restaurant(
  "TakeatTest",
  "+55 (083) 98235433455",
  "TakeatTest@email.com",
  "admin",
  "Rua do centro",
  true,
);

export const mockedSession = {
  email: "TakeatTest@email.com",
  password: "admin",
};

export const mockedSessionIcorretPassword = {
  email: "TakeatTest@email.com",
  password: "admin1",
};

export const mockedProduct: Product = new Product("Café", "Café Quentinho", 10);
export const mockedProductSecond: Product = new Product(
  "Cuscuz",
  "Cuscuz com ovo",
  12,
);
