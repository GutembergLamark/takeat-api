import { DestroyOptions, SyncOptions } from "sequelize";

export { Restaurant } from "./restaurant";
export { Product } from "./product";
export { Order } from "./order";
import { Restaurant } from "./restaurant";
import { Product } from "./product";
import { Buyer } from "./buyer";
import { Order } from "./order";

export async function syncDatabase(options?: SyncOptions) {
  await Restaurant.sync(options);
  await Product.sync(options);
  await Buyer.sync(options);
  await Order.sync(options);
}

export async function clearDatabase(
  options: DestroyOptions = { cascade: true, truncate: true, logging: false },
) {
  await Restaurant.destroy(options);
  await Product.destroy(options);
  await Buyer.destroy(options);
  await Order.destroy(options);
}
