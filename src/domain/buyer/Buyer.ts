import { BuyerJSON } from "./Buyer.types";

export default class Buyer {
  constructor(
    public readonly phone: string,
    public readonly name: string | null = null,
  ) {}

  toJSON(): BuyerJSON {
    return {
      name: !!this.name ? this.name : null,
      phone: this.phone,
    };
  }
}
