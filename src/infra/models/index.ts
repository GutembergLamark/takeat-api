import { SyncOptions } from "sequelize";

export { Restaurant } from "./restaurant";
export { Product } from "./product";
export { Order } from "./order";
import { Restaurant } from "./restaurant";
import { Product } from "./product";
import { Buyer } from "./buyer";
import { Order } from "./order";

export default async function syncDatabase(options?: SyncOptions) {
  await Restaurant.sync(options);
  await Product.sync(options);
  await Buyer.sync(options);
  await Order.sync(options);
}
