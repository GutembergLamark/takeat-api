import { OrderJSON } from "./Order.types";

export default class Order {
  constructor(
    public readonly amount: number,
    public readonly product: string,
    public readonly phone: string,
    public readonly name: string | null = null,
  ) {}

  toJSON(): OrderJSON {
    return {
      amount: this.amount,
      product: this.product,
      phone: this.phone,
      name: !!this.name ? this.name : null,
    };
  }
}
